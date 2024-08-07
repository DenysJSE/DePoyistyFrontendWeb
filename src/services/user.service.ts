import { axiosWithAuth } from '../api/interceptor.ts'
import { TFullUser, TUserForm } from '../types/user.types.ts'

const BASE_USER_URL = '/users/profile'

export const userService = {
	async getProfile() {
		const response = await axiosWithAuth.get<TFullUser>(BASE_USER_URL)
		return response.data
	},

	async updateProfile(data: TUserForm) {
		const response = await axiosWithAuth.put(BASE_USER_URL, data)
		return response.data
	},

	async saveDishToFavorite(dishId: number | string) {
		const response = await axiosWithAuth.patch(
			`${BASE_USER_URL}/favorites/${dishId}`
		)
		return response.data
	},

	async deleteProfile(userId: number | string) {
		const response = await axiosWithAuth.delete(`${BASE_USER_URL}/${userId}`)
		return response.data
	}
}
