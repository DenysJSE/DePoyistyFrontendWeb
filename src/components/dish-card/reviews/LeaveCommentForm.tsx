import Button from '../../buttons/Button.tsx'
import CustomRatingElement from './CustomRatingElement.tsx'
import { reviewService } from '../../../services/review.service.ts'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TLeaveReviewData } from '../../../types/review.types.ts'

interface ILeaveCommentForm {
	dishId: number | undefined
}

function LeaveCommentForm({ dishId }: ILeaveCommentForm) {
	const queryClient = useQueryClient()
	const [rating, setRating] = useState(0)
	const [reviewText, setReviewText] = useState('')

	const mutation = useMutation({
		mutationFn: (newReview: TLeaveReviewData) => {
			if (dishId === undefined) {
				throw new Error('Dish ID is undefined')
			}
			return reviewService.leaveReviewForDish(dishId, newReview)
		},
		onSuccess: () => {
			if (dishId !== undefined) {
				console.log(dishId)
				queryClient.invalidateQueries({
					queryKey: ['dish', dishId]
				})
				queryClient.invalidateQueries({ queryKey: ['dishes'] })
				queryClient.invalidateQueries({
					queryKey: ['dishReviews', dishId]
				})
			}
			setReviewText('')
			setRating(0)
		}
	})

	const handleReviewTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
		setReviewText(e.target.value)

	const handleSubmit = () => {
		mutation.mutate({ text: reviewText, rating })
	}

	return (
		<div className='-mt-8 w-full'>
			<h1 className='font-semibold text-2xl'>Leave your comment:</h1>
			<CustomRatingElement rating={rating} setRating={setRating} />
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
					title={mutation.isPending ? 'Proceed...' : 'Publish comment'}
					className='w-full mt-2'
					onClick={handleSubmit}
				/>
			)}
		</div>
	)
}

export default LeaveCommentForm
