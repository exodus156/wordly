import React from "react"
import "./App.css"
import Header from "./components/Header"
import WordlyInputRow from "./components/WordlyInputRow"

const testValue = "banna"

const App: React.FC = () => {
	return (
		<div className="p-6 h-full">
			<Header />
			<div className="flex flex-col justify-center items-center space-y-4 mt-5">
				<WordlyInputRow guessWord={testValue} />
				<WordlyInputRow guessWord={testValue} />
				<WordlyInputRow guessWord={testValue} />
				<WordlyInputRow guessWord={testValue} />
				<WordlyInputRow guessWord={testValue} />
				<WordlyInputRow guessWord={testValue} />
			</div>
		</div>
	)
}

export default App
