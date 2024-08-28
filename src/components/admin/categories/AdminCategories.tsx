import styles from './AdminCategories.module.scss'
import AdminPageHeader from '../AdminPageHeader.tsx'
import { Plus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../Loader.tsx'
import NotFoundPage from '../../../pages/NotFoundPage.tsx'
import { categoryService } from '../../../services/category.service.ts'
import CategoryCard from './CategoryCard.tsx'

function AdminCategories() {
	const { data: categories = [], status } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAllCategories()
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <NotFoundPage />

	return (
		<div className={styles.adminCategories}>
			<AdminPageHeader
				title='Categories'
				isButton={true}
				isButtonIcon={true}
				buttonIcon={<Plus className='w-5 absolute left-3 top-1.5' />}
				buttonText='Add category'
			/>
			<div className={styles.categoriesList}>
				{categories ? (
					categories.map(category => (
						<CategoryCard
							title={category.name}
							categoryId={category.id}
							key={category.id}
						/>
					))
				) : (
					<h1>There is no category</h1>
				)}
			</div>
		</div>
	)
}

export default AdminCategories
