import { useAuthRedirect } from '../../hooks/useAuthRedirect.tsx'
import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TAuthForm } from '../../types/auth.types.ts'
import { authService } from '../../services/auth.service.ts'
import { AxiosError } from 'axios'
import AuthInput from '../inputs/AuthInput.tsx'
import { validEmail } from '../../utils/validEmail.ts'
import AuthFormButtons from './AuthFormButtons.tsx'
import Loader from '../Loader.tsx'
import styles from './Auth.module.scss'
import { AuthContext } from '../../context/AuthProvider.tsx'

function Auth() {
	const isLoading = useAuthRedirect()

	const [type, setType] = useState<'login' | 'register'>('login')
	const [authError, setAuthError] = useState<string>('')

	const authContext = useContext(AuthContext)
	if (!authContext) {
		return <div>Error: AuthContext is undefined</div>
	}

	const { checkAuth } = authContext

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors
	} = useForm<TAuthForm>({ mode: 'onSubmit' })

	const onSubmit: SubmitHandler<TAuthForm> = async data => {
		try {
			if (type === 'login') {
				await authService.main('login', data)
				checkAuth()
			} else {
				await authService.main('register', data)
				checkAuth()
			}
			reset()
		} catch (error) {
			if (error instanceof AxiosError) {
				setAuthError(
					error.response?.data?.message || 'An unknown error occurred'
				)
			} else {
				setAuthError('An unknown error occurred')
			}
		}
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h1>{type === 'login' ? 'Welcome back!' : "Let's create account"}</h1>
				<div>
					<AuthInput
						formRegister={formRegister}
						errors={errors}
						title='email'
						validationRules={{
							required: 'Email is required',
							pattern: {
								value: validEmail,
								message: 'Please enter a valid email address'
							}
						}}
					/>
					<AuthInput
						formRegister={formRegister}
						errors={errors}
						title='password'
						validationRules={{
							required: 'Password is required',
							minLength: {
								value: 6,
								message: 'Password mush contain at least 6 characters'
							}
						}}
						type='password'
					/>
					{type === 'register' && (
						<AuthInput
							formRegister={formRegister}
							errors={errors}
							title='name'
							validationRules={{
								required: 'Name is required'
							}}
						/>
					)}
				</div>
				{authError.length > 0 && <p className={styles.error}>{authError}</p>}
				<AuthFormButtons
					type={type}
					setType={setType}
					clearErrors={clearErrors}
					setAuthError={setAuthError}
				/>
			</form>
		</section>
	)
}

export default Auth
