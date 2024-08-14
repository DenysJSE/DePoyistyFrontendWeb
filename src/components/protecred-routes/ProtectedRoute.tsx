import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider.tsx'
import Loader from '../Loader.tsx'

interface PrivateRouteProps {
	children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const authContext = useContext(AuthContext)
	const location = useLocation()

	if (authContext === undefined) {
		throw new Error('PrivateRoute must be used within an AuthProvider')
	}

	const { isAuthenticated, isLoading } = authContext

	if (isLoading) {
		return <Loader />
	}

	if (!isAuthenticated) {
		localStorage.setItem('redirectPath', location.pathname)
		return <Navigate to='/auth' />
	}

	return <>{children}</>
}

export default PrivateRoute
