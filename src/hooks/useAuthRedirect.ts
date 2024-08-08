import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const navigate = useNavigate()
	const user = localStorage.getItem('user')

	useEffect(() => {
		if (user) navigate('/')
	}, [navigate, user])
}
