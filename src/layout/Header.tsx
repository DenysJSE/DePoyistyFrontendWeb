import styles from './Header.module.scss'
import { Heart } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider.tsx'
import { useOutside } from '../hooks/useOutside.ts'
import HeaderDropdown from '../components/HeaderDropdown.tsx'
import Button from '../components/buttons/Button.tsx'
import { useNavigate } from 'react-router-dom'

function Header() {
	const { isShow, setIsShow, ref } = useOutside(false)

	const navigate = useNavigate()

	const authContext = useContext(AuthContext)
	if (!authContext) {
		return <div>Error: AuthContext is undefined</div>
	}

	const { user, logout, isAuthenticated } = authContext

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
				<Button type='button' title='Login' onClick={() => navigate('/auth')} />
			)}
		</header>
	)
}

export default Header
