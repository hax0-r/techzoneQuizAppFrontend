import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login';

const Navbar = () => {
    const [isLogin, setIsLogin] = useState(false);


    return (
        <>
            <div className="flex py-2 justify-between items-center px-20">
                <Link to={"/"}>
                    <img className='h-20' src="./assets/logo.webp" alt="" />
                </Link>
                <div className="relative w-full flex justify-end">

                    <button onClick={() => setIsLogin(!isLogin)} className='bg-blue hover:bg-transparent transition-all duration-200 border-2 border-blue px-7 hover:text-blue py-2 text-white font-medium rounded-lg'>Login</button>

                    <div className="absolute top-16 right-24 ">
                        {
                            isLogin && <Login isLogin={isLogin} setIsLogin={setIsLogin} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar