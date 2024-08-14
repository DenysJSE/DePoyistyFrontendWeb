import styles from './Header.module.scss'
import { Heart } from 'lucide-react'
import { useOutside } from '../hooks/useOutside.ts'
import HeaderDropdown from '../components/HeaderDropdown.tsx'
import Button from '../components/buttons/Button.tsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.ts'

function Header() {
	const { isShow, setIsShow, ref } = useOutside(false)

	const navigate = useNavigate()
	const { user, logout, isAuthenticated } = useAuth()

	const handleLogout = async () => {
		logout()
		setIsShow(false)
	}

	return (
		<header className={styles.header} ref={ref}>
			<h1 onClick={() => navigate('/')} className='cursor-pointer'>
				DePoyisty
			</h1>
			{isAuthenticated ? (
				<>
					{user && (
						<div className={styles.userNav}>
							<Heart
								size={25}
								style={{ cursor: 'pointer' }}
								onClick={() => navigate('/favorite')}
							/>
							<div onClick={() => setIsShow(!isShow)}>{user?.name}</div>
						</div>
					)}
					{isShow && (
						<div className={styles.modal}>
							<HeaderDropdown handleLogout={handleLogout} />
						</div>
					)}
				</>
			) : (
				<Button type='button' onClick={() => navigate('/auth')}>
					Login
				</Button>
			)}
		</header>
	)
}

export default Header
