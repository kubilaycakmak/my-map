import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Metamask from "./meta/Metamask";
import './Profile.css'

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container profile">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.fullName}</strong>`s Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>User Type: </strong>
        {currentUser.type &&
          currentUser.type}

      <Metamask />
    </div>
  );
};

export default Profile;