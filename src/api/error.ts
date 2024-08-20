export const getContentType = () => ({
	'Content-Type': 'application/json'
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const errorCatch = (error): string => {
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
