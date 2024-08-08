import { useAuthRedirect } from '../../hooks/useAuthRedirect.ts'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TAuthForm } from '../../types/auth.types.ts'
import { authService } from '../../services/auth.service.ts'
import { AxiosError } from 'axios'
import AuthInput from '../inputs/AuthInput.tsx'
import { validEmail } from '../../utils/validEmail.ts'
import Button from '../buttons/Button.tsx'
import styles from './Auth.module.scss'

function Auth() {
	useAuthRedirect()

	const [type, setType] = useState<'login' | 'register'>('login')
	const [authError, setAuthError] = useState<string>('')

	const buttonTitle = type === 'login' ? 'Login' : 'Register'

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<TAuthForm>({ mode: 'onSubmit' })

	const onSubmit: SubmitHandler<TAuthForm> = async data => {
		try {
			if (type === 'login') {
				await authService.main('login', data)
			} else {
				await authService.main('register', data)
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

	return (
		<section className={styles.auth}>
			<form onSubmit={handleSubmit(onSubmit)}>
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
				<div className={styles.footer}>
					<Button type='submit' title={buttonTitle} variant='light' />
					<p>
						{type === 'login' ? (
							<p>
								Don't have an account?{' '}
								<span onClick={() => setType('register')}>
									Let's create it!
								</span>
							</p>
						) : (
							<p>
								Already have an account?{' '}
								<span onClick={() => setType('login')}>Let's login!</span>
							</p>
						)}
					</p>
				</div>
				{authError.length > 0 && <p className={styles.error}>{authError}</p>}
			</form>
		</section>
	)
}

export default Auth
