import Button from '../../buttons/Button.tsx'
import CustomRatingElement from './CustomRatingElement.tsx'
import { reviewService } from '../../../services/review.service.ts'
import React, { useContext, useState } from 'react'
import { DishContext } from '../../../context/DishProvider.tsx'

interface ILeaveCommentForm {
	dishId: number | undefined
	refetchDish: () => void
}

function LeaveCommentForm({ dishId, refetchDish }: ILeaveCommentForm) {
	const [reviewText, setReviewText] = useState('')
	const [rating, setRating] = useState<number>(0)
	const [hover, setHover] = useState<number | null>(null)

	const dishContext = useContext(DishContext)
	if (!dishContext) {
		return <div>Error: AuthContext is undefined</div>
	}

	const { notifyUpdate } = dishContext

	const handleReviewTextChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		e.preventDefault()
		setReviewText(e.target.value)
	}

	const leaveComment = async () => {
		if (dishId) {
			await reviewService.leaveReviewForDish(dishId, {
				text: reviewText,
				rating
			})
			setReviewText('')
			setRating(0)
			setHover(null)
			refetchDish()
			notifyUpdate(Number(dishId))
		}
	}

	return (
		<div className='-mt-8 w-full'>
			<h1 className='font-semibold text-2xl'>Leave your comment:</h1>
			<CustomRatingElement
				rating={rating}
				setRating={setRating}
				hover={hover}
				setHover={setHover}
			/>
			<textarea
				name='Comment'
				value={reviewText}
				onChange={handleReviewTextChange}
				placeholder='Write your comment...'
				id='comment'
				className='w-full min-h-32 mt-6 rounded-xl outline-none text-black p-2 px-4 text-lg resize-none'
			/>
			{reviewText.length !== 0 && rating !== 0 && (
				<Button
					type='button'
					title='Publish comment'
					className='w-full mt-2'
					onClick={leaveComment}
				/>
			)}
		</div>
	)
}

export default LeaveCommentForm
