import { Star } from 'lucide-react'
import styles from '../DishCard.module.scss'

interface IDishReviewCard {
	userName: string
	dishRating: number
	reviewText: string
}

function DishReviewCard({ userName, dishRating, reviewText }: IDishReviewCard) {
	return (
		<div className={styles.dishReviewCard}>
			<div>
				<h1>{userName}</h1>
				<div>
					<Star style={{ color: 'gold' }} />
					<p>{dishRating}</p>
				</div>
			</div>
			<p>{reviewText}</p>
		</div>
	)
}

export default DishReviewCard
