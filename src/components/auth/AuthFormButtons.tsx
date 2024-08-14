import styles from './Auth.module.scss'
import Button from '../buttons/Button.tsx'
import GoogleIcon from '../../assets/images/google-icon.png'
import { authService } from '../../services/auth.service.ts'
import { UseFormClearErrors } from 'react-hook-form'
import { TAuthForm } from '../../types/auth.types.ts'

interface IAuthFormButtons {
	type: 'register' | 'login'
	setType: (type: 'register' | 'login') => void
	clearErrors: UseFormClearErrors<TAuthForm>
	setAuthError: (error: string) => void
}

function AuthFormButtons({
	type,
	setType,
	clearErrors,
	setAuthError
}: IAuthFormButtons) {
	const buttonTitle = type === 'login' ? 'Login' : 'Register'

	const handleGoogleLogin = async () => {
		await authService.googleLogin()
	}

	const handleChangeFormType = () => {
		type === 'login' ? setType('register') : setType('login')
		clearErrors()
		setAuthError('')
	}

	return (
		<div className={styles.footer}>
			<Button type='submit'>{buttonTitle}</Button>
			<p>
				{type === 'login' ? (
					<p>
						Don't have an account?{' '}
						<span onClick={handleChangeFormType}>Let's create it!</span>
					</p>
				) : (
					<p>
						Already have an account?{' '}
						<span onClick={handleChangeFormType}>Let's login!</span>
					</p>
				)}
			</p>
			<hr />
			<div className={styles.googleButton} onClick={handleGoogleLogin}>
				<img src={GoogleIcon} alt='google-icon' />
				<h1>Sing in with Google</h1>
			</div>
		</div>
	)
}

export default AuthFormButtons
