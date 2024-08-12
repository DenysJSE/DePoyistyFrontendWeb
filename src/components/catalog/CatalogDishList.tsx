import CatalogDish from './CatalogDish.tsx'
import { useEffect, useState } from 'react'
import { TDish } from '../../types/dish.types.ts'
import { dishService } from '../../services/dish.service.ts'

function CatalogDishList() {
	const [dishes, setDishes] = useState<TDish[]>()

	useEffect(() => {
		const fetchDishes = async () => {
			const response = await dishService.getAllDishes()
			setDishes(response)
		}
		fetchDishes()
	}, [])

	return (
		<section className='mt-16 pb-10 flex flex-col gap-4'>
			{dishes?.map(dish => <CatalogDish dish={dish} key={dish.id} />)}
		</section>
	)
}

export default CatalogDishList
