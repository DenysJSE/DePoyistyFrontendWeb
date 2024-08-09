import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext.tsx'

const ThemeSwitcher: React.FC = () => {
	const context = useContext(ThemeContext)

	if (!context) {
		return null
	}

	const { isDark, setIsDark } = context

	const toggleTheme = () => {
		setIsDark(!isDark)
	}

	return (
		<button onClick={toggleTheme} type='button'>
			Switch to {isDark ? 'light' : 'dark'} mode
		</button>
	)
}

export default ThemeSwitcher
