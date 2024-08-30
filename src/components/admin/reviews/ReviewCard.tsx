import styles from './AdminReviews.module.scss'
import { TReview } from '../../../types/review.types.ts'
import { Star } from 'lucide-react'

interface IReviewCard {
	review: TReview
}

function ReviewCard({ review }: IReviewCard) {
	return (
		<div className={styles.reviewCard}>
			<div>
				<h1 className={styles.reviewCardTitle}>{review.user.name}</h1>
				<div>
					<Star style={{ color: 'goldenrod' }} />
					<p>{review.rating}</p>
				</div>
			</div>
			<p>{review.text}</p>
		</div>
	)
}

export default ReviewCard
