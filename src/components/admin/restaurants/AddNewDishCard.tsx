import styles from './AdminRestaurants.module.scss'
import { Plus } from 'lucide-react'

function AddNewDishCard() {
	return (
		<div className={styles.addNewDishCard}>
			<div>
				<Plus />
			</div>
			<h1>Add new dish</h1>
		</div>
	)
}

export default AddNewDishCard
