import CatalogDish from './CatalogDish.tsx'
import { useEffect, useState } from 'react'
import { TDish } from '../../types/dish.types.ts'
import { dishService } from '../../services/dish.service.ts'

interface ICatalogDishList {
	hasUpdated: boolean
	setHasUpdated: (hasUpdated: boolean) => void
}

function CatalogDishList({ hasUpdated, setHasUpdated }: ICatalogDishList) {
	const [dishes, setDishes] = useState<TDish[]>()

	const fetchDishes = async () => {
		const response = await dishService.getAllDishes()
		setDishes(response)
	}

	useEffect(() => {
		fetchDishes()
	}, [])

	useEffect(() => {
		if (hasUpdated) {
			fetchDishes()
		}
	}, [hasUpdated, setHasUpdated])

	return (
		<section className='mt-16 pb-10 flex flex-col gap-4'>
			{dishes?.map(dish => (
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
