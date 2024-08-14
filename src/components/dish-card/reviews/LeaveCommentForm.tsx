import Button from '../../buttons/Button.tsx'
import CustomRatingElement from './CustomRatingElement.tsx'
import { reviewService } from '../../../services/review.service.ts'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TLeaveReviewData } from '../../../types/review.types.ts'
import Loader from '../../Loader.tsx'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth.ts'

interface ILeaveCommentForm {
	dishId: number | undefined
}

function LeaveCommentForm({ dishId }: ILeaveCommentForm) {
	const { isAuthenticated } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()
	const handleGoToAuth = () => {
		localStorage.setItem('redirectPath', location.pathname)
		navigate('/auth')
	}

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
			{isAuthenticated ? (
				<>
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
							className='w-full mt-2'
							onClick={handleSubmit}
							disabled={mutation.isPending}
						>
							{mutation.isPending ? <Loader /> : 'Publish comment'}
						</Button>
					)}
				</>
			) : (
				<div className='mt-6 flex flex-col items-center gap-3'>
					<h1>Please login to leave some comment</h1>
					<Button type='button' size='small' onClick={handleGoToAuth}>
						Login
					</Button>
				</div>
			)}
		</div>
	)
}

export default LeaveCommentForm
