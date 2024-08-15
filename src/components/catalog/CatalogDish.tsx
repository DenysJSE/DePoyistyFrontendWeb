import styles from './Catalog.module.scss'
import { Star } from 'lucide-react'
import { TDish } from '../../types/dish.types.ts'
import DishIcon from '../../assets/images/dish-image.webp'
import { NavLink } from 'react-router-dom'

interface ICatalogDish {
	dish: TDish
}

function CatalogDish({ dish }: ICatalogDish) {
	return (
		<NavLink to={`/dish/${dish.id}`}>
			<div className={styles.catalogDish}>
				<img
					src={DishIcon}
					alt='dish-image'
					className='w-24 rounded-xl max-xs:w-20'
				/>
				<div className='w-full'>
					<h1 className='text-2xl font-semibold max-xs:text-lg'>{dish.name}</h1>
					<p className='text-sm text-subcolor max-xs:text-xs'>
						{dish.category.name} - {dish.restaurant.name}
					</p>
					<div className='flex items-center justify-between pt-2 max-xs:pt-1'>
						<h2 className='font-bold max-xs:text-lg'>{dish.price} грн.</h2>
						{dish.rating !== 0 && (
							<h2 className='flex items-center gap-1 font-bold max-xs:text-lg'>
								<Star className='w-5 max-xs:w-4' style={{ color: 'gold' }} />
								{dish.rating}
							</h2>
						)}
					</div>
				</div>
			</div>
		</NavLink>
	)
}

export default CatalogDish
