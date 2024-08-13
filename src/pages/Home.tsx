import Catalog from '../components/catalog/Catalog.tsx'
import { Outlet, useParams } from 'react-router-dom'
import { DishProvider } from '../context/DishProvider.tsx'

function Home() {
	const { dishId } = useParams()

	return (
		<DishProvider>
			<div className='flex' style={{ height: 'calc(100vh - 80px)' }}>
				<Catalog />
				<div className='flex-1 p-4 ml-[600px]'>
					{dishId ? (
						<Outlet />
					) : (
						<p className='h-full flex items-center justify-center text-2xl font-semibold'>
							Choose some dish from search to see details about it.
						</p>
					)}
				</div>
			</div>
		</DishProvider>
	)
}

export default Home
