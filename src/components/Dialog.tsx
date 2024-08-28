import styles from './Components.module.scss'
import Button from './buttons/Button.tsx'

interface IDialog {
	title: string
	description: string
	cancelButtonAction: () => void
	deleteButtonAction: () => void
}

function Dialog({
	title,
	description,
	cancelButtonAction,
	deleteButtonAction
}: IDialog) {
	return (
		<div className={styles.dialogWrapper}>
			<div className={styles.dialog}>
				<h1>{title}</h1>
				<p>{description}</p>
				<div>
					<Button
						type='button'
						size='small'
						className={styles.cancelButton}
						onClick={cancelButtonAction}
					>
						Cancel
					</Button>
					<Button type='button' size='small' onClick={deleteButtonAction}>
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}

export default Dialog
