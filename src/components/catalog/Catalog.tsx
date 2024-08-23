import styles from './Catalog.module.scss'
import Searchbar from '../inputs/Searchbar.tsx'
import CatalogDishList from './CatalogDishList.tsx'
import { useState } from 'react'

function Catalog() {
	const [searchQuery, setSearchQuery] = useState('')

	return (
		<aside className={styles.catalog}>
			<Searchbar setSearchQuery={setSearchQuery} />
			<CatalogDishList searchQuery={searchQuery} />
		</aside>
	)
}

export default Catalog
