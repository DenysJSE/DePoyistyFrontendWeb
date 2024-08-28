import { axiosClassic, axiosWithAuth } from '../api/interceptor.ts'
import { TCreateDish, TDish } from '../types/dish.types.ts'

export const dishService = {
	async getAllDishes() {
		const response = await axiosClassic.get<TDish[]>('/dishes')
		return response.data
	},

	async getDishById(dishId: number | string) {
		const response = await axiosWithAuth.get<TDish>(`/dishes/by-id/${dishId}`)
		return response.data
	},

	async getDishesBySlug(dishSlug: string) {
		const response = await axiosClassic.get<TDish[]>(
			`/dishes/by-slug/${dishSlug}`
		)
		return response.data
	},

	async createDish(dishData: TCreateDish) {
		const response = await axiosWithAuth.post<TDish>('/dishes', dishData)
		return response.data
	},

	async updateDish(dishId: number | string, dishName: string) {
		const response = await axiosWithAuth.put<TDish>(
			`/dishes/${dishId}`,
			dishName
		)
		return response.data
	},

	async deleteDish(dishId: number | string) {
		const response = await axiosWithAuth.delete(`dishes/${dishId}`)
		return response.data
	}
}
