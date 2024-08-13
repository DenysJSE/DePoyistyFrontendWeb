import styles from './Catalog.module.scss'
import Searchbar from '../inputs/Searchbar.tsx'
import CatalogDishList from './CatalogDishList.tsx'
import { useContext, useState } from 'react'
import { DishContext } from '../../context/DishProvider.tsx'

function Catalog() {
	const [searchQuery, setSearchQuery] = useState('')

	const dishContext = useContext(DishContext)
	if (!dishContext) {
		return <div>Error: AuthContext is undefined</div>
	}

	const { hasUpdated, setHasUpdated } = dishContext

	return (
		<aside className={styles.catalog} style={{ height: 'calc(100vh - 80px)' }}>
			<Searchbar setSearchQuery={setSearchQuery} />
			<CatalogDishList
				hasUpdated={hasUpdated}
				setHasUpdated={setHasUpdated}
				searchQuery={searchQuery}
			/>
		</aside>
	)
}

export default Catalog
