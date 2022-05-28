import React, { useMemo } from "react"

type WordlyInputProps = {
	correctLetter?: boolean
	correctPlacement?: boolean
	updateLetter: (index: number, letter?: string) => void
	currentInputRef: React.MutableRefObject<HTMLInputElement>
	nextInputElement?: React.MutableRefObject<HTMLInputElement>
	inputIndex: number
	isChecked: boolean
}

const WordlyInput: React.FC<WordlyInputProps> = ({
	correctLetter = false,
	correctPlacement = false,
	updateLetter,
	currentInputRef,
	nextInputElement,
	inputIndex,
	isChecked,
}) => {
	const inputColorStyles = useMemo((): string => {
		switch (true) {
			case isChecked && correctPlacement && correctLetter:
				return "bg-lime-600 border-lime-600 text-white"
			case isChecked && correctLetter && !correctPlacement:
				return "bg-yellow-500 border-yellow-500 text-white"
			case isChecked && !correctLetter && !correctPlacement:
				return "bg-stone-600 border-stone-600 text-white"
			default:
				return "border-black bg-transparent text-black"
		}
	}, [correctPlacement, correctLetter, isChecked])

	const handleBlur = (): void => {
		updateLetter(inputIndex, currentInputRef.current.value)
	}

	const handleChange = (): void => {
		if (!currentInputRef.current.value.length) return
		if (!nextInputElement) {
			currentInputRef.current.blur()
			return
		}
		nextInputElement?.current.focus()
	}
	return (
		<input
			type="text"
			ref={currentInputRef}
			onChange={handleChange}
			onBlur={handleBlur}
			disabled={isChecked}
			maxLength={1}
			className={`w-[6rem] h-[6rem] text-center text-5xl border-2 rounded-lg ${inputColorStyles}`}
		/>
	)
}

export default WordlyInput
