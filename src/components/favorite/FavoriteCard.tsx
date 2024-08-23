import styles from './Favorite.module.scss'
import FavoriteButton from '../buttons/FavoriteButton.tsx'
import DishImage from '../../assets/images/dish-image.webp'
import { TDish } from '../../types/dish.types.ts'

function FavoriteCard({ dish }: { dish: TDish }) {
	return (
		<div key={dish.id} className={styles.favoriteCard}>
			<div className={styles.buttons}>
				<FavoriteButton dishId={dish.id} />
			</div>
			<img src={DishImage} alt='dish-image' />
			<div className={styles.dishInfo}>
				<h1>{dish.name}</h1>
				<p className='description'>{dish.description}</p>
				<span>{dish.price} грн.</span>
			</div>
		</div>
	)
}

export default FavoriteCard
