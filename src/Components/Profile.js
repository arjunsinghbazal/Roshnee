import React from "react";
import { useNavigate } from "react-router-dom";
import profileImage from "../images/images.jpeg";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Clear login data from local storage and navigate to home
    localStorage.removeItem("login");
    navigate("/");
  };
  const handleDelete = (e)=>{
    e.preventDefault();
    localStorage.clear();
    navigate("/")
  }

  // Retrieve user data from local storage
  const userString = localStorage.getItem("login");
  const user = JSON.parse(userString);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>
      <div className="profile-content">
        <div className="profile-image">
          <img src={profileImage} alt="Profile" />
        </div>
        <div className="profile-details">
          <h3 className="profile-info">Username: {user.username}</h3>
          <h3 className="profile-info">Password: {user.password}</h3>
        </div>
      </div>
      <div className="profile-footer">
        <button className="profile-button black" onClick={() => navigate("/")}>
          Back
        </button>
        <button className="delete-button gray" onClick={handleDelete}>
          Delete Account
        </button>
        <button className="profile-button black" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
