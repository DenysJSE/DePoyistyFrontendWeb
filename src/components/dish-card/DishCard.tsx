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
			<div className='absolute right-8 top-4 flex items-center gap-5'>
				<FavoriteButton dishId={dish.id} />
				<CircleX
					size={35}
					onClick={handleBackToHome}
					className='cursor-pointer'
				/>
			</div>
			<div className='flex gap-8'>
				<img src={DishImage} alt='dish-image' />
				<div className='flex flex-col gap-2 w-full'>
					<h1 className='text-4xl font-semibold'>{dish.name}</h1>
					<p className='italic text-placeholder text-lg'>{dish.description}</p>
					<p className='mt-4 italic'>
						<span className='text-subcolor font-semibold not-italic'>
							Restaurant:
						</span>{' '}
						{dish.restaurant.name}
					</p>
					<p className='italic'>
						<span className='text-subcolor font-semibold not-italic'>
							Category:
						</span>{' '}
						{dish.category.name}
					</p>
					<div className='flex items-center justify-between mt-4'>
						<p className='font-bold text-3xl'>{dish.price} грн.</p>
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
