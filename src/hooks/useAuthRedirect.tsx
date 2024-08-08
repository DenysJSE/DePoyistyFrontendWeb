import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const useAuthRedirect = () => {
	const [isLoading, setIsLoading] = useState(true)

	const navigate = useNavigate()
	const user = localStorage.getItem('user')

	useEffect(() => {
		if (user) navigate('/')
		else setIsLoading(false)
	}, [navigate, user])

	return isLoading
}
