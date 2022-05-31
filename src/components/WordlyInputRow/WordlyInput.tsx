import React, { useMemo } from "react"
import { motion } from "framer-motion"

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

const inputRegEx = /^[a-zA-Z]+$/

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
	const inputColorVariant = useMemo((): string => {
		switch (true) {
			case isChecked && correctPlacement && correctLetter:
				return "correctField"
			case isChecked && correctLetter && !correctPlacement:
				return "correctLetter"
			case isChecked && !correctLetter && !correctPlacement:
				return "incorrectField"
			default:
				return "defaut"
		}
	}, [correctPlacement, correctLetter, isChecked])

	const colorVariants: { [key: string]: any } = {
		correctField: {
			backgroundColor: [
				"#f5f5f4",
				"#ecfccb",
				"#d9f99d",
				"#bef264",
				"#a3e635",
				"#84cc16",
				"#65a30d",
			],
			borderColor: ["#000000", "#365314", "#3f6212", "#4d7c0f", "#65a30d"],
			color: [
				"#000000",
				"#1c1917",
				"#44403c",
				"#78716c",
				"#d6d3d1",
				"#f5f5f4",
				"#f5f5f4",
			],
		},
		correctLetter: {
			backgroundColor: [
				"#f5f5f4",
				"#fef9c3",
				"#fef08a",
				"#fde047",
				"#facc15",
				"#eab308",
			],
			borderColor: [
				"#000000",
				"#713f12",
				"#854d0e",
				"#a16207",
				"#ca8a04",
				"#eab308",
			],
			color: [
				"#000000",
				"#1c1917",
				"#44403c",
				"#78716c",
				"#d6d3d1",
				"#f5f5f4",
				"#f5f5f4",
			],
		},
		incorrectField: {
			backgroundColor: [
				"#f5f5f4",
				"#e7e5e4",
				"#d6d3d1",
				"#a8a29e",
				"#78716c",
				"#57534e",
			],
			borderColor: ["#000000", "#1c1917", "#292524", "#44403c", "#57534e"],
			color: [
				"#000000",
				"#1c1917",
				"#44403c",
				"#78716c",
				"#d6d3d1",
				"#f5f5f4",
				"#f5f5f4",
			],
		},
		default: {
			backgroundColor: "#f5f5f4",
			borderColor: "#000000",
			color: "#000000",
		},
	}

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
		if (!inputRegEx.test(currentInputRef.current.value)) {
			currentInputRef.current.value = ""
			return
		}
		currentInputRef.current.value = currentInputRef.current.value.toUpperCase()
		updateLetter(inputIndex, currentInputRef.current.value)

		if (!currentInputRef.current.nextSibling) return
		currentInputRef.current.blur()
		;(currentInputRef.current.nextSibling as HTMLInputElement).focus()
	}
	return (
		<motion.input
			type="text"
			ref={currentInputRef}
			initial="default"
			animate={colorVariants[inputColorVariant]}
			transition={{
				duration: 0.1,
				ease: "linear",
				delay: inputIndex * 0.1,
			}}
			variants={colorVariants}
			onChange={handleChange}
			defaultValue={letter}
			disabled={disabledInput}
			onKeyDown={handleKeypress}
			onMouseDown={handleMouseClick}
			maxLength={1}
			className={`w-[4rem] h-[4rem] text-center text-4xl border-2 rounded-lg  ${
				isRowActive ? "cursor-text" : "cursor-default"
			}`}
		/>
	)
}

export default WordlyInput
