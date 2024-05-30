import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { QuizContext } from '../Context/QuizContext';
import { MainContext } from '../Context/MainContext';

const Result = () => {
    const { quizResult } = useContext(QuizContext);
    const { userName, idNumber } = useContext(MainContext);

    useEffect(() => {
        if (userName && idNumber) {
            const studentsData = JSON.parse(localStorage.getItem('studentsData')) || [];
            const newStudent = { userName, idNumber, earnedPoints: quizResult.earnedPoints, result: quizResult.result };
            studentsData.push(newStudent);
            localStorage.setItem('studentsData', JSON.stringify(studentsData));
        }
    }, [userName, idNumber, quizResult.earnedPoints, quizResult.result]);

    return (
        <>
            <div className="pt-16">
                <h1 className='text-blue pb-5 text-center'>Result's</h1>
                <div className="leading-10 p-3 max-w-[40rem] m-auto">
                    <div className="flex pt-3 justify-between">
                        <span>Username </span>
                        <span>{userName} </span>
                    </div>
                    <hr />
                    <div className="flex pt-3 justify-between">
                        <span>Id No </span>
                        <span>{idNumber} </span>
                    </div>
                    <hr />
                    <div className="flex pt-3 justify-between">
                        <span>Total Quiz Point </span>
                        <span>{quizResult.totalPoints} </span>
                    </div>
                    <hr />
                    <div className="flex pt-3 justify-between">
                        <span>Total Question </span>
                        <span>{quizResult.totalQuestions} </span>
                    </div>
                    <hr />
                    <div className="flex pt-3 justify-between">
                        <span>Earn Point's </span>
                        <span>{quizResult.earnedPoints} </span>
                    </div>
                    <hr />
                    <div className="flex pt-3 justify-between">
                        <span>Your Results </span>
                        <span>{quizResult.result} </span>
                    </div>
                    <hr />
                    <div className='flex justify-center mt-12 items-center'>
                        <Link to={"/main"}>
                            <button className='bg-blue hover:bg-transparent active:mt-1 transition-all duration-200 border-2 border-blue px-7 hover:text-blue py-1 w-full text-white font-medium rounded-lg'>
                                Close
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Result;
