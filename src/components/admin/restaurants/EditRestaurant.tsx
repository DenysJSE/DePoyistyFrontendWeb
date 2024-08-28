import styles from './AdminRestaurants.module.scss'
import Button from '../../buttons/Button.tsx'
import React, { useState } from 'react'
import { restaurantService } from '../../../services/restaurant.service.ts'
import { useQueryClient } from '@tanstack/react-query'

interface IEditRestaurant {
	name: string
	address: string
	restaurantId: number
	cancelButtonAction: () => void
	setIsShowEdit: (isShow: boolean) => void
}

function EditRestaurant({
	name: initialName,
	address: initialAddress,
	restaurantId,
	cancelButtonAction,
	setIsShowEdit
}: IEditRestaurant) {
	const [name, setName] = useState(initialName)
	const [address, setAddress] = useState(initialAddress)
	const queryClient = useQueryClient()

	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target

		if (id === 'restaurant-name') {
			setName(value)
		} else if (id === 'restaurant-address') {
			setAddress(value)
		}
	}

	const handleEditRestaurant = async () => {
		try {
			await restaurantService.updateRestaurant(restaurantId, { name, address })
			setIsShowEdit(false)
			await queryClient.invalidateQueries({ queryKey: ['restaurants'] })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<section className={styles.dialogFormWrapper}>
			<div className={styles.dialogForm}>
				<h1>Edit restaurant</h1>
				<div className={styles.dialogFormInputs}>
					<div>
						<label htmlFor='restaurant-name'>Restaurant name</label>
						<input
							type='text'
							id='restaurant-name'
							value={name}
							onChange={handleChangeValue}
						/>
					</div>
					<div>
						<label htmlFor='restaurant-address'>Restaurant address</label>
						<input
							type='text'
							id='restaurant-address'
							value={address}
							onChange={handleChangeValue}
						/>
					</div>
				</div>
				<div className={styles.dialogFormButtons}>
					<Button
						type='button'
						size='small'
						className={styles.cancelButton}
						onClick={cancelButtonAction}
					>
						Cancel
					</Button>
					<Button type='button' size='small' onClick={handleEditRestaurant}>
						Save
					</Button>
				</div>
			</div>
		</section>
	)
}

export default EditRestaurant
