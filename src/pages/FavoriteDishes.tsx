import { useEffect, useState } from 'react'
import { TDish } from '../types/dish.types.ts'
import { userService } from '../services/user.service.ts'
import DishImage from '../assets/images/dish-image.webp'

function FavoriteDishes() {
	const [dishes, setDishes] = useState<TDish[]>()

	useEffect(() => {
		const fetchFavoritesDishes = async () => {
			const response = await userService.getProfile()
			setDishes(response.favorites)
		}
		fetchFavoritesDishes()
	}, [])

	return (
		<div className='p-10 px-20 flex flex-col items-center'>
			<h1 className='text-4xl font-semibold'>Your favorites dishes:</h1>
			<div className='flex flex-wrap gap-8 mt-6 place-content-center'>
				{dishes?.map(dish => (
					<div
						key={dish.id}
						className='flex border border-border p-4 w-[700px] rounded-2xl gap-6 relative'
					>
						<img src={DishImage} alt='dish-image' className='w-32 rounded-lg' />
						<div>
							<h1 className='text-3xl font-semibold'>{dish.name}</h1>
							<p className='italic text-placeholder text-lg description'>
								{dish.description}
							</p>
							<p className='font-semibold text-2xl mt-2'>{dish.price} грн.</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default FavoriteDishes
