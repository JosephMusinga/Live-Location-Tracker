import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
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
            <main>
                <section>
                    <div>
                        <form >
                            <div className='flex flex-col m-10'>
                                <label className='text-green-700 text-2xl' htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email address"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col m-10'>
                                <label className='text-green-700 text-2xl' htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className='text-red-700'>
                                <button className='flex flex-col m-10  border-black'
                                    onClick={onLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </form>

                        <p className="text-sm text-white text-center">
                            No account yet? {' '}
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </p>

                    </div>
                </section>
            </main>
        </>
    )
}

export default Login