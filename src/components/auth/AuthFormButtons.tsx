import styles from './Auth.module.scss'
import Button from '../buttons/Button.tsx'
import GoogleIcon from '../../assets/images/google-icon.png'
import { authService } from '../../services/auth.service.ts'

interface IAuthFormButtons {
	type: 'register' | 'login'
	setType: (type: 'register' | 'login') => void
}

function AuthFormButtons({ type, setType }: IAuthFormButtons) {
	const buttonTitle = type === 'login' ? 'Login' : 'Register'

	const handleGoogleLogin = async () => {
		await authService.googleLogin()
	}

	return (
		<div className={styles.footer}>
			<Button type='submit' title={buttonTitle} variant='light' />
			<p>
				{type === 'login' ? (
					<p>
						Don't have an account?{' '}
						<span onClick={() => setType('register')}>Let's create it!</span>
					</p>
				) : (
					<p>
						Already have an account?{' '}
						<span onClick={() => setType('login')}>Let's login!</span>
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
