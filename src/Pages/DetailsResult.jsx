import React, { useContext } from 'react'
import { QuizContext } from '../Context/QuizContext';

const DetailsResult = () => {
    const { quizResult } = useContext(QuizContext);

    return (
        <>
            <div className="pt-16">
                <h1 className='text-blue pb-5 text-center'>Detailed Results</h1>
                <div className="leading-10 select-none p-3 max-w-[75rem] px-10 m-auto">
                    {quizResult && quizResult.detailedResults && quizResult.detailedResults.length > 0 ? (
                        quizResult.detailedResults.map((result, index) => (
                            <div key={index} className="border-2 p-1 rounded-md mb-5 border-[#0000000f]">
                                <div className={`relative p-5 rounded-md py-3 ${result.isCorrect ? 'bg-green-300' : 'bg-red-100 hover:bg-red-200 transition-all cursor-not-allowed'}`}>
                                    <h3 className="font-medium">Question {index + 1}: {result.question}</h3>
                                    <p>Correct Answer: {result.correctOption}</p>
                                    <p>Your Answer: {result.userAnswer}</p>
                                    <p>Result: {result.isCorrect ? 'Correct' : 'Incorrect'}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center select-none opacity-40'>No data available</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default DetailsResult
