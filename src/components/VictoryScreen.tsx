import React from "react"
import WordlyDialog from "./shared/WordlyDialog"

type VictoryScreen = {
	isOpen: boolean
	onClickRestart: () => void
	onClickClose: () => void
	guessWord: string
}

const VictoryScreen: React.FC<VictoryScreen> = ({
	isOpen,
	onClickClose,
	onClickRestart,
	guessWord,
}) => {
	const handleRestart = (): void => {
		onClickRestart()
		onClickClose()
	}

	return (
		<WordlyDialog isOpen={isOpen} onClose={onClickClose}>
			<div className="flex flex-col justify-center items-center m-4">
				<span className="mb-5 text-4xl font-semibold">Congratulations!</span>
				<span className="text-lg mb-3">
					You have guessed correctly the word:{" "}
					<span className="text-xl font-bold">{guessWord.toUpperCase()}</span>
				</span>
				<span className="text-lg mb-2">Would you like to try again?</span>
				<button
					onClick={handleRestart}
					className="text-xl mt-3 font-medium rounded-lg py-2 px-4 bg-stone-200 hover:bg-stone-300 active:bg-stone-400"
				>
					Restart
				</button>
			</div>
		</WordlyDialog>
	)
}

export default VictoryScreen
