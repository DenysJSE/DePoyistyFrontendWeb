import { TBase } from './base.type.ts'
import { TDish } from './dish.types.ts'
import { TReview } from './review.types.ts'

export type TRestaurant = TBase & {
	name: string
	slug: string
	rating: number
	address: string
	reviews: TReview[]
	menu: TDish[]
}
