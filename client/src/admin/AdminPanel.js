import React, { useEffect, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { auth } from '../Firebase';
import { UserContext } from '../UserContext';

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
  }, []);

  return (
    <>
      <div>AdminPanel</div>

      <div>
        <NavLink to="/createUser"><button>Sign up</button></NavLink>
      </div>
    </>
  );
}

export default AdminPanel;