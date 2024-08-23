import Button from '../buttons/Button.tsx'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../hooks/useProfile.ts'
import styles from './Favorite.module.scss'
import FavoriteCard from './FavoriteCard.tsx'

function Favorite() {
	const navigate = useNavigate()
	const { profile } = useProfile()

	if (!profile) return null

	return (
		<section className={styles.favoriteDishes}>
			<h1>Your favorites dishes:</h1>
			<div>
				{profile.favorites.length > 0 ? (
					profile?.favorites.map(dish => (
						<FavoriteCard dish={dish} key={dish.id} />
					))
				) : (
					<div className='flex flex-col items-center gap-4'>
						<p className='text-center text-2xl font-semibold mt-6'>
							There is no dish saved yet.
						</p>
						<Button type='button' onClick={() => navigate('/')}>
							Go home
						</Button>
					</div>
				)}
			</div>
		</section>
	)
}

export default Favorite
