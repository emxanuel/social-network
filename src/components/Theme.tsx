import React, { createContext, useContext, useState, useEffect } from "react";

interface props {
    children: JSX.Element
}

const themeContext = createContext('light')

const ThemeProvider: React.FC<props> = ({children}) => {
    let storedTheme = localStorage.getItem('theme')
    let theme = storedTheme !== null? 
        useState(storedTheme) : useState('light')

    return (
        <themeContext.Provider value={theme[0]}>
            {children}
        </themeContext.Provider>
    )
}

const useThemeContext = () => {
    return useContext(themeContext)
}

export {themeContext, ThemeProvider, useThemeContext}