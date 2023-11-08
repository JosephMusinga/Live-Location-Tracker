import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import './CreateUser.css'

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('');


    const onSubmit = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                alert(user.email + ' created succefully');
                navigate("/adminPanel")

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
                // ..
            });
    }

    return (
        <div className='createuser__main'>
            <div>
                <h1>
                    Create User
                </h1>
            </div>
            <form className='form'>
                <div className='input__fields'>
                    <label htmlFor="email-address">
                        Email address
                    </label>
                    <input
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email address"
                    />
                </div>

                <div className='input__fields'>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        label="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>

                <div className='createuser__button'>
                    <button
                        type="submit"
                        onClick={onSubmit}
                    >
                        Create
                    </button>
                </div>

                <NavLink to="/login">
                    logout
                </NavLink>

            </form>

        </div>
    )
}

export default Signup