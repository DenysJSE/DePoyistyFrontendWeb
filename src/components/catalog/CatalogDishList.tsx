import CatalogDish from './CatalogDish.tsx'
import { useEffect, useState } from 'react'
import { TDish } from '../../types/dish.types.ts'
import { dishService } from '../../services/dish.service.ts'

interface ICatalogDishList {
	hasUpdated: boolean
	setHasUpdated: (hasUpdated: boolean) => void
	searchQuery: string
}

function CatalogDishList({
	hasUpdated,
	setHasUpdated,
	searchQuery
}: ICatalogDishList) {
	const [dishes, setDishes] = useState<TDish[]>()
	const [filteredDishes, setFilteredDishes] = useState<TDish[]>([])

	const fetchDishes = async () => {
		const response = await dishService.getAllDishes()
		setDishes(response)
		setFilteredDishes(response)
	}

	useEffect(() => {
		fetchDishes()
	}, [])

	useEffect(() => {
		if (hasUpdated) {
			fetchDishes()
		}
	}, [hasUpdated, setHasUpdated])

	useEffect(() => {
		if (dishes) {
			const filtered = dishes.filter(dish =>
				dish.name.toLowerCase().includes(searchQuery.toLowerCase())
			)
			setFilteredDishes(filtered)
		}
	}, [searchQuery, dishes])

	return (
		<section className='mt-16 pb-10 flex flex-col gap-4'>
			{filteredDishes.map(dish => (
				<CatalogDish
					key={dish.id}
					dish={dish}
					hasUpdated={hasUpdated}
					setHasUpdated={setHasUpdated}
				/>
			))}
		</section>
	)
}

export default CatalogDishList
