import axios, { CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error.ts'
import { authService } from '../services/auth.service.ts'
import {
	getAccessToken,
	removeFromStorage
} from '../services/auth-token.service.ts'

const options: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_API_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true
}

const axiosClassic = axios.create(options)

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'Refresh token not passed!'
				) {
					removeFromStorage()
				}
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
