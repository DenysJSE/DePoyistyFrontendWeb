import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from '../Loader.tsx'
import { useAuth } from '../../hooks/useAuth.ts'

interface PrivateRouteProps {
	children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const location = useLocation()
	const { isAuthenticated, isLoading } = useAuth()

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
