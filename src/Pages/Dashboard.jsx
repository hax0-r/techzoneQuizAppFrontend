import React, { useState, useEffect, useContext } from 'react';
import { errorNotify, successNotify } from '../Components/Toastify';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { QuizContext } from '../Context/QuizContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();
    const { questions, setQuestions, setTimer } = useContext(QuizContext);
    const [formData, setFormData] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        correctOption: '1'
    });

    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/questions");
            if (res.data.status) {
                setQuestions(res.data.data);
            } else {
                errorNotify(res.data.message);
            }
        } catch (err) {
            console.error("Failed to fetch questions:", err);
            errorNotify("Failed to fetch questions");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const formHandler = async (e) => {
        e.preventDefault();
        const { question, option1, option2, option3, option4, correctOption } = formData;

        if (!question || !option1 || !option2 || !option3 || !option4) {
            errorNotify("All fields are required");
            return;
        }

        const objToSend = {
            question,
            option1,
            option2,
            option3,
            option4,
            correctOption
        };

        try {
            if (editIndex !== null) {
                const res = await axios.put("http://localhost:3000/api/question", {
                    id: questions[editIndex]._id,
                    ...objToSend
                });
                if (res.data.status) {
                    const updatedQuestions = [...questions];
                    updatedQuestions[editIndex] = res.data.data;
                    setQuestions(updatedQuestions);
                    successNotify("Question updated successfully");
                } else {
                    errorNotify(res.data.message);
                }
                setEditIndex(null);
            } else {
                const res = await axios.post("http://localhost:3000/api/addQuestion", objToSend);
                if (res.data.status) {
                    setQuestions((prevQuestions) => [...prevQuestions, res.data.data]);
                    successNotify("Question added successfully");
                } else {
                    errorNotify(res.data.message);
                }
            }
            setFormData({
                question: '',
                option1: '',
                option2: '',
                option3: '',
                option4: '',
                correctOption: '1'
            });
        } catch (err) {
            console.error("Failed to add/update question:", err);
            errorNotify("Failed to add/update question");
        }
    };

    const handleEdit = (index) => {
        const questionToEdit = questions[index];
        setFormData({
            question: questionToEdit.question,
            option1: questionToEdit.option1,
            option2: questionToEdit.option2,
            option3: questionToEdit.option3,
            option4: questionToEdit.option4,
            correctOption: questionToEdit.correctOption.toString()
        });
        setEditIndex(index);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (index) => {
        const questionToDelete = questions[index];
        try {
            const res = await axios.delete(`http://localhost:3000/api/questions/${questionToDelete._id}`);
            if (res.data.status) {
                setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
                successNotify("Question deleted successfully");
            } else {
                errorNotify(res.data.message);
            }
        } catch (err) {
            console.error("Failed to delete question:", err);
            errorNotify("Failed to delete question");
        }
    };

    return (
        <div>
            <h1 className='text-2xl text-center py-5 text-blue'>Dashboard</h1>
            <form onSubmit={formHandler}>
                <div className="max-w-[75rem] px-10 py-10 m-auto">
                    <h2 className='font-semibold pb-3'>{editIndex !== null ? "Edit Question" : "Add Question"}</h2>
                    <textarea
                        rows={5}
                        name="question"
                        placeholder='Enter Question*'
                        className='border-2 resize-none w-full px-5 py-3 rounded-md'
                        value={formData.question}
                        onChange={handleChange}
                    />
                    <h2 className='font-semibold pt-5 pb-2'>Option 1</h2>
                    <input
                        type="text"
                        name="option1"
                        placeholder='Enter option 1*'
                        className='border-2 w-full px-3 py-2 rounded-md'
                        value={formData.option1}
                        onChange={handleChange}
                    />
                    <h2 className='font-semibold pt-5 pb-2'>Option 2</h2>
                    <input
                        type="text"
                        name="option2"
                        placeholder='Enter option 2*'
                        className='border-2 w-full px-3 py-2 rounded-md'
                        value={formData.option2}
                        onChange={handleChange}
                    />
                    <h2 className='font-semibold pt-5 pb-2'>Option 3</h2>
                    <input
                        type="text"
                        name="option3"
                        placeholder='Enter option 3*'
                        className='border-2 w-full px-3 py-2 rounded-md'
                        value={formData.option3}
                        onChange={handleChange}
                    />
                    <h2 className='font-semibold pt-5 pb-2'>Option 4</h2>
                    <input
                        type="text"
                        name="option4"
                        placeholder='Enter option 4*'
                        className='border-2 w-full px-3 py-2 rounded-md'
                        value={formData.option4}
                        onChange={handleChange}
                    />
                    <h2 className='font-semibold pt-5 pb-2'>Select Correct Option*</h2>
                    <select
                        name="correctOption"
                        className='border-2 w-full px-3 py-2 rounded-md'
                        value={formData.correctOption}
                        onChange={handleChange}
                    >
                        <option value="1">Option 1</option>
                        <option value="2">Option 2</option>
                        <option value="3">Option 3</option>
                        <option value="4">Option 4</option>
                    </select>
                    <p className='text-zinc-500 p-2'>If you do not select any option then automatically select option 1</p>
                    <button className='bg-blue w-full p-2 mt-5 rounded-md text-white font-semibold transition-all border-2 border-blue hover:bg-transparent hover:text-blue active:scale-95'>
                        {editIndex !== null ? "Update Question" : "Add Question"}
                    </button>
                </div>
            </form>
            <div className="max-w-[75rem] px-10 py-10 m-auto ">
                <h2 className='font-semibold pb-3 text-center'>Questions List</h2>
                {questions.length > 0 ? (
                    questions.map((q, index) => (
                        <div key={q._id} className="border-2 relative border-[#0000000f]  mb-5 p-5 rounded-md py-3">
                            <div className="flex justify-between items-start">
                                <h3 className='px-2 font-semibold py-5'> Q{index + 1}:&nbsp;&nbsp;  {q.question}</h3>
                                <div className="">
                                    <button onClick={() => handleEdit(index)} className=" transition-all hover:opacity-75 active:scale-95 mr-2 bg-blue text-white p-[.4rem] rounded-md text-[1.2rem]"><FaEdit /></button>
                                    <button onClick={() => handleDelete(index)} className=' transition-all hover:opacity-75 active:scale-95  bg-blue text-white p-[.4rem] rounded-md text-[1.2rem]'><MdDelete /></button>
                                </div>
                            </div>
                            <p className={`px-2 py-2 rounded-md mb-2 ${q.correctOption === '1' ? 'bg-green-300' : 'bg-red-100'}`}><span className='opacity-50 text-sm'>Option 1:</span> &nbsp;&nbsp; {q.option1}</p>
                            <p className={`px-2 py-2 rounded-md mb-2 ${q.correctOption === '2' ? 'bg-green-300' : 'bg-red-100'}`}><span className='opacity-50 text-sm'>Option 2:</span>&nbsp;&nbsp; {q.option2}</p>
                            <p className={`px-2 py-2 rounded-md mb-2 ${q.correctOption === '3' ? 'bg-green-300' : 'bg-red-100'}`}><span className='opacity-50 text-sm'>Option 3:</span>&nbsp;&nbsp; {q.option3}</p>
                            <p className={`px-2 py-2 rounded-md mb-2 ${q.correctOption === '4' ? 'bg-green-300' : 'bg-red-100'}`}><span className='opacity-50 text-sm'>Option 4:</span>&nbsp;&nbsp; {q.option4}</p>
                        </div>
                    ))
                ) : (
                    <p>No questions available.</p>
                )}

            </div>
        </div>
    );
};

export default Dashboard;
