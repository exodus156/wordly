import React, { ReactNode } from "react"
import ReactDOM from "react-dom"

type WordlyDialogProps = {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
	className?: string
}

const WordlyDialog: React.FC<WordlyDialogProps> = ({
	isOpen,
	onClose,
	children,
	className,
}) => {
	const { body } = document

	if (!isOpen) {
		onClose()
		return null
	}

	return ReactDOM.createPortal(
		<div className="w-full h-full absolute inset-0 z-[10000] flex justify-center items-center backdrop-blur">
			<div
				className={`p-3 bg-stone-200 border-2 border-stone-600 rounded-lg ${className}`}
			>
				{children}
			</div>
		</div>,
		body
	)
}

export default WordlyDialog
