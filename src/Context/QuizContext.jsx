import React, { createContext, useState, useEffect } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [questions, setQuestions] = useState([]);
    const [timer, setTimer] = useState("");
    const [quizResult, setQuizResult] = useState({
        earnedPoints: 0,
        result: '',
        totalPoints: 10,
        totalQuestions: 0,
        username: '',
        idNumber: ''
    });

    useEffect(() => {
        setQuizResult(prevResult => ({
            ...prevResult,
            totalQuestions: questions.length
        }));
    }, [questions]);

    return (
        <QuizContext.Provider value={{ quizResult, setQuizResult, questions, setQuestions, timer, setTimer }}>
            {children}
        </QuizContext.Provider>
    );
};
