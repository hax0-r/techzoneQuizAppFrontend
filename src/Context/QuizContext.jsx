import React, { createContext, useState } from 'react';
import QUESTIONS from '../Data/QUESTIONS';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizResult, setQuizResult] = useState({
        earnedPoints: 0,
        result: '',
        totalPoints: 10,
        totalQuestions: QUESTIONS.length,
        username: '',
        idNumber: ''
    });

    return (
        <QuizContext.Provider value={{ quizResult, setQuizResult }}>
            {children}
        </QuizContext.Provider>
    );
};
