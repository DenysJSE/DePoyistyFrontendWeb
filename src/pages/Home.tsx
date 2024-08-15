import Catalog from '../components/catalog/Catalog.tsx'
import { Outlet, useParams } from 'react-router-dom'

function Home() {
	const { dishId } = useParams()

	return (
		<div className='flex' style={{ height: 'calc(100dvh - 80px)' }}>
			<Catalog />
			<div className='flex-1 p-4 ml-[600px] max-xs:hidden'>
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
