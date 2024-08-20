import { useNavigate, useParams } from 'react-router-dom'
import { TDish } from '../../types/dish.types.ts'
import { dishService } from '../../services/dish.service.ts'
import styles from './DishCard.module.scss'
import DishImage from '../../assets/images/dish-image.webp'
import { CircleX } from 'lucide-react'
import DishReviews from './reviews/DishReviews.tsx'
import FavoriteButton from '../buttons/FavoriteButton.tsx'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader.tsx'
import NotFoundPage from '../../pages/NotFoundPage.tsx'
import DishRating from './reviews/DishRating.tsx'
import cn from 'clsx'

function DishCard() {
	const { dishId } = useParams<{ dishId: string }>()
	const id = dishId ? parseInt(dishId, 10) : undefined

	const navigate = useNavigate()
	const handleBackToHome = () => {
		navigate('/')
	}
	const { data: dish, status } = useQuery<TDish>({
		queryKey: ['dish', dishId],
		queryFn: () =>
			id
				? dishService.getDishById(id)
				: Promise.reject('Happened something bad!'),
		enabled: !!id
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <NotFoundPage />
	if (!dish) return <NotFoundPage />

	return (
		<div className={styles.dishCard}>
			<div className={styles.buttons}>
				<FavoriteButton dishId={dish.id} />
				<CircleX
					onClick={handleBackToHome}
					className='cursor-pointer w-9 h-auto max-2xl:w-7'
				/>
			</div>
			<div className={styles.product}>
				<img src={DishImage} alt='dish-image' />
				<div className={styles.productInfo}>
					<h1 className={styles.productTitle}>{dish.name}</h1>
					<p className={styles.productDescription}>{dish.description}</p>
					<p
						className={cn(
							styles.productRestaurantCategory,
							'mt-4 max-2xl:mt-2'
						)}
					>
						<span>Restaurant:</span> {dish.restaurant.name}
					</p>
					<p className={styles.productRestaurantCategory}>
						<span>Category:</span> {dish.category.name}
					</p>
					<div className={styles.productInfoFooter}>
						<p>{dish.price} грн.</p>
						<DishRating dishId={dish.id} />
					</div>
				</div>
			</div>
			<DishReviews dish={dish} />
			{/* Restaurant location	*/}
		</div>
	)
}

export default DishCard
