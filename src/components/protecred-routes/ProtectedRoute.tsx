import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider.tsx'

interface PrivateRouteProps {
	children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const authContext = useContext(AuthContext)

	if (authContext === undefined) {
		throw new Error('PrivateRoute must be used within an AuthProvider')
	}

	const { isAuthenticated, isLoading } = authContext

	if (isLoading) {
		return <div>Loading...</div>
	}

	return isAuthenticated ? <>{children}</> : <Navigate to='/auth' />
}

export default PrivateRoute
