import React, { useState } from 'react'
import Button from '../../buttons/Button.tsx'
import { dishService } from '../../../services/dish.service.ts'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../../../services/category.service.ts'

interface IAddNewDishDialog {
	cancelButtonAction: () => void
	restaurantId: number
	restaurantName: string
}

function AddNewDishDialog({
	cancelButtonAction,
	restaurantId,
	restaurantName
}: IAddNewDishDialog) {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [dishPrice, setPrice] = useState('')
	const [categoryId, setCategoryId] = useState<number>(1)
	const queryClient = useQueryClient()

	const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target
		switch (id) {
			case 'restaurant-name':
				setName(value)
				break
			case 'restaurant-description':
				setDescription(value)
				break
			case 'restaurant-price':
				setPrice(value)
				break
		}
	}

	const handleChangeTextarea = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(event.target.value)
	}

	const handleCreateDish = async () => {
		const price = +dishPrice
		try {
			await dishService.createDish({
				name,
				description,
				price,
				restaurantId,
				categoryId
			})
			cancelButtonAction()
			await queryClient.invalidateQueries({ queryKey: ['restaurants'] })
		} catch (e) {
			console.log(e)
		}
	}

	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () => categoryService.getAllCategories()
	})

	if (!categories) return null

	return (
		<section className='dialogFormWrapper'>
			<div className='dialogForm'>
				<h1>Add new dish</h1>
				<div className='dialogFormInputs'>
					<div>
						<label htmlFor='restaurant-name'>Dish name</label>
						<input
							type='text'
							id='restaurant-name'
							value={name}
							onChange={handleChangeValue}
						/>
					</div>
					<div>
						<label htmlFor='restaurant-description'>Dish description</label>
						<textarea
							id='restaurant-description'
							value={description}
							onChange={handleChangeTextarea}
						/>
					</div>
					<div>
						<label htmlFor='restaurant-price'>Dish price</label>
						<input
							type='text'
							id='restaurant-price'
							value={dishPrice}
							onChange={handleChangeValue}
						/>
					</div>
					<div>
						<label htmlFor='restaurantId'>Restaurant</label>
						<input type='text' value={restaurantName} readOnly />
					</div>
					<div>
						<label htmlFor='categoryId'>Category</label>
						<select name='categories' id='categoryId'>
							<option value='' disabled selected>
								Select your option
							</option>
							{categories.map(category => (
								<option
									value={category.name.toLowerCase()}
									onClick={() => setCategoryId(category.id)}
									key={category.id}
								>
									{category.name}
								</option>
							))}
						</select>
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
					<Button type='button' size='small' onClick={handleCreateDish}>
						Create
					</Button>
				</div>
			</div>
		</section>
	)
}

export default AddNewDishDialog
