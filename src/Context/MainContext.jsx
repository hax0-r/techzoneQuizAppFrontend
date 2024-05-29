import React, { createContext, useState } from 'react';

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
    const [userName, setUserName] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const handleIdNumberChange = (e) => {
        setIdNumber(e.target.value);
    }

    return (
        <MainContext.Provider value={{ userName, setUserName, handleUserNameChange, handleIdNumberChange, idNumber, setIdNumber }}>
            {children}
        </MainContext.Provider>
    );
};
