import styles from './Catalog.module.scss'
import Searchbar from '../inputs/Searchbar.tsx'
import CatalogDishList from './CatalogDishList.tsx'
import { useContext } from 'react'
import { DishContext } from '../../context/DishProvider.tsx'

function Catalog() {
	const dishContext = useContext(DishContext)
	if (!dishContext) {
		return <div>Error: AuthContext is undefined</div>
	}

	const { hasUpdated, setHasUpdated } = dishContext

	return (
		<aside className={styles.catalog} style={{ height: 'calc(100vh - 80px)' }}>
			<Searchbar />
			<CatalogDishList hasUpdated={hasUpdated} setHasUpdated={setHasUpdated} />
		</aside>
	)
}

export default Catalog
