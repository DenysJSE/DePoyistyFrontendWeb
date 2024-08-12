import styles from './Catalog.module.scss'
import { Star } from 'lucide-react'
import { TDish } from '../../types/dish.types.ts'
import DishIcon from '../../assets/images/dish-image.webp'
import { useEffect, useState } from 'react'
import { reviewService } from '../../services/review.service.ts'
import { NavLink } from 'react-router-dom'

interface ICatalogDish {
	dish: TDish
}

function CatalogDish({ dish }: ICatalogDish) {
	const [rating, setRating] = useState<number | undefined>(undefined)

	useEffect(() => {
		const fetchDishRating = async () => {
			const rating = await reviewService.getDishRating(dish.id)
			setRating(rating)
		}
		fetchDishRating()
	}, [dish.id])

	return (
		<NavLink to={`/dish/${dish.id}`}>
			<div className={styles.catalogDish}>
				<img src={DishIcon} alt='dish-image' className='w-24 rounded-xl' />
				<div className='w-full'>
					<h1 className='text-2xl font-semibold'>{dish.name}</h1>
					<p className='text-sm text-subcolor'>
						{dish.category.name} - {dish.restaurant.name}
					</p>
					<div className='flex items-center justify-between pt-2'>
						<h2 className='font-bold'>{dish.price} грн.</h2>
						{rating !== 0 && (
							<h2 className='flex items-center gap-1 font-bold'>
								<Star size={20} style={{ color: 'gold' }} />
								{rating}
							</h2>
						)}
					</div>
				</div>
			</div>
		</NavLink>
	)
}

export default CatalogDish
