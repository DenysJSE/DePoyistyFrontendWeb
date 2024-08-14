import React from 'react'
import { Navigate } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFoundPage.tsx'
import Loader from '../Loader.tsx'
import { useAuth } from '../../hooks/useAuth.ts'

interface PrivateRouteProps {
	children: React.ReactNode
}

const AdminPrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const { isAuthenticated, isAdmin, isLoading } = useAuth()

	if (isLoading) {
		return <Loader />
	}

	if (!isAdmin) {
		return <NotFoundPage />
	}

	return isAuthenticated && isAdmin ? <>{children}</> : <Navigate to='/auth' />
}

export default AdminPrivateRoute
