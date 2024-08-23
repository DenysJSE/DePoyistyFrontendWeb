import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { userService } from '../services/user.service.ts'
import Loader from '../components/Loader.tsx'
import { TFullUser } from '../types/user.types.ts'
import { authService } from '../services/auth.service.ts'

export type AuthContextType = {
	isAuthenticated: boolean
	setIsAuthenticated: (auth: boolean) => void
	isLoading: boolean
	isAdmin: boolean
	user: TFullUser | undefined
	checkAuth: () => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [user, setUser] = useState<TFullUser | undefined>()

	const logout = async () => {
		try {
			await authService.logout()
			setIsAuthenticated(false)
			setUser(undefined)
			setIsAuthenticated(false)
		} catch (e) {
			console.log(e)
		}
	}

	const checkAuth = async () => {
		try {
			const userProfile = await userService.getProfile()
			setUser(userProfile)
			setIsAuthenticated(true)
			setIsAdmin(userProfile.isAdmin)
		} catch (error) {
			setIsAuthenticated(false)
			setUser(undefined)
			setIsAdmin(false)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		checkAuth()
	}, [])

	if (isLoading) {
		return <Loader className='h-screen' />
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isAdmin,
				setIsAuthenticated,
				isLoading,
				user,
				checkAuth,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider, AuthContext }
