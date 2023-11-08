import React, { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const [ref, setRef] = useState('');


  const { user, updateUser } = useContext(UserContext);

  const [currentUser, setCurrentUser] = useState(null);

  //get user email to display
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const uid = authUser.uid;
        // ...
        console.log("uid", uid);
        // Update user credentials in the context
        updateUser(authUser);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
        // Clear user credentials in the context
        updateUser(null);
      }
    });
  });

  const handleButtonClick = () => {
    let value = ref;
    // Navigate to the second page with the user name as a prop.
    navigate(`/liveMap?databaseRef=${value}`);
  };

  return (
    <div className='home__main'>
      <div className='home__header'>
        <h1>Home</h1>
      </div>
      <div>
        <div className='home__body'>
          <h2 className="text">
            Enter the Client Code to begin tracking
          </h2>

          <div className='input__field'>
            <input
              id="clientCode"
              name="clientCode"
              required
              placeholder="clientCode"
              onChange={(e) => setRef(e.target.value)}
            />
          </div>
        </div>
        <div className='track__button'>
          <button onClick={handleButtonClick}>Begin Tracking</button>
        </div>

        <div>
          {currentUser ? (

            <div className='user__info'>
              <div className='user__icon'>
              </div>
              <div>
                <p>{currentUser.email}</p>
              </div>
            </div>
          ) : (
            <p>No user currently logged in.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;