import React, { createContext, useContext, useReducer } from "react";

interface ThemeProviderProps {
    children: JSX.Element;
}

enum Actions {
    TOGGLE_THEME = "TOGGLE_THEME",
}

interface ThemeActions {
    type: Actions;
}

interface ThemeState {
    theme: string,
}

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
}

const themeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, { theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'});

    const toggleTheme = () => {
        dispatch({ type: Actions.TOGGLE_THEME });
    };

    return (
        <themeContext.Provider value={{ theme: state.theme, toggleTheme }}>
            {children}
        </themeContext.Provider>
    );
};

const themeReducer = (state: ThemeState, action: ThemeActions) => {
    switch (action.type) {
        case Actions.TOGGLE_THEME:
            return {
                theme: state.theme === "light" ? "dark" : "light",
            };
        default:
            return state;
    }
};

const useThemeContext = () => {
    const context = useContext(themeContext);
    if (context === undefined) {
        throw new Error("useThemeContext debe usarse dentro de un ThemeProvider");
    }
    return context;
};

export { ThemeProvider, useThemeContext };
