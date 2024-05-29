import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import QUESTIONS from '../Data/QUESTIONS';
import { QuizContext } from '../Context/QuizContext';

const Quiz = () => {
    const { setQuizResult } = useContext(QuizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [timeLeft, setTimeLeft] = useState(15); // Timer state
    const questionData = QUESTIONS[currentQuestionIndex];
    const navigate = useNavigate();

    const onPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setTimeLeft(15); // Reset timer
        }
    };

    const onNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(15); // Reset timer
        } else {
            calculateMarks();
        }
    };

    const onSelect = (e) => {
        const option = e.target.value;
        setSelectedOptions({
            ...selectedOptions,
            [currentQuestionIndex]: option
        });
    };

    const calculateMarks = () => {
        let marks = 0;
        QUESTIONS.forEach((question, index) => {
            if (selectedOptions[index] === question.correctOption) {
                marks += 1;
            }
        });
        setQuizResult(prevResult => ({
            ...prevResult,
            earnedPoints: marks,
            result: marks >= (QUESTIONS.length * 0.5) ? 'Passed' : 'Failed'
        }));
        navigate('/result');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                onNext();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
        setTimeLeft(15); // Reset timer on question change
        console.log(questionData);
    }, [currentQuestionIndex]);

    const getTimerColor = () => {
        if (timeLeft > 10) return 'bg-green-600';
        if (timeLeft > 4) return 'bg-yellow-500';
        return 'bg-red-600';
    };

    return (
        <>
            <div className="select-none max-w-[55rem] m-auto">
                <div className="">
                    <h1 className='text-blue pb-5 text-center'>Quiz Application</h1>

                    <div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <h2 className="pt-6 pb-4 text-sm text-zinc-400">{questionData.id} of {QUESTIONS.length} question</h2>
                                <h2 className='font-medium max-w-[40rem] w-full text-xl pb-7'>{questionData.question}</h2>
                            </div>
                            <div className={`bg-zinc-200 p-3 w-14 h-14 opacity-80 text-white transition-all duration-200 rounded-full flex justify-center items-center text-center ${getTimerColor()}`}> {timeLeft}s</div>
                        </div>
                        <ul>
                            {questionData.options.map((opti, index) => (
                                <li className='py-2 flex gap-2' key={index}>
                                    <input
                                        className='cursor-pointer'
                                        type="radio"
                                        name={`options-${currentQuestionIndex}`}
                                        value={opti}
                                        checked={selectedOptions[currentQuestionIndex] === opti}
                                        onChange={onSelect}
                                    />
                                    <label>{opti}</label>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            className={`bg-blue transition-all mt-10 duration-200 border-2 border-blue px-7 py-2 text-white font-medium rounded-lg ${currentQuestionIndex === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-transparent hover:text-blue'}`}
                            onClick={onPrev}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            className={`bg-blue transition-all mt-10 duration-200 border-2 border-blue px-11 py-2 text-white font-medium rounded-lg hover:bg-transparent hover:text-blue `}
                            onClick={onNext}
                        >
                            {currentQuestionIndex === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quiz;
