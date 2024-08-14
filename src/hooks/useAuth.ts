import { useContext } from 'react'
import { AuthContext, AuthContextType } from '../context/AuthProvider.tsx'

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within and AuthProvider')
	}
	return context
}
