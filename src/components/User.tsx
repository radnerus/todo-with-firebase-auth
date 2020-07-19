import React, { useContext } from 'react';
import { UserContext } from '../App';
import { logout } from '../firebase/firestore/auth';

function User() {
  const userContext = useContext(UserContext);

  const logoutHandler = async () => {
    await logout();
  };
  return (
    <div className="logged-in-user" onClick={logoutHandler}>
      {userContext.displayName || 'hello'}
      <br />
      <span className="logout">Log Out!</span>
    </div>
  );
}

export default User;
