function Loader() {
	return (
		<div className='w-screen h-screen grid place-content-center'>
			<h1 className='text-5xl font-semibold flex items-center space-x-1 m-auto'>
				<span>Loading</span>
				<span className='relative mt-2'>
					<span
						className='inline-block w-2 h-2 bg-white rounded-full'
						style={{ animation: 'blink 1s infinite', animationDelay: '0s' }}
					></span>
					<span
						className='inline-block w-2 h-2 bg-white rounded-full ml-1'
						style={{ animation: 'blink 1s infinite', animationDelay: '0.2s' }}
					></span>
					<span
						className='inline-block w-2 h-2 bg-white rounded-full ml-1'
						style={{ animation: 'blink 1s infinite', animationDelay: '0.4s' }}
					></span>
				</span>
			</h1>
		</div>
	)
}

export default Loader
