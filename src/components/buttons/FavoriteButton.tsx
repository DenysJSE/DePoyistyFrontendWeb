import { userService } from '../../services/user.service.ts'
import { Heart } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useProfile } from '../../hooks/useProfile.ts'

function FavoriteButton({ dishId }: { dishId: number }) {
	const { profile } = useProfile()

	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['save to favorite'],
		mutationFn: () => userService.saveDishToFavorite(dishId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get profile'] })
		}
	})

	const isExist = profile?.favorites.some(favorite => favorite.id === dishId)

	return (
		<Heart
			className={`cursor-pointer w-9 h-auto max-2xl:w-7 ${isExist ? 'text-subcolor' : 'text-app-text'}`}
			onClick={() => mutate()}
		/>
	)
}

export default FavoriteButton
