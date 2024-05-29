import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Main from '../Pages/Main'
import Quiz from '../Pages/Quiz'
import Result from '../Pages/Result'
import StudentsTable from '../Pages/StudentsTable'

const Router = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/studentstable" element={<StudentsTable />} />
    </Routes>
    </>
  )
}

export default Router