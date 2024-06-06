import React, { useState } from 'react';
import '../Style/Login.css';
import { useNavigate } from 'react-router-dom';
import { errorNotify, successNotify } from './Toastify';
import { IoCloseSharp } from 'react-icons/io5';

const Login = ({ isLogin, setIsLogin }) => {

    const [getLoginPassword, setGetLoginPassword] = useState('');

    const navigate = useNavigate();

    const openLogin = (e) => {
        e.preventDefault();

        if (!getLoginPassword) {
            errorNotify("Enter Password")
        } else if (getLoginPassword === '123') {
            navigate('/studentstable');
            successNotify("Welcome to Student Table")
            setIsLogin(!isLogin)
        } else {
            errorNotify("password is incorrect")
        }
    };

    return (
        <div className="">
            <div className="form-container z-20">
                <IoCloseSharp onClick={() => setIsLogin(!isLogin)} className='absolute text-[2.5rem] top-2 right-2 opacity-70 hover:rotate-90 hover:opacity-100 transition-all cursor-pointer p-2' />
                <div className="logo-container">Login</div>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setGetLoginPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            required=""
                        />
                    </div>
                    <button
                        className="form-submit-btn bg-blue hover:bg-transparent hover:text-blue transition-all duration-200 border-2 border-blue font-medium"
                        onClick={openLogin}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
                <p className="signup-link">Enter password for login student Table</p>
            </div>
        </div>
    );
};

export default Login;
