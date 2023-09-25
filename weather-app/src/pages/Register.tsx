import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Register = () => {

    // setting all the fields

    // setting email focus

    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLInputElement>(null);

    //setting email field
    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);

    //setting pasword field
    const [password, setPassword] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);


    //setting password match field
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [validConfirmPwd, setValidConfirmPwd] = useState<boolean>(false);
    const [confirmPwdFocus, setConfirmPwdFocus] = useState<boolean>(false);

    // setting form error
    const [error, setError] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    //setting form success
    const [success, setSuccess] = useState<boolean>(false)


    //const email_Regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    // Regex for input Validation
    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        const result = email_regex.test(email)
        if (result) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false);
        }
    }, [email])

    useEffect(() => {
        const result = password_regex.test(password)
        if (result) {
            setValidPwd(true)
        }
        else {
            setValidPwd(false);
        }

        setValidConfirmPwd(password === confirmPassword);

    }, [password, confirmPassword])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', JSON.stringify({ user: email, pwd: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    //withCredentials: true
                });

            console.log(JSON.stringify(response?.data));
            setSuccess(true);
        }
        catch (err: any) {
            setError(true);
            if (err?.response?.status === 409) {
                setErrMsg("User Name already exists");
            }
            else {
                setErrMsg("Registration failed.Server Error...");
            }
            errRef.current?.focus();

        }
            setEmail('');
            setPassword('');
            setConfirmPassword('');
    }

    return (
        <>
            {success ? <div className='container'>
                <div className='row justify-content-center mt-140'>
                    <div className='col-6'>
                        <div className="card">
                            <div className="card-body py-4">
                                <h1>You have successfully registered!</h1>
                                <Link to='/Login'>Go To Sign In Page</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
                <form onSubmit={handleSubmit}>
                    <div className='container'>
                        <div className='row justify-content-center mt-140'>
                            <div className='col-6'>
                                <div className="card">
                                    <div className="card-header bg-cornflower font-30 font-bold text-center">
                                        Registration page
                                    </div>
                                    <div className="card-body">
                                        {error ? <div className="alert alert-danger" ref={errRef}>{errMsg}</div> : ""}
                                        <div className='mb-3'>
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="text"
                                                ref={emailRef}
                                                className="form-control form-control-lg"
                                                id="email"
                                                aria-describedby="emailHelp"
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                                required
                                                onFocus={() => setEmailFocus(true)}
                                                onBlur={() => setEmailFocus(false)} />
                                            {emailFocus && !validEmail ? <div id="emailHelp" className="form-text">Can Contain letters, digits, hyphens, and dots. Must Contain @ and . provided it is not the first and last character.</div> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                                value={password}
                                                required
                                                onFocus={() => setPwdFocus(true)}
                                                onBlur={() => setPwdFocus(false)} />
                                            {pwdFocus && !validPwd ? <div id="pwdHelp" className="form-text">8 to 24 characters. Must Include upperCase,lowerCase letter,number and special character. Allowed special character are '@','#','$','%'.</div> : ""}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirm_pwd" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control form-control-lg"
                                                id="confirm_pwd"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                value={confirmPassword}
                                                required
                                                onFocus={() => setConfirmPwdFocus(true)}
                                                onBlur={() => setConfirmPwdFocus(false)} />
                                            {confirmPwdFocus && !validConfirmPwd ? <div id="confirmpwdHelp" className="form-text">Password does not match</div> : ""}
                                        </div>
                                        <div className='text-center'>
                                            <button type="submit" className="btn btn-primary px-4 py-2" disabled={!validEmail || !validPwd || !validConfirmPwd ? true : false}>Sign Up</button>
                                        </div>
                                        <div>
                                            <Link to="#" style={{textDecoration:"none"}}>Already have an account?</Link>
                                            <br/>
                                            <Link to="/Login">Sign In</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>}
        </>
    )
}

export default Register