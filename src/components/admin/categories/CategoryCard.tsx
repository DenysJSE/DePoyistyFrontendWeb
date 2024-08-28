import styles from './AdminCategories.module.scss'
import { Pencil, Trash } from 'lucide-react'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { categoryService } from '../../../services/category.service.ts'
import Dialog from '../../Dialog.tsx'
import EditCategory from './EditCategory.tsx'

interface ICategoryCard {
	title: string
	categoryId: number
}

function CategoryCard({ title, categoryId }: ICategoryCard) {
	const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false)
	const [isShowEditForm, setIsShowEditForm] = useState(false)
	const queryClient = useQueryClient()

	const handleShowDeleteDialog = () => {
		setIsShowDeleteDialog(true)
	}

	const handleShowEditForm = () => {
		setIsShowEditForm(true)
	}

	const handleDeleteCategory = async () => {
		try {
			await categoryService.deleteCategory(categoryId)
			setIsShowDeleteDialog(false)
			await queryClient.invalidateQueries({ queryKey: ['categories'] })
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div>
			<div className={styles.categoryCard}>
				<h1>{title}</h1>
				<div>
					<Pencil onClick={handleShowEditForm} />
					<Trash
						style={{ color: '#f87171' }}
						onClick={handleShowDeleteDialog}
					/>
				</div>
			</div>
			{isShowDeleteDialog && (
				<Dialog
					title='Are you absolutely sure?'
					description='This action cannot be undone. This will permanently delete this category and its dishes in every restaurant with such category, and you will not be able to recover the data.'
					cancelButtonAction={() => setIsShowDeleteDialog(false)}
					deleteButtonAction={handleDeleteCategory}
				/>
			)}
			{isShowEditForm && (
				<EditCategory
					name={title}
					categoryId={categoryId}
					cancelButtonAction={() => setIsShowEditForm(false)}
					setIsShowEdit={setIsShowEditForm}
				/>
			)}
		</div>
	)
}

export default CategoryCard
