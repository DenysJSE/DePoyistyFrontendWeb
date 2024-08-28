import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import Button from '../../buttons/Button.tsx'
import { categoryService } from '../../../services/category.service.ts'

interface IEditCategory {
	name: string
	categoryId: number
	cancelButtonAction: () => void
	setIsShowEdit: (state: boolean) => void
}

function EditCategory({
	name: initialName,
	categoryId,
	setIsShowEdit,
	cancelButtonAction
}: IEditCategory) {
	const [name, setName] = useState(initialName)
	const queryClient = useQueryClient()

	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}

	const handleEditCategory = async () => {
		try {
			await categoryService.updateCategory(categoryId, { name })
			setIsShowEdit(false)
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<section className='dialogFormWrapper'>
			<div className='dialogForm'>
				<h1>Edit category</h1>
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
						onClick={cancelButtonAction}
					>
						Cancel
					</Button>
					<Button type='button' size='small' onClick={handleEditCategory}>
						Save
					</Button>
				</div>
			</div>
		</section>
	)
}

export default EditCategory
