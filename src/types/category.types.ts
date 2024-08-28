import { TBase } from './base.type.ts'
import { TDish } from './dish.types.ts'

export type TCategory = TBase & {
	name: string
	slug: string
	dishes: TDish[]
}
