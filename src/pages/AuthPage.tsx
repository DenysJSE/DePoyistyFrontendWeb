import { useAuthRedirect } from '../hooks/useAuthRedirect.ts'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TAuthForm } from '../types/auth.types.ts'
import { authService } from '../services/auth.service.ts'
import { validEmail } from '../utils/validEmail.ts'
import AuthInput from '../components/inputs/AuthInput.tsx'
import { AxiosError } from 'axios'

function AuthPage() {
	useAuthRedirect()

	const [type, setType] = useState<'login' | 'register'>('login')
	const [authError, setAuthError] = useState<string>('')

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
		<section className='w-screen h-screen flex'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='rounded-xl shadow-lg shadow-black p-8 py-12 m-auto min-w-[450px] bg-stone-800 text-white flex flex-col gap-7 border border-stone-600'
			>
				<h1 className='text-center text-3xl font-semibold'>
					{type === 'login' ? 'Welcome back!' : "Let's create your account"}
				</h1>
				<div className='flex flex-col gap-4'>
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
				<div className='flex flex-col gap-3'>
					<button
						type='submit'
						className='bg-white text-black font-bold py-2 rounded-3xl text-lg'
					>
						{type === 'login' ? 'Login' : 'Register'}
					</button>
					<p className='text-lg text-center'>
						{type === 'login' ? (
							<span>
								Don't have an account?{' '}
								<span
									className='text-lime-400 font-bold cursor-pointer hover:text-lime-200'
									onClick={() => setType('register')}
								>
									Let's create it!
								</span>
							</span>
						) : (
							<span>
								Already have an account?{' '}
								<span
									className='text-lime-400 font-bold cursor-pointer hover:text-lime-200'
									onClick={() => setType('login')}
								>
									Let's login!
								</span>
							</span>
						)}
					</p>
				</div>
				{authError.length > 0 && (
					<p className='text-red-500 font-semibold text-lg text-wrap max-w-[350px] text-center m-auto'>
						{authError}
					</p>
				)}
			</form>
		</section>
	)
}

export default AuthPage
