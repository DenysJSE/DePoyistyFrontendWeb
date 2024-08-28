import { LayoutList, Star, UserRound, Utensils } from 'lucide-react'

export const SidebarItems = [
	{
		image: <Utensils />,
		title: 'Restaurants',
		link: '/admin/restaurants'
	},
	{
		image: <LayoutList />,
		title: 'Categories',
		link: '/admin/categories'
	},
	{
		image: <Star />,
		title: 'Reviews',
		link: '/admin/reviews'
	},
	{
		image: <UserRound />,
		title: 'Users',
		link: '/admin/users'
	}
]
