import { useAuth } from './useAuth.ts'
import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/user.service.ts'

export const useProfile = () => {
	const { user } = useAuth()

	const { data, isLoading, error } = useQuery({
		queryKey: ['get profile'],
		queryFn: () => userService.getProfile(),
		enabled: !!user,
		select: data => data
	})

	return { profile: data, isLoading, error }
}
