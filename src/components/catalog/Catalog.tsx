import styles from './Catalog.module.scss'
import Searchbar from '../inputs/Searchbar.tsx'
import CatalogDishList from './CatalogDishList.tsx'
import { useState } from 'react'

function Catalog() {
	const [searchQuery, setSearchQuery] = useState('')
	console.log(searchQuery)

	return (
		<aside className={styles.catalog} style={{ height: 'calc(100vh - 80px)' }}>
			<Searchbar setSearchQuery={setSearchQuery} />
			<CatalogDishList />
		</aside>
	)
}

export default Catalog
