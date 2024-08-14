import { useQuery } from '@tanstack/react-query'
import { dishService } from '../../../services/dish.service.ts'
import { Star } from 'lucide-react'

function DishRating({ dishId }: { dishId: number }) {
	const { data: dish, status } = useQuery({
		queryKey: ['dish', dishId],
		queryFn: () => dishService.getDishById(dishId)
	})

	if (status === 'pending') return <div>Loading...</div>
	if (status === 'error') return <div>Error loading rating</div>
	if (!dish) return <div>Dish not found</div>

	return (
		<div className='flex items-center justify-between mt-4'>
			{dish.rating !== 0 && (
				<p className='font-semibold text-2xl flex items-center gap-2'>
					<Star style={{ color: 'gold' }} size={25} />
					{dish.rating}
				</p>
			)}
		</div>
	)
}

export default DishRating
