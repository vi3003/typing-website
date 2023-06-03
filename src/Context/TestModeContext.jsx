import { createContext, useState, useContext } from "react";


const TestModeContext = createContext();

export const TestmodeContextProvider = ({children}) =>{

    const [testTime, setTestTime] = useState(15);

    const values = {
        testTime,
        setTestTime
    }

    return (<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>)
}

export const useTestMode = ()=> useContext(TestModeContext);