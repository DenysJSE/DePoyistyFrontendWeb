import { TUser } from './user.types.ts'

export type TAuthForm = {
	email: string
	password: string
}

export type TAuthResponse = {
	accessToken: string
	user: TUser
}
