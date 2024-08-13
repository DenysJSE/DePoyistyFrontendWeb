import { TDish } from '../../../types/dish.types.ts'
import DishReviewCard from './DishReviewCard.tsx'
import LeaveCommentForm from './LeaveCommentForm.tsx'

interface IDishReviews {
	dish: TDish | undefined
	refetchDish: () => void
}

function DishReviews({ dish, refetchDish }: IDishReviews) {
	return (
		<div>
			<h1 className='font-semibold text-3xl'>Reviews:</h1>
			<div className='flex items-start gap-10'>
				<div className='flex flex-col min-w-[650px]'>
					{dish?.reviews.map(review => (
						<DishReviewCard
							key={review.id}
							userName={review.user.name}
							dishRating={review.rating}
							reviewText={review.text}
						/>
					))}
				</div>
				<LeaveCommentForm dishId={dish?.id} refetchDish={refetchDish} />
			</div>
		</div>
	)
}

export default DishReviews
