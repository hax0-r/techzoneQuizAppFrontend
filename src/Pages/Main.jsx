import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../Context/MainContext';

const Main = () => {
    const navigate = useNavigate();
    const { handleUserNameChange, userName, handleIdNumberChange, idNumber } = useContext(MainContext);

    const startNowHandler = () => {
        if (!userName || !idNumber) {
            alert("Required fields are missing");
            return;
        }

        navigate("/quiz");
    }

    return (
        <>
            <div className="max-w-[75rem] m-auto pt-10">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <h1 className='text-blue pb-5'>Some Rules</h1>
                        <div className="flex justify-between items-center">
                            <ul className='pl-5 leading-7 list-none'>
                                <li>1. Each question must be answered within the allotted time.</li>
                                <li>2. No external help or resources are allowed during the quiz.</li>
                                <li>3. All answers must be submitted before moving on to the next question.</li>
                                <li>4. Points will be awarded for each correct answer.</li>
                                <li>5. The quiz must be completed in one sitting; you cannot pause or restart.</li>
                                <li>6. Cheating will result in disqualification from the quiz.</li>
                                <li>7. The decision of the quiz administrator is final and binding.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-[22rem] w-full flex flex-col gap-3">
                        <div className="mb-3">
                            <h2 className='pb-1 text-gray-500 text-sm'>Enter Username</h2>
                            <input
                                type="text"
                                onChange={handleUserNameChange}
                                className='border-2 placeholder:text-zinc-300 placeholder:text-sm text-zinc-500 max-w-[22rem] px-2 py-2 rounded-lg w-full border-zinc-200 focus:border-zinc-400 transition-all duration-200'
                                placeholder='Enter UserName*'
                                required
                            />
                        </div>
                        <div className="">
                            <h2 className='pb-1 text-gray-500 text-sm'>Enter ID</h2>
                            <input
                                type="number"
                                onChange={handleIdNumberChange}
                                className='border-2 placeholder:text-zinc-300 placeholder:text-sm text-zinc-500 max-w-[22rem] px-2 py-2 rounded-lg w-full border-zinc-200 focus:border-zinc-400 transition-all duration-200'
                                placeholder='Enter ID*'
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <button
                        onClick={startNowHandler}
                        className='bg-blue hover:bg-transparent transition-all mt-10 duration-200 border-2 border-blue px-7 hover:text-blue py-2 text-white font-medium rounded-lg'
                    >
                        Start Now
                    </button>
                </div>
            </div>
        </>
    );
}

export default Main;
