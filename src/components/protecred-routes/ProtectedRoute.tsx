import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider.tsx'
import Loader from '../Loader.tsx'

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
		return <Loader />
	}

	return isAuthenticated ? <>{children}</> : <Navigate to='/auth' />
}

export default PrivateRoute
