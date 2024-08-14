import CatalogDish from './CatalogDish.tsx'
import { dishService } from '../../services/dish.service.ts'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader.tsx'

// interface ICatalogDishList {
// 	searchQuery: string
// }

function CatalogDishList() {
	const { data: dishes = [], status } = useQuery({
		queryKey: ['dishes'],
		queryFn: () => dishService.getAllDishes()
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <div>Error loading dishes</div>

	return (
		<section className='mt-16 pb-10 flex flex-col gap-4'>
			{dishes.map(dish => (
				<CatalogDish key={dish.id} dish={dish} />
			))}
		</section>
	)
}

export default CatalogDishList
