import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';
import { updateProfile, signOut } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email] = useState(user?.email || '');
  const [editMode, setEditMode] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(user, { displayName });
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h4 className="text-center mb-4">👤 Profile</h4>

        {!editMode ? (
          <>
            <p><strong>Name:</strong> {user?.displayName || 'N/A'}</p>
            <p><strong>Email:</strong> {email}</p>

            <div className="d-grid gap-2 mt-4">
              <button className="btn btn-outline-primary" onClick={() => setEditMode(true)}>✏️ Edit Name</button>
              <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>🏠 Go Back to Home</button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>🔒 Logout</button>
            </div>
          </>
        ) : (
          <>
            <label className="form-label"><strong>Edit Name:</strong></label>
            <input
              className="form-control mb-3"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <p><strong>Email:</strong> {email}</p>

            <div className="d-grid gap-2 mt-2">
              <button className="btn btn-success" onClick={handleProfileUpdate}>💾 Save</button>
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>❌ Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
