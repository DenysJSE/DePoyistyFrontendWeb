import styles from './Sidebar.module.scss'
import { SidebarItems } from './SidebarItems.tsx'
import { NavLink } from 'react-router-dom'
import cn from 'clsx'

function Sidebar() {
	return (
		<aside className={styles.adminSidebar}>
			{SidebarItems.map(item => (
				<NavLink
					to={item.link}
					className={({ isActive }) =>
						cn(styles.sidebarItem, isActive && styles.active)
					}
					key={item.title}
				>
					{item.image}
					<span>{item.title}</span>
				</NavLink>
			))}
		</aside>
	)
}

export default Sidebar
