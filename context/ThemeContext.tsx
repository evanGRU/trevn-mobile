import React, { createContext, useState, useContext } from 'react';

type ThemeType = 'light' | 'dark';

const ThemeContext = createContext({
    theme: 'light' as ThemeType,
    toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const systemScheme = useColorScheme();
    const [theme, setTheme] = useState<ThemeType>('dark');

    const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);