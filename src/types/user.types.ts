import { TBase } from './base.type.ts'
import { TDish } from './dish.types.ts'

export type TUser = TBase & {
	email: string
	name: string
	isAdmin: boolean
}

export type TFullUser = TUser & {
	favorites: TDish[]
}

export type TUserForm = {
	email: string
	password?: string
	name?: string
}
