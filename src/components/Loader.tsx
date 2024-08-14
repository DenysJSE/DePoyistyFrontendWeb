import { LoaderCircle } from 'lucide-react'
import cn from 'clsx'

function Loader({ className }: { className?: string }) {
	return (
		<div className={cn(className, 'w-full h-full grid place-content-center')}>
			<LoaderCircle size={30} className='animate-spin' />
		</div>
	)
}

export default Loader
