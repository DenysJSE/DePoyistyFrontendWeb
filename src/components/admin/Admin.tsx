import Sidebar from './sidebar/Sidebar.tsx'
import { Outlet } from 'react-router-dom'

function Admin() {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='w-full p-4 px-8'>
				<Outlet />
			</div>
		</div>
	)
}

export default Admin
