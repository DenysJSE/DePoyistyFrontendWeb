import { axiosClassic, axiosWithAuth } from '../api/interceptor.ts'
import { TLeaveReviewData, TReview } from '../types/review.types.ts'

export const reviewService = {
	async getAllDishesReviews() {
		const response = await axiosWithAuth.get<TReview[]>('/reviews/dish')
		return response.data
	},

	async getAllRestaurantsReviews() {
		const response = await axiosWithAuth.get<TReview[]>('/reviews/restaurant')
		return response.data
	},

	async leaveReviewForDish(dishId: number | string, review: TLeaveReviewData) {
		const response = await axiosWithAuth.post(
			`/reviews/leave-for-dish/${dishId}`,
			review
		)
		return response.data
	},

	async leaveReviewForRestaurant(
		restaurantId: number | string,
		review: TLeaveReviewData
	) {
		const response = await axiosWithAuth.post(
			`/reviews/leave-for-restaurant/${restaurantId}`,
			review
		)
		return response.data
	},

	async getDishRating(dishId: number | string) {
		const response = await axiosClassic.get<number>(
			`/reviews/average-for-dish/${dishId}`
		)
		return response.data
	},

	async getRestaurantRating(restaurantId: number | string) {
		const response = await axiosClassic.get<number>(
			`/reviews/average-for-restaurant/${restaurantId}`
		)
		return response.data
	}
}
