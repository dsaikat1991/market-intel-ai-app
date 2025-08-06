// src/pages/ProfilePage.js
// eslint-disable-next-line no-unused-vars
import { auth, db, storage } from '../firebaseConfig'; // Keep auth here for updateProfile and deleteUser
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import '../styles/App.css'; // Corrected import path for App.css
import { updateProfile, deleteUser } from 'firebase/auth'; // Import updateProfile and deleteUser

function ProfilePage({ user, onUpdateUserRole, onProfileUpdate }) {
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState(user?.photoURL || 'https://placehold.co/50x50/cccccc/333333?text=👤');
  const [newImageFile, setNewImageFile] = useState(null);
  const [loading, setLoading] = useState(false); // Added setLoading state
  const [uploading, setUploading] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');

  // Effect to fetch user profile data from Firestore when the 'user' prop changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) { // Check if the user prop is available
        setLoading(true);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setDisplayName(userData.displayName || user.displayName || '');
            setCurrentProfileImageUrl(userData.profilePictureUrl || user.photoURL || 'https://placehold.co/50x50/cccccc/333333?text=👤');
            setUserRole(userData.role || 'freemium');
          } else {
            // If user doc doesn't exist (should be handled by App.js, but fallback)
            setDisplayName(user.displayName || (user.email ? user.email.split('@')[0] : 'User'));
            setCurrentProfileImageUrl(user.photoURL || 'https://placehold.co/50x50/cccccc/333333?text=👤');
            setUserRole('freemium');
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          setError("Failed to load profile data.");
        } finally {
          setLoading(false);
        }
      } else {
        // If user prop is null (user logged out), clear local states
        setDisplayName('');
        setCurrentProfileImageUrl('https://placehold.co/50x50/cccccc/333333?text=👤');
        setUserRole('');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]); // Re-run this effect whenever the 'user' prop changes


  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
      // Optional: Display a preview of the new image
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentProfileImageUrl(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('Error: User not authenticated.');
      return;
    }

    setUploading(true);
    setProfileMessage('');
    setError('');

    try {
      const userDocRef = doc(db, "users", user.uid);
      let updatedProfilePictureUrl = currentProfileImageUrl;

      if (newImageFile) {
        // Delete old image if it exists and is not the default placeholder
        if (currentProfileImageUrl && !currentProfileImageUrl.includes('placehold.co')) {
          try {
            // Extract the path from the URL to get the file name
            const oldImagePath = new URL(currentProfileImageUrl).pathname.split('/').pop();
            const oldImageRef = ref(storage, `profile_pictures/${user.uid}/${oldImagePath}`);
            await deleteObject(oldImageRef);
          } catch (deleteError) {
            console.warn("Could not delete old profile picture (it might not exist or is default):", deleteError.message);
          }
        }

        // Upload new image
        const imageRef = ref(storage, `profile_pictures/${user.uid}/${newImageFile.name}`);
        await uploadBytes(imageRef, newImageFile);
        updatedProfilePictureUrl = await getDownloadURL(imageRef);
      }

      // Update user profile in Firebase Auth
      await updateProfile(user, {
        displayName: displayName,
        photoURL: updatedProfilePictureUrl // Update photoURL in Auth
      });

      // Update user document in Firestore
      await setDoc(userDocRef, {
        displayName: displayName,
        profilePictureUrl: updatedProfilePictureUrl,
      }, { merge: true });

      // Update state in App.js via callback
      onProfileUpdate(updatedProfilePictureUrl, displayName);
      setNewImageFile(null); // Clear the selected file after upload
      setProfileMessage('Profile updated successfully!');

    } catch (saveError) {
      console.error("Error updating profile:", saveError);
      setError(`Failed to update profile: ${saveError.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteProfilePicture = async () => {
    if (!user) {
      setProfileMessage('Error: User not authenticated.');
      return;
    }

    // Using a custom message box instead of window.confirm
    const confirmDelete = window.confirm("Are you sure you want to delete your profile picture? This action cannot be undone.");
    if (!confirmDelete) {
      return;
    }

    setUploading(true); // Re-using uploading state for deletion
    setProfileMessage('');
    setError('');

    try {
      const userDocRef = doc(db, "users", user.uid);
      // Only attempt to delete if there's a custom image URL and it's not the default placeholder
      if (currentProfileImageUrl && !currentProfileImageUrl.includes('placehold.co')) {
        try {
          // Extract the path from the URL to get the file name
          const imagePath = new URL(currentProfileImageUrl).pathname.split('/').pop();
          const imageRef = ref(storage, `profile_pictures/${user.uid}/${imagePath}`);
          await deleteObject(imageRef);
        } catch (storageDeleteError) {
          console.warn("Could not delete profile picture from storage (it might not exist or is default):", storageDeleteError.message);
          // Do not throw error here, continue to update Firestore and Auth
        }
      }

      // Update Firestore to remove the profile picture URL and set back to default placeholder
      const defaultProfilePic = 'https://placehold.co/50x50/cccccc/333333?text=👤';
      await setDoc(userDocRef, {
        profilePictureUrl: defaultProfilePic,
      }, { merge: true });

      // Also update Firebase Auth profile photoURL
      await updateProfile(user, {
        photoURL: defaultProfilePic
      });

      setCurrentProfileImageUrl(defaultProfilePic);
      onProfileUpdate(defaultProfilePic, displayName); // Update App.js state
      setProfileMessage('Profile picture deleted successfully!');

    } catch (error) {
      console.error("Error deleting profile picture:", error);
      setError(`Error deleting profile picture: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };


  const handleDeleteAccount = async () => {
    // Using a custom message box instead of window.confirm
    const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmDelete) {
      return;
    }

    setUploading(true); // Re-using uploading state for deletion
    setProfileMessage('');
    setError('');

    try {
      if (user) {
        // Delete user document from Firestore first
        const userDocRef = doc(db, "users", user.uid);
        await deleteDoc(userDocRef);

        // Delete profile picture from storage if it exists and is not default
        if (currentProfileImageUrl && !currentProfileImageUrl.includes('placehold.co')) {
          try {
            const imagePath = new URL(currentProfileImageUrl).pathname.split('/').pop();
            const imageRef = ref(storage, `profile_pictures/${user.uid}/${imagePath}`);
            await deleteObject(imageRef);
          } catch (storageDeleteError) {
            console.warn("Could not delete profile picture from storage:", storageDeleteError.message);
          }
        }

        // Then delete the user from Firebase Auth
        await deleteUser(user);

        setProfileMessage('Account deleted successfully. You will be logged out.');
        // No need to call onProfileUpdate or onUpdateUserRole as the user will be logged out
      }
    } catch (deleteError) {
      console.error("Error deleting account:", deleteError);
      setError(`Failed to delete account: ${deleteError.message}`);
      // Handle re-authentication requirement for deleteUser
      if (deleteError.code === 'auth/requires-recent-login') {
        setError('Please re-authenticate to delete your account. Log out and log back in, then try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading && !profileMessage && !error) { // Added loading check for initial fetch
    return (
      <section className="profile-page-container">
        <div className="profile-content-wrapper">
          <p className="loading-message">Loading profile...</p>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="generic-page-placeholder">
        <h2>Access Denied</h2>
        <p>Please sign in to view your profile.</p>
      </section>
    );
  }

  return (
    <section className="profile-page-container">
      <div className="profile-content-wrapper">
        <h2>Your Profile</h2>
        {profileMessage && <p className="profile-message">{profileMessage}</p>}
        {error && <p className="profile-message error">{error}</p>}

        <form onSubmit={handleProfileSave} className="profile-form">
          <div className="profile-picture-section">
            <img src={currentProfileImageUrl} alt="Profile" className="profile-pic-large" />
            <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
            <div className="profile-picture-actions">
              <button type="submit" className="profile-button primary" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload/Save Picture'}
              </button>
              {currentProfileImageUrl && !currentProfileImageUrl.includes('placehold.co') && (
                <button type="button" onClick={handleDeleteProfilePicture} className="profile-button delete" disabled={uploading}>
                  Delete Picture
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="displayName">Display Name:</label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={handleDisplayNameChange}
              placeholder="Enter your display name"
              required
              disabled={uploading}
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={user.email || 'N/A'} disabled />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <input type="text" value={userRole.charAt(0).toUpperCase() + userRole.slice(1)} disabled />
          </div>

          <button type="submit" className="profile-button primary" disabled={uploading}>
            Save Profile Changes
          </button>
          <button type="button" className="profile-button delete" onClick={handleDeleteAccount} disabled={uploading}>
            Delete Account
          </button>
        </form>
      </div>
    </section>
  );
}

export default ProfilePage;
