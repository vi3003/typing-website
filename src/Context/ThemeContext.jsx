import { createContext, useState , useContext } from "react";
import { themeOptions } from "../Utils/themeOptions";

const themeContext = createContext();

export const ThemeContextProvider = ({children}) => {

    const defaultValue = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value;
    const [theme, setTheme] = useState(defaultValue);

    const values = {
        theme,
        setTheme
    }

    return (<themeContext.Provider value = {values}>{children}</themeContext.Provider>)
}

export const useTheme = () => useContext(themeContext);
