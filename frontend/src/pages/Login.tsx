import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/home";

    // setting all the fields

    // setting email focus

    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    //setting email field
    const [email, setEmail] = useState<string>('');

    //setting pasword field
    const [password, setPassword] = useState<string>('');

    // setting form error
    const [error, setError] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    //setting form success
    const [success, setSuccess] = useState<boolean>(false)

    // setting the response 
    const { setAuth }: any = useAuth();


    useEffect(() => {
        emailRef.current?.focus();
    }, [])


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', JSON.stringify({ user: email, pwd: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                });

            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken })
            setEmail('');
            setPassword('');
            navigate(from,{replace:true});
        }
        catch (err: any) {
            setError(true);
            if (err?.response?.status === 400) {
                setErrMsg("User Name or Password is incorrect");
            }
            else if (err?.response?.status === 204) {
                setErrMsg("User Name does not exist");
            }
            else {
                setErrMsg("Login failed.Server Error...");
            }
            errRef.current?.focus();

        }
    }

    return (
        <>
            {error ? <p ref={errRef}>{errMsg}</p> : ""}
            <form onSubmit={handleSubmit}>
                <div className='container'>
                    <div className='row justify-content-center mt-140'>
                        <div className='col-6'>
                            <div className="card">
                                <div className="card-header bg-cornflower font-30 font-bold text-center">
                                    Login page
                                </div>
                                <div className="card-body">
                                    {error ? <div className="alert alert-danger" ref={errRef}>{errMsg}</div> : ""}
                                    <div className='mb-4'>
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="text"
                                            ref={emailRef}
                                            className="form-control form-control-lg"
                                            id="email"
                                            aria-describedby="emailHelp"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required />

                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg"
                                            id="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required />
                                    </div>
                                    <div className='text-center'>
                                        <button type="submit" className="btn btn-primary px-4 py-2">Sign In</button>
                                    </div>
                                    <div>
                                        <Link to="/">Go Back to Register Page</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Login