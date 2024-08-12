import { Search } from 'lucide-react'

function Searchbar() {
	return (
		<div className='fixed right-0 left-8 max-w-[535px]'>
			<div className='relative'>
				<Search className='absolute text-black top-3 left-4' size={20} />
				<input
					type='text'
					placeholder='Search...'
					className='w-full rounded-full pl-12 px-6 py-2 text-black outline-none text-lg placeholder:text-border'
				/>
			</div>
		</div>
	)
}

export default Searchbar
