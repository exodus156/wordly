import React, { ReactNode, useEffect, useState } from "react"
import ReactDOM from "react-dom"

type WordlyDialogProps = {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	className?: string
	timeout?: number
}

const WordlyDialog: React.FC<WordlyDialogProps> = ({
	isOpen,
	onClose,
	children,
	className = "",
	timeout = 0,
}) => {
	const { body } = document

	const [displayModal, setDisplayModal] = useState(false)

	if (!isOpen) {
		onClose()
		return null
	}

	useEffect(() => {
		setTimeout(() => {
			setDisplayModal(true)
		}, timeout)
	}, [])

	return displayModal
		? ReactDOM.createPortal(
				<div className="w-full h-full absolute inset-0 z-[10000] flex justify-center items-center backdrop-blur">
					<div
						className={`p-3 bg-stone-200 border-2 border-stone-600 rounded-lg ${className}`}
					>
						{children}
					</div>
				</div>,
				body
		  )
		: null
}

export default WordlyDialog
