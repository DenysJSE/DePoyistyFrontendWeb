import styles from './AdminPage.module.scss'
import Button from '../buttons/Button.tsx'
import { ReactNode } from 'react'

interface IAdminPageHeader {
	title: string
	isButton: boolean
	isButtonIcon?: boolean
	buttonIcon?: ReactNode
	buttonText?: string
	onClick: () => void
}

function AdminPageHeader({
	title,
	isButton,
	isButtonIcon,
	buttonIcon,
	buttonText,
	onClick
}: IAdminPageHeader) {
	return (
		<div className={styles.adminPageHeader}>
			<h1>{title}</h1>
			{isButton && (
				<Button
					type='button'
					size='small'
					className={isButtonIcon ? styles.headerButton : ''}
					onClick={onClick}
				>
					{isButtonIcon && buttonIcon}
					{buttonText}
				</Button>
			)}
		</div>
	)
}

export default AdminPageHeader
