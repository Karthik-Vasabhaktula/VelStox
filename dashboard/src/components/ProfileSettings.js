import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("Individual");
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3002/api/user/profile", {
        withCredentials: true,
      });
      if (response.data) {
        setUsername(response.data.username || "");
        setEmail(response.data.email || "");
        setAccountType(response.data.accountType || "Individual");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaveSuccess(false);
      setError(null);
      await axios.put(
        "http://localhost:3002/api/user/profile",
        {
          username,
          email,
          accountType,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("username", username);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.response?.data?.message || error.message);
    }
  };

  if (loading) {
    return <div className="profile-settings">Loading...</div>;
  }

  return (
    <div className="profile-settings">
      <div className="settings-container">
        <h2>Profile Settings</h2>
        <hr className="divider" />

        {error && <div className="error-message">{error}</div>}
        {saveSuccess && <div className="success-message">Profile updated successfully!</div>}

        <div className="setting-item">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "input-editable" : "input-disabled"}
          />
        </div>

        <div className="setting-item">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "input-editable" : "input-disabled"}
          />
        </div>

        <div className="setting-item">
          <label>Account Type</label>
          <select
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            disabled={!isEditing}
            className={isEditing ? "input-editable" : "input-disabled"}
          >
            <option value="Individual">Individual</option>
            <option value="Corporate">Corporate</option>
            <option value="HUF">HUF</option>
          </select>
        </div>

        <div className="button-group">
          {!isEditing ? (
            <button
              className="btn btn-blue"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                className="btn btn-blue"
                onClick={handleSaveProfile}
              >
                Save Changes
              </button>
              <button
                className="btn btn-grey"
                onClick={() => {
                  setIsEditing(false);
                  fetchUserProfile();
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
