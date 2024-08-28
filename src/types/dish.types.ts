import { TBase } from './base.type.ts'
import { TCategory } from './category.types.ts'
import { TRestaurant } from './restaurant.types.ts'
import { TReview } from './review.types.ts'

export type TDish = TBase & {
	name: string
	slug: string
	description: string
	price: number
	rating: number
	reviews: TReview[]
	category: TCategory
	restaurant: TRestaurant
}

export type TCreateDish = {
	name: string
	description: string
	price: number
	categoryId: number
	restaurantId: number
}
