import React, { useRef, useState } from "react"
import WordlyInput from "./WordlyInputRow/WordlyInput"

const DEFAULT_INPUTS_IN_ROW = 5

type WordlyInputRowProps = {
	guessWord: string
	winGame: () => void
	loseGame?: () => void
	isGameWon: boolean
	isRowActive: boolean
	switchActiveRow: () => void
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

const WordlyInputRow: React.FC<WordlyInputRowProps> = ({
	guessWord,
	winGame,
	loseGame,
	isGameWon,
	isRowActive,
	switchActiveRow,
}) => {
	const [lettersArray, setLettersArray] = useState(initialLettersArray)
	const [isChecked, setIsChecked] = useState(false)

	const rowRef = useRef<HTMLDivElement>(null)

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
		const invalidLetters = lettersCopy.filter((letter) => !letter.letter)
		if (invalidLetters.length) return
		switchActiveRow()
		setLettersArray(lettersCopy)
		setIsChecked(true)

		if (rowRef.current?.nextSibling)
			(rowRef.current.nextSibling.firstChild as HTMLInputElement).focus()

		const filteredLetters = lettersCopy.filter(
			(letter) => letter.correctPlacement
		)
		if (filteredLetters.length === lettersArray.length) {
			winGame()
			return
		}

		if (loseGame) {
			loseGame()
			return
		}
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
		<div
			ref={rowRef}
			className="flex justify-center items-center space-x-4 mt-5"
		>
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
						disabledInput={isChecked || isGameWon}
						isRowActive={isRowActive}
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
