import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './AdminPanel.css'

function AdminPanel() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Function to check if the user is admin
  const checkAdminStatus = async () => {

    console.log(user)
    
    if (user) {
      try {
        const userEmail = await user.email;
        if (userEmail.includes('admin')) {
          console.log("User is an admin");
        } else {
          alert("You are not authorized to access this page");
          navigate("/home");
        }
      } catch (error) {
        console.log("Error retrieving user email:", error);
      }
    } else {
      alert("You are not authorized to access this page");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkAdminStatus();
  });

  const handleButtonClick = () => {
    navigate('/createUser');
  };

  const handleTouristButtonClick = () => {
    navigate('/touristsRecords');
  };


  return (
    <div className='adminpanel__main'>
      <div className='adminpanel__header'>
        <h1>AdminPanel</h1>
      </div>

      <div className='text'>
        <p>Add new user</p>
      </div>

      <div className='nav__button '>
        <button onClick={handleButtonClick}>Create  User</button>
      </div>

      <div className='nav__button '>
        <button onClick={handleTouristButtonClick}>Create Tourist Record</button>
      </div>

    </div>
  );
}

export default AdminPanel;