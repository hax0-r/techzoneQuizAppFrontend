import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';

const StudentsTable = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const data = localStorage.getItem('studentsData');
        if (data) {
            setStudentsData(JSON.parse(data));
        }
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = (index) => {
        const updatedStudentsData = studentsData.filter((_, i) => i !== index);
        setStudentsData(updatedStudentsData);
        localStorage.setItem('studentsData', JSON.stringify(updatedStudentsData));
    };

    const filteredStudentsData = studentsData.filter(student =>
        student.idNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="max-w-[75rem] m-auto px-[3rem] pb-16">
                <div className="flex justify-end">
                    <input
                        type="text"
                        className='border-2 p-2 text-sm border-gray-200 rounded-md max-w-[20rem] w-full focus:border-gray-400 transition-all duration-500'
                        placeholder='Search Id or Name'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <h1 className='text-blue pt-5 text-center '>Student Table</h1>
                <div className="max-w-[75rem] flex-col flex justify-center items-center pt-10 m-auto">
                    <div className="flex py-4 rounded-md text-white font-medium bg-blue justify-between w-full px-10 items-center">
                        <span className='w-[20rem] overflow-hidden text-ellipsis'>Id No</span>
                        <span className='w-[20rem] overflow-hidden text-ellipsis'>Username</span>
                        <span className='w-[16rem] overflow-hidden text-center'>Earn Points</span>
                        <span className='w-[20rem] overflow-hidden text-center'>Result</span>
                        <span className='w-[20rem] overflow-hidden text-center'>Delete</span>
                    </div>
                    {filteredStudentsData.map((student, index) => (
                        <React.Fragment key={index}>
                            <div className="flex justify-between w-full px-10 pb-2 pt-7 items-center">
                                <span className='w-[15rem] mr-[5rem] overflow-hidden text-ellipsis'>{index + 1}.    {student.idNumber}</span>
                                <span className='w-[20rem] overflow-hidden text-ellipsis'>{student.userName}</span>
                                <span className='w-[16rem] overflow-hidden text-center'>{student.earnedPoints}</span>
                                <span className='w-[20rem] overflow-hidden text-center'>{student.result}</span>
                                <span className='w-[20rem] overflow-hidden text-center'>
                                    <button className='bg-blue text-white py-[1.5px] px-3 hover:bg-transparent transition-all duration-200 active:scale-90 hover:text-blue border-2 border-blue rounded-md' onClick={() => handleDelete(index)}>Del</button>
                                </span>
                            </div>
                            <div className="w-full h-[2px] bg-gray-100 rounded-3xl" />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </>
    );
}

export default StudentsTable;
