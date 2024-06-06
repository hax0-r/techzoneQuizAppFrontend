import React from 'react'
import Navbar from '../Components/Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()


  
  return (
    <>
      <Navbar />
      <div className="max-w-[75rem] px-10 m-auto flex select-none gap-10 justify-between items-center h-[70vh] overflow-hidden">
        <div className="">
          <h1 className='font-semibold leading-3'>2024</h1>
          <h1 className='text-[3.5rem]  text-blue'>TECHZONE</h1>
          <p className=' font-medium max-w-[38rem] leading-5 opacity-90'>The examination will cover all topics discussed in the lectures and listed in the syllabus. Please review your notes and supplementary materials provided throughout the course.</p>
          <button onClick={()=> navigate("/main")} className='py-3 px-7 rounded-md text-white cursor-pointer transition-all duration-200 border-2 border-blue hover:bg-transparent hover:text-blue  font-semibold mt-5 bg-blue'>ENTER NOW</button>
        </div>
        <img src="/assets/logo.webp" className=' h-full select-none p-[1rem] active:rotate-90 transition-all duration-300' alt="" />
      </div>
    </>
  )
}

export default Home