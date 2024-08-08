import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { userService } from '../services/user.service.ts'
import Loader from '../components/Loader.tsx'

interface AuthContextType {
	isAuthenticated: boolean
	setIsAuthenticated: (auth: boolean) => void
	isLoading: boolean
	isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const userProfile = await userService.getProfile()
				setIsAuthenticated(true)
				setIsAdmin(userProfile.isAdmin)
			} catch (error) {
				setIsAuthenticated(false)
				setIsAdmin(false)
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [])

	if (isLoading) {
		return <Loader />
	}

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, isAdmin, setIsAuthenticated, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider, AuthContext }
