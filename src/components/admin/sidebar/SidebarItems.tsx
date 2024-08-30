import {
	ChartNoAxesColumn,
	LayoutList,
	Star,
	UserRound,
	Utensils
} from 'lucide-react'

export const SidebarItems = [
	{
		image: <Utensils />,
		title: 'Restaurants',
		link: '/admin/restaurants',
		created: true
	},
	{
		image: <LayoutList />,
		title: 'Categories',
		link: '/admin/categories',
		created: true
	},
	{
		image: <Star />,
		title: 'Reviews',
		link: '/admin/reviews',
		created: true
	},
	{
		image: <UserRound />,
		title: 'Users',
		link: '/admin/users',
		created: false
	},
	{
		image: <ChartNoAxesColumn />,
		title: 'Stats',
		link: '/admin/stats',
		created: false
	}
]
