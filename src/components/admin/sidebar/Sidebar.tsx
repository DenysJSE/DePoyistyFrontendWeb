import styles from './Sidebar.module.scss'
import { SidebarItems } from './SidebarItems.tsx'
import { NavLink } from 'react-router-dom'
import cn from 'clsx'

function Sidebar() {
	return (
		<aside className={styles.adminSidebar}>
			{SidebarItems.map(item =>
				item.created ? (
					<NavLink
						to={item.link}
						className={({ isActive }) =>
							cn(
								styles.sidebarItem,
								isActive && item.created && styles.active,
								!item.created && styles.soon
							)
						}
						key={item.title}
					>
						{item.image}
						<div className={styles.itemTitle}>
							<h1>{item.title}</h1>
							{!item.created && <span className={styles.soonLabel}>soon</span>}
						</div>
					</NavLink>
				) : (
					<div className={cn(styles.sidebarItem, !item.created && styles.soon)}>
						{item.image}
						<div className={styles.itemTitle}>
							<h1>{item.title}</h1>
							{!item.created && <span className={styles.soonLabel}>soon</span>}
						</div>
					</div>
				)
			)}
		</aside>
	)
}

export default Sidebar
