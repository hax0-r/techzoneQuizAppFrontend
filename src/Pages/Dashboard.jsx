import React, { useState, useContext } from 'react';
import { errorNotify } from '../Components/Toastify';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { QuizContext } from '../Context/QuizContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const { questions, setQuestions, setTimer, timer } = useContext(QuizContext);
    const [formData, setFormData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '1'
    });

    const [editIndex, setEditIndex] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const formHandler = (e) => {
        e.preventDefault();
        const { question, option1, option2, option3, option4, correctOption } = formData;

        if (!question || !option1 || !option2 || !option3 || !option4) {
            errorNotify("All fields are required");
            return;
        }

        const newQuestion = {
            question,
            options: [option1, option2, option3, option4],
            correctOption
        };

        if (editIndex !== null) {
            const updatedQuestions = [...questions];
            updatedQuestions[editIndex] = newQuestion;
            setQuestions(updatedQuestions);
            setEditIndex(null);
        } else {
            setQuestions((prevData) => [...prevData, newQuestion]);
        }

        setFormData({
            question: '',
            option1: '',
            option2: '',
            option3: '',
            option4: '',
            correctOption: '1'
        });
    };

    const handleEdit = (index) => {
        const questionToEdit = questions[index];
        setFormData({
            question: questionToEdit.question,
            option1: questionToEdit.options[0],
            option2: questionToEdit.options[1],
            option3: questionToEdit.options[2],
            option4: questionToEdit.options[3],
            correctOption: questionToEdit.correctOption
        });
        setEditIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    const inputChangeHandler = (e) => {
        e.preventDefault();
        setTimer(e.target.value);
    };

    return (
        <>
            <div className="">
                <h1 className='text-[2rem] text-center py-5 text-blue'>Dashboard</h1>
                <form onSubmit={formHandler}>
                    <div className="max-w-[75rem] px-10 py-10 m-auto">
                        <h2 className='font-semibold pb-3'>Add Question</h2>
                        <textarea
                            rows={5}
                            name="question"
                            placeholder='Enter Question*'
                            className='border-[1.8px] resize-none border-[#8080802c] w-full px-5 py-3 rounded-md'
                            value={formData.question}
                            onChange={handleChange}
                        />
                        <h2 className='font-semibold pt-5 pb-2'>Option 1</h2>
                        <input
                            type="text"
                            name="option1"
                            placeholder='Enter option 1*'
                            className='border-[1.8px] border-[#8080802c] w-full px-3 placeholder:text-sm py-2 rounded-md'
                            value={formData.option1}
                            onChange={handleChange}
                        />
                        <h2 className='font-semibold pt-5 pb-2'>Option 2</h2>
                        <input
                            type="text"
                            name="option2"
                            placeholder='Enter option 2*'
                            className='border-[1.8px] border-[#8080802c] w-full px-3 placeholder:text-sm py-2 rounded-md'
                            value={formData.option2}
                            onChange={handleChange}
                        />
                        <h2 className='font-semibold pt-5 pb-2'>Option 3</h2>
                        <input
                            type="text"
                            name="option3"
                            placeholder='Enter option 3*'
                            className='border-[1.8px] border-[#8080802c] w-full px-3 placeholder:text-sm py-2 rounded-md'
                            value={formData.option3}
                            onChange={handleChange}
                        />
                        <h2 className='font-semibold pt-5 pb-2'>Option 4</h2>
                        <input
                            type="text"
                            name="option4"
                            placeholder='Enter option 4*'
                            className='border-[1.8px] border-[#8080802c] w-full px-3 placeholder:text-sm py-2 rounded-md'
                            value={formData.option4}
                            onChange={handleChange}
                        />
                        <h2 className='font-semibold pt-5 pb-2'>Select Correct Option*</h2>
                        <select
                            name="correctOption"
                            className='border-[1.8px] border-[#8080802c] w-full px-3 placeholder:text-sm py-2 rounded-md'
                            value={formData.correctOption}
                            onChange={handleChange}
                        >
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            <option value="4">Option 4</option>
                        </select>
                        <p className='text-zinc-500 p-2'>If you do not select any option then automatically select option 1</p>
                        <button className='bg-blue w-full p-[.65rem] transition-all mt-5 rounded-md text-white font-semibold hover:bg-transparent hover:text-blue active:scale-95 border-2 border-blue'>
                            {editIndex !== null ? 'Update' : 'Add'}
                        </button>
                        <button type="button" onClick={() => navigate('/quiz')}>navigate</button>
                    </div>
                </form>

                <div className="flex max-w-[75rem] m-auto px-10 justify-center items-center text-center gap-4 pt-10">
                    <h2 className='font-semibold  whitespace-nowrap'>Add Timer : </h2>
                    <input onChange={inputChangeHandler} type="number" placeholder='Enter time in minutes' className='border-[1.8px] border-[#8080802c] w-full px-3 placeholder:text-sm py-2 rounded-md' />
                    <button onClick={() => setTimer("")} className='bg-blue p-[.5rem] px-10 transition-all rounded-md text-white font-semibold hover:bg-transparent hover:text-blue active:scale-95 border-2 border-blue'>Add</button>
                </div>

                <div className="max-w-[95%] m-auto h-[2px] bg-zinc-300 mt-10 px-10"></div>
                <div className="">
                    <div className="py-10 max-w-[75rem] m-auto px-10">
                        <h1 className='text-[2rem] text-center py-5 text-blue font-semibold'>Question List</h1>
                        {questions.length > 0 ? questions.map((data, index) => (
                            <div key={index} className="border-2 p-4 border-gray-200 rounded-md mt-9">
                                <div className="flex justify-end gap-2">
                                    <FaEdit
                                        className='bg-blue text-white p-2 rounded-md text-[2rem] cursor-pointer hover:opacity-60 transition-all active:scale-95'
                                        onClick={() => handleEdit(index)}
                                    />
                                    <MdDelete
                                        className='bg-blue text-white p-2 rounded-md hover:opacity-60 transition-all active:scale-95 text-[2rem] cursor-pointer'
                                        onClick={() => handleDelete(index)}
                                    />
                                </div>
                                <h2 className='font-semibold px-2 pb-5'>Q{index + 1}: {data.question}</h2>
                                <p className='px-2 py-1'>A. {data.options[0]}</p>
                                <p className='px-2 py-1'>B. {data.options[1]}</p>
                                <p className='px-2 py-1'>C. {data.options[2]}</p>
                                <p className='px-2 py-1'>D. {data.options[3]}</p>
                                <p className='px-2 py-2 mt-2 rounded-md bg-green-200'>Answer: {data.options[data.correctOption - 1]}</p>
                            </div>
                        )) : <p className='text-center font-semibold text-[1.7rem] pt-7 text-zinc-300 select-none'>Empty</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
