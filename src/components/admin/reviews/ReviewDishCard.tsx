import styles from './AdminReviews.module.scss'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import cn from 'clsx'
import ReviewCard from './ReviewCard.tsx'
import { TDish } from '../../../types/dish.types.ts'

interface IReviewDishCard {
	dish: TDish
}

function ReviewDishCard({ dish }: IReviewDishCard) {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const handleOpenRestaurantCard = () => {
		setIsCollapsed(true)
	}
	const handleCloseRestaurantCard = () => {
		setIsCollapsed(false)
	}

	return (
		<div className='overflow-hidden rounded-xl'>
			<div
				className={cn(
					styles.reviewDishCard,
					isCollapsed && styles.cardCollapsed
				)}
			>
				<h1>{dish.name}</h1>
				<span>{dish.restaurant.name}</span>
				{isCollapsed ? (
					<ChevronUp onClick={handleCloseRestaurantCard} />
				) : (
					<ChevronDown onClick={handleOpenRestaurantCard} />
				)}
			</div>
			{isCollapsed && (
				<div className={styles.dishReviews}>
					{dish.reviews.length > 0 ? (
						dish.reviews.map(review => <ReviewCard review={review} />)
					) : (
						<h1 className='font-semibold m-auto py-5'>
							There is no reviews yet
						</h1>
					)}
				</div>
			)}
		</div>
	)
}

export default ReviewDishCard
