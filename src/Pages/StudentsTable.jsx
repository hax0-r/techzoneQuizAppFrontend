import React, { useEffect, useState } from 'react';

const StudentsTable = () => {
    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('studentsData');
        if (data) {
            setStudentsData(JSON.parse(data));
        }
    }, []);

    return (
        <div className="">
            <h1 className='text-blue pt-5 text-center '>Student Table</h1>
            <div className="max-w-[75rem] flex-col flex justify-center items-center pt-10 m-auto">
                <div className="flex py-4 rounded-md text-white font-medium bg-blue justify-between w-full px-10 items-center">
                    <span className='w-[20rem] overflow-hidden text-ellipsis'>Id No</span>
                    <span className='w-[20rem] overflow-hidden text-ellipsis'>Username</span>
                    <span className='w-[16rem] overflow-hidden text-center'>Earn Points</span>
                    <span className='w-[20rem] overflow-hidden text-center'>Result</span>
                </div>
                {studentsData.map((student, index) => (
                    <div key={index} className="flex justify-between w-full px-10 pb-2 pt-7 items-center">
                        <span className='w-[15rem] mr-[5rem] overflow-hidden text-ellipsis'>{student.idNumber}</span>
                        <span className='w-[20rem] overflow-hidden text-ellipsis'>{student.userName}</span>
                        <span className='w-[16rem] overflow-hidden text-center'>{student.earnedPoints}</span>
                        <span className='w-[20rem] overflow-hidden text-center'>{student.result}</span>
                    </div>
                ))}
                <div className="w-full h-[2px] bg-gray-100 rounded-3xl" />
            </div>
        </div>
    );
}

export default StudentsTable;
