import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Button from '../../buttons/Button.tsx'
import { categoryService } from '../../../services/category.service.ts'

function AddNewCategory({
	setIsShowAddForm
}: {
	setIsShowAddForm: (state: boolean) => void
}) {
	const [name, setName] = useState('')
	const queryClient = useQueryClient()

	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}

	const handleCloseForm = () => {
		setIsShowAddForm(false)
	}

	const handleCreateRestaurant = async () => {
		try {
			await categoryService.createCategory({ name })
			handleCloseForm()
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<section className='dialogFormWrapper'>
			<div className='dialogForm'>
				<h1>Add new category</h1>
				<div className='dialogFormInputs'>
					<div>
						<label htmlFor='restaurant-name'>Category name</label>
						<input
							type='text'
							id='restaurant-name'
							value={name}
							onChange={handleChangeValue}
						/>
					</div>
				</div>
				<div className='dialogFormButtons'>
					<Button
						type='button'
						size='small'
						className='cancelButton'
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

export default AddNewCategory
