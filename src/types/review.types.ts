import { TBase } from './base.type.ts'
import { TUser } from './user.types.ts'

export type TReview = TBase & {
	text: string
	rating: number
	user: TUser
}

export type TLeaveReviewData = {
	text: string
	rating: number
}
