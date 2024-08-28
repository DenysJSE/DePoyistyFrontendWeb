import styles from './AdminRestaurants.module.scss'
import { ChevronDown, ChevronUp, Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import cn from 'clsx'
import { TDish } from '../../../types/dish.types.ts'
import RestaurantDishCard from './RestaurantDishCard.tsx'
import AddNewDishCard from './AddNewDishCard.tsx'
import Dialog from '../../Dialog.tsx'
import { restaurantService } from '../../../services/restaurant.service.ts'
import { useQueryClient } from '@tanstack/react-query'

interface IRestaurantCard {
	title: string
	dishes: TDish[]
	restaurantId: number
}

function RestaurantCard({ title, dishes, restaurantId }: IRestaurantCard) {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isShowDialog, setIsShowDialog] = useState(false)
	const queryClient = useQueryClient()

	const handleOpenRestaurantCard = () => {
		setIsCollapsed(true)
	}

	const handleCloseRestaurantCard = () => {
		setIsCollapsed(false)
	}

	const handleShowDialog = () => {
		setIsShowDialog(true)
	}

	const handleDeleteRestaurant = async () => {
		try {
			await restaurantService.deleteRestaurant(restaurantId)
			setIsShowDialog(false)
			await queryClient.invalidateQueries({ queryKey: ['restaurants'] })
		} catch (e) {
			console.log(e)
		}
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
					<Trash style={{ color: '#f87171' }} onClick={handleShowDialog} />
					{isCollapsed ? (
						<ChevronUp onClick={handleCloseRestaurantCard} />
					) : (
						<ChevronDown onClick={handleOpenRestaurantCard} />
					)}
				</div>
			</div>
			{isShowDialog && (
				<Dialog
					title='Are you absolutely sure?'
					description='This action cannot be undone. This will permanently delete this restaurant and its dishes, and you will not be able to recover the data.'
					cancelButtonAction={() => setIsShowDialog(false)}
					deleteButtonAction={handleDeleteRestaurant}
				/>
			)}
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
