import { Search } from 'lucide-react'
import React from 'react'
import styles from './Inputs.module.scss'

function Searchbar({
	setSearchQuery
}: {
	setSearchQuery: (query: string) => void
}) {
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value)
	}

	return (
		<div className={styles.searchbar}>
			<div className='relative'>
				<Search className={styles.icon} />
				<input
					type='text'
					placeholder='Search...'
					onChange={handleInputChange}
				/>
			</div>
		</div>
	)
}

export default Searchbar
