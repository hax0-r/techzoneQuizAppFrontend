import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import QUESTIONS from '../Data/QUESTIONS';
import { QuizContext } from '../Context/QuizContext';
import { motion } from 'framer-motion';

const QUIZ_DURATION = 120;

const Quiz = () => {
    const { setQuizResult } = useContext(QuizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
    const questionData = QUESTIONS[currentQuestionIndex];
    const navigate = useNavigate();

    const onPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const onNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
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
        if (timeLeft === 0) {
            calculateMarks();
        }

        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
    }, [currentQuestionIndex]);

    useEffect(() => {
        const handleContextMenu = (e) => e.preventDefault();
        document.addEventListener('contextmenu', handleContextMenu);

        const handleKeyDown = (e) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))) {
                e.preventDefault();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                calculateMarks();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', () => {
            window.history.pushState(null, null, window.location.href);
        });

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const progress = (QUIZ_DURATION - timeLeft) / QUIZ_DURATION * 100;

    return (
        <>
            <motion.div
                className='bg-blue transition-all duration-200'
                style={{
                    width: `${progress}%`,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: 4,
                    transformOrigin: "0%"
                }}
                transition={{ duration: 1 }}
            />
            <div className="select-none max-w-[55rem] m-auto pt-16" style={{ userSelect: 'none' }}>
                <div className="">
                    <h1 className='text-blue pb-5 text-center'>Quiz Application</h1>

                    <div>
                        <div className="flex justify-between items-center">
                            <div className="">
                                <h2 className="pt-6 pb-4 text-sm text-zinc-400">{questionData.id} of {QUESTIONS.length} question</h2>
                                <h2 className='font-medium max-w-[40rem] w-full text-xl pb-7'>{questionData.question}</h2>
                            </div>
                            <div className={`p-4 rounded-full text-center ${timeLeft <= 10 ? 'bg-red-200' : 'bg-zinc-200'}`}>
                                {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}s
                            </div>
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