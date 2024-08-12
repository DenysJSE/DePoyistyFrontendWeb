import styles from './Catalog.module.scss'
import Searchbar from '../inputs/Searchbar.tsx'
import CatalogDishList from './CatalogDishList.tsx'

function Catalog() {
	return (
		<aside className={styles.catalog} style={{ height: 'calc(100vh - 80px)' }}>
			<Searchbar />
			<CatalogDishList />
		</aside>
	)
}

export default Catalog
