import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const [ref, setRef] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid)
      } else {
        // User is signed out
        // ...
        console.log("user is logged out")
      }
    });

  }, [])

  const handleButtonClick = () => {
    let value = ref
    // Navigate to the second page with the user name as a prop.
    navigate(`/liveMap?databaseRef=${value}`);
  };

  return (
    <section>
      <h1>Home</h1>
      <div>
        <label htmlFor="clientCode">
          Enter the Client Code to begin tracking
        </label>
        <input
          id="clientCode"
          name="clientCode"
          required placeholder="clientCode"
          onChange={(e) => setRef(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={handleButtonClick}
        >
          Track
        </button>
      </div>
    </section>
  )
}

export default Home
