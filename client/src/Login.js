import React, { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateUser(user); // Update user credentials in the context
                if (email.includes('admin')) {
                    navigate('/adminPanel');
                } else {
                    navigate('/home');
                }
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });
    };

    return (
        <>
            <div className='login__main'>
                <div className='login__header'>
                    <h1>Login</h1>
                </div>
                <form className='form'>
                    <div className='email__section'>
                        <label className='text-green-700 text-2xl' htmlFor="email-address">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="Enter email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='password__section'>
                        <label className='text-green-700 text-2xl' htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='button__section'>
                        <button className='button' onClick={onLogin}>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;