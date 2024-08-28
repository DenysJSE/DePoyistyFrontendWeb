import styles from './AdminRestaurants.module.scss'
import AdminPageHeader from '../AdminPageHeader.tsx'
import { Plus } from 'lucide-react'
import RestaurantCard from './RestaurantCard.tsx'
import { useQuery } from '@tanstack/react-query'
import { restaurantService } from '../../../services/restaurant.service.ts'
import Loader from '../../Loader.tsx'
import NotFoundPage from '../../../pages/NotFoundPage.tsx'

function AdminRestaurants() {
	const { data: restaurants = [], status } = useQuery({
		queryKey: ['restaurants'],
		queryFn: () => restaurantService.getAllRestaurants()
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <NotFoundPage />

	return (
		<div className={styles.adminRestaurants}>
			<AdminPageHeader
				title='Restaurants'
				isButton={true}
				isButtonIcon={true}
				buttonIcon={<Plus className='w-5 absolute left-3 top-1.5' />}
				buttonText='Add restaurant'
			/>
			<div className={styles.restaurantsList}>
				{restaurants ? (
					restaurants.map(restaurant => (
						<RestaurantCard
							title={restaurant.name}
							dishes={restaurant.menu}
							restaurantId={restaurant.id}
							address={restaurant.address}
							key={restaurant.id}
						/>
					))
				) : (
					<h1>There is no restaurant</h1>
				)}
			</div>
		</div>
	)
}

export default AdminRestaurants
