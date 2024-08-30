import styles from './AdminReviews.module.scss'
import AdminPageHeader from '../AdminPageHeader.tsx'
import ReviewDishCard from './ReviewDishCard.tsx'
import { useQuery } from '@tanstack/react-query'
import { dishService } from '../../../services/dish.service.ts'
import Loader from '../../Loader.tsx'
import NotFoundPage from '../../../pages/NotFoundPage.tsx'

function AdminReviews() {
	const { data: dishes, status } = useQuery({
		queryKey: ['dishes'],
		queryFn: () => dishService.getAllDishes()
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <NotFoundPage />

	return (
		<div className={styles.adminReviews}>
			<AdminPageHeader title='Reviews' isButton={false} />
			<div className={styles.reviewList}>
				{dishes.map(dish => (
					<ReviewDishCard dish={dish} />
				))}
			</div>
		</div>
	)
}

export default AdminReviews
