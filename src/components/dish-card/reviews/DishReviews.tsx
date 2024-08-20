import { TDish } from '../../../types/dish.types.ts'
import DishReviewCard from './DishReviewCard.tsx'
import LeaveCommentForm from './LeaveCommentForm.tsx'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../Loader.tsx'
import { dishService } from '../../../services/dish.service.ts'
import NotFoundPage from '../../../pages/NotFoundPage.tsx'
import styles from '../DishCard.module.scss'

interface IDishReviews {
	dish: TDish | undefined
}

function DishReviews({ dish }: IDishReviews) {
	const { data: reviews = [], status } = useQuery({
		queryKey: ['dishReviews', dish?.id],
		queryFn: () =>
			dish?.id
				? dishService.getDishById(dish.id).then(data => data.reviews)
				: Promise.reject('Invalid dish ID')
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <NotFoundPage />
	if (!dish) return <NotFoundPage />

	return (
		<section className={styles.dishReviewSection}>
			<h1>Reviews:</h1>
			<div>
				<div className={styles.dishReviews}>
					{reviews.length > 0 ? (
						reviews.map(review => (
							<DishReviewCard
								key={review.id}
								userName={review.user.name}
								dishRating={review.rating}
								reviewText={review.text}
							/>
						))
					) : (
						<p className='text-center mt-6 text-2xl font-semibold'>
							There are no reviews yet
						</p>
					)}
				</div>
				<LeaveCommentForm dishId={dish.id} />
			</div>
		</section>
	)
}

export default DishReviews
