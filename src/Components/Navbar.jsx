import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const navi = ()=>{
        navigate('/studentstable')
    }
    
    return (
        <>
            <div className="flex py-2 justify-between items-center px-20">
                <Link to={"/main"}>
                <img className='h-20' src="./assets/logo.jpg" alt="" />
                </Link>
                <Link to={"/studentstable"}>
                    <button onClick={navi} className='bg-blue hover:bg-transparent transition-all duration-200 border-2 border-blue px-7 hover:text-blue py-2 text-white font-medium rounded-lg'>Sign Up</button>
                </Link>
            </div>
        </>
    )
}

export default Navbar