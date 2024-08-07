import { axiosClassic, axiosWithAuth } from '../api/interceptor.ts'
import { TRestaurant } from '../types/restaurant.types.ts'

export const restaurantService = {
	async getAllRestaurants() {
		const response = await axiosClassic.get<TRestaurant[]>('/restaurants')
		return response.data
	},

	async getRestaurantById(restaurantId: number | string) {
		const response = await axiosWithAuth.get<TRestaurant>(
			`/restaurants/by-id/${restaurantId}`
		)
		return response.data
	},

	async getRestaurantBySlug(restaurantSlug: string) {
		const response = await axiosClassic.get<TRestaurant>(
			`/restaurants/by-slug/${restaurantSlug}`
		)
		return response.data
	},

	async createRestaurant(restaurantName: string) {
		const response = await axiosWithAuth.post<TRestaurant>(
			'/restaurants',
			restaurantName
		)
		return response.data
	},

	async updateRestaurant(
		restaurantId: number | string,
		restaurantName: string
	) {
		const response = await axiosWithAuth.put<TRestaurant>(
			`/restaurants/${restaurantId}`,
			restaurantName
		)
		return response.data
	},

	async deleteRestaurant(restaurantId: number | string) {
		const response = await axiosWithAuth.delete(`restaurants/${restaurantId}`)
		return response.data
	}
}
