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
			e.preventDefault()
			currentInputRef.current.value = ""
			return
		}
		if (e.key === "Enter" && !currentInputRef.current.nextSibling) {
			checkValues()
			if (!currentInputRef.current.parentElement?.nextSibling) return
			;(
				currentInputRef.current.parentElement?.nextSibling
					.firstChild as HTMLInputElement
			).focus()
		}
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
			disabled={isChecked}
			onKeyDown={handleKeypress}
			maxLength={1}
			className={`w-[5rem] h-[5rem] text-center text-5xl border-2 rounded-lg ${inputColorStyles}`}
		/>
	)
}

export default WordlyInput
