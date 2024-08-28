import styles from './AdminRestaurants.module.scss'
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { restaurantService } from '../../../services/restaurant.service.ts'
import Button from '../../buttons/Button.tsx'

function AddNewRestaurantCard({
	setIsShowAddForm
}: {
	setIsShowAddForm: (state: boolean) => void
}) {
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const queryClient = useQueryClient()

	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target

		if (id === 'restaurant-name') {
			setName(value)
		} else if (id === 'restaurant-address') {
			setAddress(value)
		}
	}

	const handleCloseForm = () => {
		setIsShowAddForm(false)
	}

	const handleCreateRestaurant = async () => {
		try {
			await restaurantService.createRestaurant({ name, address })
			handleCloseForm()
			await queryClient.invalidateQueries({ queryKey: ['restaurants'] })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<section className={styles.editRestaurantWrapper}>
			<div className={styles.editRestaurant}>
				<h1>Add new restaurant</h1>
				<div className={styles.editRestaurantInputs}>
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
				<div className={styles.editRestaurantButtons}>
					<Button
						type='button'
						size='small'
						className={styles.cancelButton}
						onClick={handleCloseForm}
					>
						Cancel
					</Button>
					<Button type='button' size='small' onClick={handleCreateRestaurant}>
						Create
					</Button>
				</div>
			</div>
		</section>
	)
}

export default AddNewRestaurantCard
