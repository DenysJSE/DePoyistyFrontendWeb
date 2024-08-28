import Sidebar from './sidebar/Sidebar.tsx'
import { Outlet } from 'react-router-dom'

function Admin() {
	return (
		<div className='flex'>
			<Sidebar />
			<div className='p-4 px-8' style={{ width: 'calc(100vw - 320px)' }}>
				<Outlet />
			</div>
		</div>
	)
}

export default Admin
