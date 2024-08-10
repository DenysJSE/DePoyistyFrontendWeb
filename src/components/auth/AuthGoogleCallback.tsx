import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import Loader from '../Loader.tsx'
import { saveToStorage } from '../../services/auth-token.service.ts'
import { TAuthResponse } from '../../types/auth.types.ts'
import { AuthContext } from '../../context/AuthProvider.tsx'

const AuthCallback = () => {
	const navigate = useNavigate()
	const query = new URLSearchParams(window.location.search)
	const response = query.get('response')

	const authContext = useContext(AuthContext)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!authContext) {
			setError('AuthContext is undefined')
			return
		}

		const { checkAuth } = authContext

		if (response) {
			try {
				const userData: TAuthResponse = JSON.parse(decodeURIComponent(response))
				saveToStorage(userData)
				checkAuth()
				navigate('/')
			} catch (error) {
				console.error('Failed to parse authentication response:', error)
			}
		}
	}, [response, navigate, authContext])

	if (error) {
		return <div>{error}</div>
	}

	return <Loader />
}

export default AuthCallback
