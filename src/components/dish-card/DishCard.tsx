import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TDish } from '../../types/dish.types.ts'
import { dishService } from '../../services/dish.service.ts'
import styles from './DishCard.module.scss'
import DishImage from '../../assets/images/dish-image.webp'
import { reviewService } from '../../services/review.service.ts'
import { CircleX, Heart, Star } from 'lucide-react'
import DishReviews from './reviews/DishReviews.tsx'

function DishCard() {
	const { dishId } = useParams()
	const [dish, setDish] = useState<TDish>()
	const [rating, setRating] = useState<number>()

	const navigate = useNavigate()

	useEffect(() => {
		if (dishId) {
			const fetchDishRating = async () => {
				const rating = await reviewService.getDishRating(dishId)
				setRating(rating)
			}
			fetchDishRating()
		}
	}, [dishId])

	useEffect(() => {
		const getDishData = async () => {
			if (dishId) {
				const response = await dishService.getDishById(dishId)
				setDish(response)
			} else {
				return <h1>Something bad happened with our service :(</h1>
			}
		}
		getDishData()
	}, [dishId])

	return (
		<div className={styles.dishCard}>
			<div className='absolute right-8 top-4 flex items-center gap-5'>
				<Heart size={35} className='cursor-pointer' />
				<CircleX
					size={35}
					onClick={() => navigate('/')}
					className='cursor-pointer'
				/>
			</div>
			<div className='flex gap-8'>
				<img src={DishImage} alt='dish-image' />
				<div className='flex flex-col gap-2 w-full'>
					<h1 className='text-4xl font-semibold'>{dish?.name}</h1>
					<p className='italic text-placeholder text-lg'>{dish?.description}</p>
					<p className='mt-4 italic'>
						<span className='text-subcolor font-semibold not-italic'>
							Restaurant:
						</span>{' '}
						{dish?.restaurant.name}
					</p>
					<p className='italic'>
						<span className='text-subcolor font-semibold not-italic'>
							Category:
						</span>{' '}
						{dish?.category.name}
					</p>
					<div className='flex items-center justify-between mt-4'>
						<p className='font-bold text-3xl'>{dish?.price} грн.</p>
						{rating && (
							<p className='font-semibold text-2xl flex items-center gap-2'>
								<Star style={{ color: 'gold' }} size={25} />
								{rating}
							</p>
						)}
					</div>
				</div>
			</div>

			{/* Reviews section	*/}
			<DishReviews dish={dish} />
			{/* Restaurant location	*/}
		</div>
	)
}

export default DishCard
