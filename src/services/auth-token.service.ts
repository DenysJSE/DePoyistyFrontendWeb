import { TAuthResponse } from '../types/auth.types.ts'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN } from '../constants/constants.ts'

export const getAccessToken = () => {
	const accessToken = Cookies.get(ACCESS_TOKEN)
	return accessToken || null
}

export const saveToStorage = (data: TAuthResponse) => {
	Cookies.set(ACCESS_TOKEN, data.accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
	localStorage.setItem('user', JSON.stringify(data.user))
}

export const removeFromStorage = () => {
	Cookies.remove(ACCESS_TOKEN)
	Cookies.remove('refreshToken')
	localStorage.removeItem('user')
}
