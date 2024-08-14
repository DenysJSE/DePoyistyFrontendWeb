import DishImage from '../assets/images/dish-image.webp'
import { useProfile } from '../hooks/useProfile.ts'
import FavoriteButton from '../components/buttons/FavoriteButton.tsx'
import Button from '../components/buttons/Button.tsx'
import { useNavigate } from 'react-router-dom'

function FavoriteDishes() {
	const navigate = useNavigate()
	const { profile } = useProfile()

	if (!profile) return null

	return (
		<div className='p-10 px-20 flex flex-col items-center'>
			<h1 className='text-4xl font-semibold'>Your favorites dishes:</h1>
			<div className='flex flex-col w-full gap-4 mt-6 place-content-center'>
				{profile.favorites.length > 0 ? (
					profile?.favorites.map(dish => (
						<div
							key={dish.id}
							className='flex border border-border p-4 pr-20 rounded-2xl gap-6 relative'
						>
							<div className='absolute right-6 top-4'>
								<FavoriteButton dishId={dish.id} />
							</div>
							<img
								src={DishImage}
								alt='dish-image'
								className='w-32 rounded-lg'
							/>
							<div>
								<h1 className='text-3xl font-semibold'>{dish.name}</h1>
								<p className='italic text-placeholder text-lg description'>
									{dish.description}
								</p>
								<p className='font-semibold text-2xl mt-2'>{dish.price} грн.</p>
							</div>
						</div>
					))
				) : (
					<div className='flex flex-col items-center gap-4'>
						<p className='text-center text-2xl font-semibold mt-6'>
							There is no dish saved yet.
						</p>
						<Button type='button' onClick={() => navigate('/')}>
							Go home
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default FavoriteDishes
