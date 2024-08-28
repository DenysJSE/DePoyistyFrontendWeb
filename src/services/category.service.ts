import { axiosClassic, axiosWithAuth } from '../api/interceptor.ts'
import { TCategory, TUpdateCategory } from '../types/category.types.ts'

export const categoryService = {
	async getAllCategories() {
		const response = await axiosClassic.get<TCategory[]>('/categories')
		return response.data
	},

	async getCategoryById(categoryId: number | string) {
		const response = await axiosWithAuth.get<TCategory>(
			`/categories/by-id/${categoryId}`
		)
		return response.data
	},

	async getCategoryBySlug(categorySlug: string) {
		const response = await axiosClassic.get<TCategory>(
			`/categories/by-slug/${categorySlug}`
		)
		return response.data
	},

	async createCategory(categoryData: TUpdateCategory) {
		const response = await axiosWithAuth.post<TCategory>(
			'/categories',
			categoryData
		)
		return response.data
	},

	async updateCategory(
		categoryId: number | string,
		categoryName: { name: string }
	) {
		const response = await axiosWithAuth.put<TCategory>(
			`/categories/${categoryId}`,
			categoryName
		)
		return response.data
	},

	async deleteCategory(categoryId: number | string) {
		const response = await axiosWithAuth.delete(`categories/${categoryId}`)
		return response.data
	}
}
