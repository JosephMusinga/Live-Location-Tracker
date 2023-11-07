import { useEffect, useState } from 'react';
import { auth } from '../Firebase';
import { useNavigate, NavLink } from 'react-router-dom';

function UserList() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {currentUser ? (
        <ul>
          <li>
            <span>{currentUser.email}</span>
          </li>
        </ul>
      ) : (
        <p>No user currently logged in.</p>
      )}
    </div>
  );
}

export default UserList;