import styles from './Catalog.module.scss'
import { Star } from 'lucide-react'
import { TDish } from '../../types/dish.types.ts'
import DishIcon from '../../assets/images/dish-image.webp'
import { NavLink } from 'react-router-dom'

interface ICatalogDish {
	dish: TDish
}

function CatalogDish({ dish }: ICatalogDish) {
	return (
		<NavLink to={`/dish/${dish.id}`}>
			<div className={styles.catalogDish}>
				<img src={DishIcon} alt='dish-image' />
				<div className={styles.dishCardHeader}>
					<h1>{dish.name}</h1>
					<p>
						{dish.category.name} - {dish.restaurant.name}
					</p>
					<div className={styles.dishCardFooter}>
						<h2 className={styles.dishCardPrice}>{dish.price} грн.</h2>
						{dish.rating !== 0 && (
							<h2 className={styles.dishCardRating}>
								<Star className='w-5 max-xs:w-4' style={{ color: 'gold' }} />
								{dish.rating}
							</h2>
						)}
					</div>
				</div>
			</div>
		</NavLink>
	)
}

export default CatalogDish
