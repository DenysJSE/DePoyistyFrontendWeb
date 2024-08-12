import { Star } from 'lucide-react'

interface IDishReviewCard {
	userName: string
	dishRating: number
	reviewText: string
}

function DishReviewCard({ userName, dishRating, reviewText }: IDishReviewCard) {
	return (
		<div className='max-w-[650px] border border-border rounded-xl p-4 mt-6'>
			<div className='flex items-center justify-between'>
				<h1 className='font-bold text-2xl'>{userName}</h1>
				<div className='flex items-center gap-2'>
					<Star style={{ color: 'gold' }} size={20} />
					<p className='font-semibold'>{dishRating}</p>
				</div>
			</div>
			<p className='mt-2'>{reviewText}</p>
		</div>
	)
}

export default DishReviewCard
