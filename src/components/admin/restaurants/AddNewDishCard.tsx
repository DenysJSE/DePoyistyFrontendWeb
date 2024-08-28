import styles from './AdminRestaurants.module.scss'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import AddNewDishDialog from './AddNewDishDialog.tsx'

interface IAddNewDishCard {
	restaurantId: number
	restaurantName: string
}

function AddNewDishCard({ restaurantId, restaurantName }: IAddNewDishCard) {
	const [isShowDialog, setIsShowDialog] = useState(false)

	const handleCloseDialog = () => {
		setIsShowDialog(false)
	}

	return (
		<div>
			<div
				className={styles.addNewDishCard}
				onClick={() => setIsShowDialog(true)}
			>
				<div>
					<Plus />
				</div>
				<h1>Add new dish</h1>
			</div>
			{isShowDialog && (
				<AddNewDishDialog
					cancelButtonAction={handleCloseDialog}
					restaurantId={restaurantId}
					restaurantName={restaurantName}
				/>
			)}
		</div>
	)
}

export default AddNewDishCard
