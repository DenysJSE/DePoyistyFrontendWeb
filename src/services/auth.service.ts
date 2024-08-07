import { axiosClassic, axiosWithAuth } from '../api/interceptor.ts'
import { TAuthForm, TAuthResponse } from '../types/auth.types.ts'
import { removeFromStorage, saveToStorage } from './auth-token.service.ts'

export const authService = {
	async main(type: 'login' | 'register', data: TAuthForm) {
		const response = await axiosClassic.post<TAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data) saveToStorage(response.data)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.get<TAuthResponse>(
			'/auth/login/access-token'
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) removeFromStorage()

		return response
	},

	async verifyEmail(token: string) {
		const response = await axiosWithAuth.get('/auth/verify-email', {
			params: { token }
		})
		return response.data
	}
}
