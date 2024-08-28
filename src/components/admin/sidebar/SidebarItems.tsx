import { LayoutList, Soup, Star, UserRound, Utensils } from 'lucide-react'

export const SidebarItems = [
	{
		image: <Utensils />,
		title: 'Restaurants',
		link: '/admin/restaurants'
	},
	{
		image: <Soup />,
		title: 'Dishes',
		link: '/admin/dishes'
	},
	{
		image: <Star />,
		title: 'Reviews',
		link: '/admin/reviews'
	},
	{
		image: <LayoutList />,
		title: 'Categories',
		link: '/admin/categories'
	},
	{
		image: <UserRound />,
		title: 'Users',
		link: '/admin/users'
	}
]
