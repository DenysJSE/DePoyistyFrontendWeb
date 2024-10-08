import { Star } from 'lucide-react'
import { useState } from 'react'

interface ICustomRatingElement {
	rating: number
	setRating: (rating: number) => void
}

function CustomRatingElement({ rating, setRating }: ICustomRatingElement) {
	const [hover, setHover] = useState<number | null>(null)

	return (
		<div className='flex items-center gap-1 mt-6 max-2xl:mt-2'>
			<h1 className='mr-4 max-xl:text-lg max-xl:mr-2'>Your rating:</h1>
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
							<Star className='w-6 max-xl:w-5' />
						</span>
					</label>
				)
			})}
		</div>
	)
}

export default CustomRatingElement
