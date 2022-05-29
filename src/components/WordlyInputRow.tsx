import React, { useRef, useState } from "react"
import WordlyInput from "./WordlyInputRow/WordlyInput"

const DEFAULT_INPUTS_IN_ROW = 5

type WordlyInputRowProps = {
	guessWord: string
}

type WordlyLetterType = {
	letter: string
	correctLetter: boolean
	correctPlacement: boolean
}

const initialLettersArray = Array<WordlyLetterType>(DEFAULT_INPUTS_IN_ROW).fill(
	{
		letter: "",
		correctLetter: false,
		correctPlacement: false,
	}
)

const WordlyInputRow: React.FC<WordlyInputRowProps> = ({ guessWord }) => {
	const [lettersArray, setLettersArray] = useState(initialLettersArray)
	const [isChecked, setIsChecked] = useState(false)

	const checkLetters = (): void => {
		const lettersCopy = lettersArray.map(
			({ letter }, idx): WordlyLetterType => {
				return {
					letter,
					correctLetter: guessWord.includes(letter.toLowerCase()),
					correctPlacement:
						guessWord.indexOf(letter.toLowerCase(), idx) === idx,
				}
			}
		)
		setLettersArray(lettersCopy)
		setIsChecked(true)
	}

	const updateLettersArray = (index: number, letter: string): void => {
		const lettersCopy = [...lettersArray]
		lettersCopy[index] = {
			...lettersCopy[index],
			letter,
		}
		setLettersArray(lettersCopy)
	}

	return (
		<div className="flex justify-center items-center space-x-4 mt-5">
			{lettersArray.map(({ letter, correctLetter, correctPlacement }, idx) => {
				const inputLetterRef =
					useRef() as React.MutableRefObject<HTMLInputElement>
				return (
					<WordlyInput
						key={`${idx}`}
						currentInputRef={inputLetterRef}
						correctLetter={correctLetter}
						correctPlacement={correctPlacement}
						inputIndex={idx}
						isChecked={isChecked}
						updateLetter={updateLettersArray}
						letter={letter}
						checkValues={checkLetters}
					/>
				)
			})}
		</div>
	)
}

export default WordlyInputRow
