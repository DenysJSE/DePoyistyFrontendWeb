import { useEffect, useState } from 'react'
import { userService } from '../../services/user.service.ts'
import { Heart } from 'lucide-react'

function FavoriteButton({ dishId }: { dishId: number | undefined }) {
	const [isFavorite, setIsFavorite] = useState<boolean | null>(null)

	useEffect(() => {
		const fetchFavoriteStatus = async () => {
			try {
				const profile = await userService.getProfile()
				const favoriteStatus = profile.favorites.some(
					favorite => favorite.id === dishId
				)
				setIsFavorite(favoriteStatus)
			} catch (error) {
				console.error('Failed to fetch profile:', error)
			}
		}

		fetchFavoriteStatus()
	}, [dishId])

	const toggleFavorite = async () => {
		try {
			if (dishId) {
				await userService.saveDishToFavorite(dishId)
				setIsFavorite(prev => !prev)
			}
		} catch (error) {
			console.error('Failed to toggle favorite:', error)
		}
	}

	return (
		<Heart
			size={35}
			className={`cursor-pointer ${isFavorite ? 'text-subcolor' : 'text-app-text'}`}
			onClick={toggleFavorite}
		/>
	)
}

export default FavoriteButton
