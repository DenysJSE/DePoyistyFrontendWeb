import styles from './AdminRestaurants.module.scss'
import { TDish } from '../../../types/dish.types.ts'
import DishImage from '../../../assets/images/dish-image.webp'
import { Star } from 'lucide-react'

interface IRestaurantDishCard {
	dish: TDish
}

function RestaurantDishCard({ dish }: IRestaurantDishCard) {
	return (
		<div className={styles.restaurantDishCard}>
			<div className={styles.imageWrapper}>
				<img src={DishImage} alt='dish-image' />
			</div>
			<div className={styles.dishCardContent}>
				<h1>{dish.name}</h1>
				<span>{dish.category.name}</span>
				<div>
					<p>
						{dish.price}
						<span>₴</span>
					</p>
					<p className={styles.rating}>
						<Star size={18} style={{ color: 'goldenrod' }} />
						{dish.rating}
					</p>
				</div>
			</div>
		</div>
	)
}

export default RestaurantDishCard
