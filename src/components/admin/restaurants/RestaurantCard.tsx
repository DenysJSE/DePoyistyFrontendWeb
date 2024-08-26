import styles from './AdminRestaurants.module.scss'
import { ChevronDown, ChevronUp, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import cn from 'clsx'
import { TDish } from '../../../types/dish.types.ts'
import RestaurantDishCard from './RestaurantDishCard.tsx'
import AddNewDishCard from './AddNewDishCard.tsx'

interface IRestaurantCard {
	title: string
	dishes: TDish[]
}

function RestaurantCard({ title, dishes }: IRestaurantCard) {
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
					{title} <span>{dishes.length} dishes</span>
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
			{isCollapsed && (
				<div className={styles.restaurantDishes}>
					{dishes.map(dish => (
						<RestaurantDishCard dish={dish} key={dish.id} />
					))}
					<AddNewDishCard />
				</div>
			)}
		</div>
	)
}

export default RestaurantCard
