import { Star } from 'lucide-react'

interface ICustomRatingElement {
	rating: number
	setRating: (rating: number) => void
	hover: number | null
	setHover: (hover: number | null) => void
}

function CustomRatingElement({
	rating,
	setRating,
	hover,
	setHover
}: ICustomRatingElement) {
	return (
		<div className='flex items-center gap-1 mt-6'>
			<h1 className='mr-4'>Your rating:</h1>
			{[...Array(5)].map((_, index) => {
				const currentRating = index + 1

				return (
					<label key={index}>
						<input
							type='radio'
							name='rating'
							value={currentRating}
							checked={rating === currentRating}
							onChange={() => setRating(currentRating)}
						/>
						<span
							className='cursor-pointer '
							style={{
								color:
									currentRating <= (hover || rating)
										? 'gold'
										: 'var(--app-text)'
							}}
							onMouseEnter={() => setHover(currentRating)}
							onMouseLeave={() => setHover(null)}
						>
							<Star />
						</span>
					</label>
				)
			})}
		</div>
	)
}

export default CustomRatingElement
