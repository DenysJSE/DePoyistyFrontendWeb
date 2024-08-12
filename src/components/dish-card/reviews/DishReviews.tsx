import { TDish } from '../../../types/dish.types.ts'
import DishReviewCard from './DishReviewCard.tsx'

function DishReviews({ dish }: { dish: TDish | undefined }) {
	return (
		<div>
			<h1 className='font-semibold text-3xl'>Reviews:</h1>
			{dish?.reviews.map(review => (
				<DishReviewCard
					key={review.id}
					userName={review.user.name}
					dishRating={review.rating}
					reviewText={review.text}
				/>
			))}
		</div>
	)
}

export default DishReviews
