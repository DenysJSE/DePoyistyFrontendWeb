import CatalogDish from './CatalogDish.tsx'
import { dishService } from '../../services/dish.service.ts'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader.tsx'
import NotFoundPage from '../../pages/NotFoundPage.tsx'

interface ICatalogDishList {
	searchQuery: string
}

function CatalogDishList({ searchQuery }: ICatalogDishList) {
	const { data: dishes = [], status } = useQuery({
		queryKey: ['dishes'],
		queryFn: () => dishService.getAllDishes()
	})

	if (status === 'pending') return <Loader />
	if (status === 'error') return <NotFoundPage />

	const filteredDishes = dishes.filter(dish =>
		dish.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	return (
		<section className='mt-16 pb-10 flex flex-col gap-4 max-sm:mt-14 max-sm:gap-3'>
			{filteredDishes.length > 0 ? (
				filteredDishes.map(dish => <CatalogDish key={dish.id} dish={dish} />)
			) : (
				<p className='flex justify-center mt-6 text-2xl font-semibold'>
					No dishes found
				</p>
			)}
		</section>
	)
}

export default CatalogDishList
