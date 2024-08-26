import styles from './AdminRestaurants.module.scss'
import { ChevronDown, ChevronUp, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import cn from 'clsx'

interface IRestaurantCard {
	title: string
	menuItems: number
}

function RestaurantCard({ title, menuItems }: IRestaurantCard) {
	const [isCollapsed, setIsCollapsed] = useState(false)

	const handleOpen = () => {
		setIsCollapsed(true)
	}

	const handleClose = () => {
		setIsCollapsed(false)
	}

	return (
		<div>
			<div
				className={cn(
					styles.adminRestaurantsCard,
					isCollapsed && styles.cardCollapsed
				)}
			>
				<h1>
					{title} <span>{menuItems} dishes</span>
				</h1>
				<div>
					<Pencil />
					<Trash style={{ color: '#f87171' }} />
					{isCollapsed ? (
						<ChevronUp onClick={handleClose} />
					) : (
						<ChevronDown onClick={handleOpen} />
					)}
				</div>
			</div>
			{isCollapsed && <div className={styles.restaurantDishes}>Dishes</div>}
		</div>
	)
}

export default RestaurantCard
