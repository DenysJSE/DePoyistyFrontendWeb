import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider.tsx'
import { Navigate } from 'react-router-dom'
import NotFoundPage from '../../pages/NotFoundPage.tsx'
import Loader from '../Loader.tsx'

interface PrivateRouteProps {
	children: React.ReactNode
}

const AdminPrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const authContext = useContext(AuthContext)

	if (authContext === undefined) {
		throw new Error('AdminRoute must be used within an AuthProvider')
	}

	const { isAuthenticated, isAdmin, isLoading } = authContext

	if (isLoading) {
		return <Loader />
	}

	if (!isAdmin) {
		return <NotFoundPage />
	}

	return isAuthenticated && isAdmin ? <>{children}</> : <Navigate to='/auth' />
}

export default AdminPrivateRoute
