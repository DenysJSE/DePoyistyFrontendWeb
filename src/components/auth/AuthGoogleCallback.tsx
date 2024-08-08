import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Loader from '../Loader.tsx'
import { saveToStorage } from '../../services/auth-token.service.ts'
import { TAuthResponse } from '../../types/auth.types.ts'

const AuthCallback = () => {
	const navigate = useNavigate()
	const query = new URLSearchParams(window.location.search)
	const response = query.get('response')

	useEffect(() => {
		if (response) {
			try {
				const userData: TAuthResponse = JSON.parse(decodeURIComponent(response))
				saveToStorage(userData)
				navigate('/')
			} catch (error) {
				console.error('Failed to parse authentication response:', error)
			}
		}
	}, [response, navigate])

	return <Loader />
}

export default AuthCallback
