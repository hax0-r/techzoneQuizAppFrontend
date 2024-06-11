import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../Context/QuizContext';
import { motion } from 'framer-motion';
import axios from 'axios';

const Quiz = () => {
    const { questions, setQuestions, setQuizResult } = useContext(QuizContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const QUIZ_DURATION = 60;
    const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/questions");
            if (res.data.status) {
                setQuestions(res.data.data);
                console.log("fetch data",res.data.data.correctOption);
            } else {
                console.error("Failed to fetch questions:", res.data.message);
            }
        } catch (err) {
            console.error("Failed to fetch questions:", err);
        }
    };

    const onPrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const onNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
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
        console.log("Selected options: ", selectedOptions);
    };

    const calculateMarks = () => {
        let marks = 0;
        const detailedResults = questions.map((question, index) => {
            const userAnswer = selectedOptions[index];
            const isCorrect = userAnswer === question.correctOption;
            if (isCorrect) {
                marks += 1;
                console.log("Marks:- ", marks);
            }
            console.log("UnMarks:- ", marks);
            return {
                question: question.question,
                correctOption: question.correctOption,
                userAnswer,
                isCorrect
            };
        });
        console.log('Detailed Results:', detailedResults);

        const result = {
            totalPoints: questions.length,
            totalQuestions: questions.length,
            earnedPoints: marks,
            result: marks >= (questions.length * 0.5) ? 'Passed' : 'Failed',
            detailedResults
        };

        console.log("Quiz Result: ", result);

        setQuizResult(result);
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
        // Log current question for debugging
        console.log("Current Question Index: ", currentQuestionIndex);
        if (questions[currentQuestionIndex]) {
            console.log("Current Question: ", questions[currentQuestionIndex]);
        }
    }, [currentQuestionIndex]);

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

                    {questions.length > 0 ? (
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="">
                                    <h2 className="pt-6 pb-4 text-sm text-zinc-400">{currentQuestionIndex + 1} of {questions.length} question</h2>
                                    <h2 className='font-medium max-w-[40rem] w-full text-xl pb-7'>{questions[currentQuestionIndex].question}</h2>
                                </div>
                                <div className={`p-4 rounded-full text-center ${timeLeft <= 10 ? 'bg-red-200' : 'bg-zinc-200'}`}>
                                    {`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}s
                                </div>
                            </div>
                            <ul>
                                {[questions[currentQuestionIndex].option1, questions[currentQuestionIndex].option2, questions[currentQuestionIndex].option3, questions[currentQuestionIndex].option4].map((option, index) => (
                                    <li className='py-2 flex gap-2 cursor-pointer' key={index}>
                                        <input
                                            className='cursor-pointer'
                                            type="radio"
                                            id={`option-${index}`}
                                            name={`options-${currentQuestionIndex}`}
                                            value={option}
                                            checked={selectedOptions[currentQuestionIndex] === option}
                                            onChange={onSelect}
                                        />
                                        <label className='cursor-pointer' htmlFor={`option-${index}`}>{option}</label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className='text-center font-semibold text-[1.7rem] pt-7 text-zinc-300 select-none'>No questions available</p>
                    )}

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
                            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Quiz;
