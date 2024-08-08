export const convertName = (name: string) => {
	return `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`
}
