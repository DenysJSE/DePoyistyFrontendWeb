import Catalog from '../components/catalog/Catalog.tsx'
import { Outlet, useParams } from 'react-router-dom'
import styles from './Pages.module.scss'

function Home() {
	const { dishId } = useParams()

	return (
		<div
			className='flex'
			style={{ height: 'calc(100dvh - var(--header-height))' }}
		>
			<Catalog />
			<div className={styles.homeLayout}>
				{dishId ? (
					<Outlet />
				) : (
					<p className='h-full flex items-center justify-center text-2xl font-semibold'>
						Choose some dish from search to see details about it.
					</p>
				)}
			</div>
		</div>
	)
}

export default Home
