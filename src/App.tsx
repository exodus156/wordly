/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import LoseScreen from "./components/LoseScreen"
import TutorialDialog from "./components/TutorialDialog"
import VictoryScreen from "./components/VictoryScreen"
import WordlyInputRow from "./components/WordlyInputRow"
import words from "./db/wordle.json"

const NUMBER_OF_ATTEMPS = 8
const DELAY_FOR_ENDING = 700

const App: React.FC = () => {
	const [gameState, setGameState] = useState({
		gameWon: false,
		gameLost: false,
	})
	const [isTutorialOpen, setIsTutorialOpen] = useState(false)
	const [isVictoryScreenOpen, setIsVictoryScreenOpen] = useState(false)
	const [isLostScreenOpen, setIsLostScreenOpen] = useState(false)
	const [activeRowIndex, setActiveRowIndex] = useState(0)
	const [gameWord] = useState(words[Math.floor(Math.random() * words.length)])

	const winGame = (): void => {
		setGameState({
			...gameState,
			gameWon: true,
		})
	}

	const loseGame = (): void => {
		setGameState({
			...gameState,
			gameLost: true,
		})
	}

	const openTutorialDialog = (): void => {
		setIsTutorialOpen(true)
	}

	const closeTutorialDialog = (): void => {
		setIsTutorialOpen(false)
	}

	const switchActiveInputRow = (): void => {
		setActiveRowIndex((prev) => prev + 1)
	}

	const closeVictoryScreen = (): void => {
		setIsVictoryScreenOpen(false)
	}

	const closeLostScreen = (): void => {
		setIsLostScreenOpen(false)
	}

	const restartGame = (): void => {
		window.location.reload()
	}

	useEffect(() => {
		setIsLostScreenOpen(gameState.gameLost)
		setIsVictoryScreenOpen(gameState.gameWon)
	}, [gameState])

	return (
		<div className="p-6 h-full">
			<Header />
			<div className="flex flex-col justify-center items-center space-y-5">
				<div className="flex flex-col justify-center items-center space-y-4 mt-5">
					{Array.from({ length: NUMBER_OF_ATTEMPS }, (item, idx) => (
						<WordlyInputRow
							key={idx}
							guessWord={gameWord}
							winGame={winGame}
							isGameWon={gameState.gameWon}
							loseGame={
								idx + 1 === NUMBER_OF_ATTEMPS ? loseGame : (): void => {}
							}
							isRowActive={idx === activeRowIndex}
							switchActiveRow={switchActiveInputRow}
						/>
					))}
				</div>
				<button
					onClick={openTutorialDialog}
					className="text-xl font-medium rounded-lg py-2 px-4 bg-stone-100 hover:bg-stone-200 active:bg-stone-300"
				>
					Tutorial
				</button>
			</div>
			{isVictoryScreenOpen && (
				<VictoryScreen
					isOpen={isVictoryScreenOpen}
					onClickClose={closeVictoryScreen}
					onClickRestart={restartGame}
					guessWord={gameWord}
					timeout={DELAY_FOR_ENDING}
				/>
			)}
			{isLostScreenOpen && (
				<LoseScreen
					isOpen={isLostScreenOpen}
					onClickClose={closeLostScreen}
					onClickRestart={restartGame}
					guessWord={gameWord}
					timeout={DELAY_FOR_ENDING}
				/>
			)}
			{isTutorialOpen && (
				<TutorialDialog
					isOpen={isTutorialOpen}
					onClickClose={closeTutorialDialog}
				/>
			)}
		</div>
	)
}

export default App
