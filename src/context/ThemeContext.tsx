import React, { createContext, ReactNode, useEffect } from 'react'
import useLocalStorage from 'use-local-storage'

interface ThemeContextProps {
	isDark: boolean
	setIsDark: (isDark: boolean) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isDark, setIsDark] = useLocalStorage('isDark', false)

	useEffect(() => {
		document.body.className = isDark ? 'dark' : 'light'
		document.body.dataset.theme = isDark ? 'dark' : 'light'
	}, [isDark])

	return (
		<ThemeContext.Provider value={{ isDark, setIsDark }}>
			{children}
		</ThemeContext.Provider>
	)
}

export { ThemeProvider, ThemeContext }
