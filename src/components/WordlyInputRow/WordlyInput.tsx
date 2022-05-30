import React, { useMemo } from "react"

type WordlyInputProps = {
	correctLetter?: boolean
	correctPlacement?: boolean
	letter: string
	updateLetter: (index: number, letter: string) => void
	checkValues: () => void
	currentInputRef: React.MutableRefObject<HTMLInputElement>
	inputIndex: number
	isChecked: boolean
	disabledInput: boolean
	isRowActive: boolean
}

const WordlyInput: React.FC<WordlyInputProps> = ({
	correctLetter = false,
	correctPlacement = false,
	updateLetter,
	letter,
	currentInputRef,
	inputIndex,
	isChecked,
	checkValues,
	disabledInput,
	isRowActive,
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

	const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			if (
				!currentInputRef.current.value &&
				currentInputRef.current.previousSibling
			) {
				currentInputRef.current.blur()
				;(currentInputRef.current.previousSibling as HTMLInputElement).focus()
				return
			}
		}
		if (
			e.key === "Enter" &&
			!currentInputRef.current.nextSibling &&
			currentInputRef.current.value
		) {
			checkValues()
		}
		if (e.key === "Tab") e.preventDefault()
	}

	const handleMouseClick = (
		e: React.MouseEvent<HTMLInputElement, MouseEvent>
	) => {
		if (isRowActive) return
		e.preventDefault()
	}

	const handleChange = (): void => {
		if (!currentInputRef.current.value.length) return
		currentInputRef.current.value = currentInputRef.current.value.toUpperCase()
		updateLetter(inputIndex, currentInputRef.current.value)

		if (!currentInputRef.current.nextSibling) return
		currentInputRef.current.blur()
		;(currentInputRef.current.nextSibling as HTMLInputElement).focus()
	}
	return (
		<input
			type="text"
			ref={currentInputRef}
			onChange={handleChange}
			defaultValue={letter}
			disabled={disabledInput}
			onKeyDown={handleKeypress}
			onMouseDown={handleMouseClick}
			maxLength={1}
			className={`w-[6rem] h-[6rem] text-center text-6xl border-2 rounded-lg ${
				isRowActive ? "cursor-text" : "cursor-default"
			} ${inputColorStyles}`}
		/>
	)
}

export default WordlyInput
