import React, { createContext, ReactNode, useState } from 'react'

interface DishContextType {
	hasUpdated: boolean
	setHasUpdated: (hasUpdated: boolean) => void
	notifyUpdate: (dishId: number) => void
	updatedDishId: number | null
}

const DishContext = createContext<DishContextType | undefined>(undefined)

const DishProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [hasUpdated, setHasUpdated] = useState<boolean>(false)
	const [updatedDishId, setUpdatedDishId] = useState<number | null>(null)

	const notifyUpdate = (dishId: number) => {
		setUpdatedDishId(dishId)
		setHasUpdated(true)
	}

	return (
		<DishContext.Provider
			value={{
				notifyUpdate,
				hasUpdated,
				setHasUpdated,
				updatedDishId
			}}
		>
			{children}
		</DishContext.Provider>
	)
}

export { DishProvider, DishContext }
