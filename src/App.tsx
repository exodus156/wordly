import React, { useRef, useState } from "react"
import "./App.css"
import Header from "./components/Header"
import WordlyInput from "./components/WordlyInput"

const App: React.FC = () => {
	const inputRef1 = useRef() as React.MutableRefObject<HTMLInputElement>
	const inputRef2 = useRef() as React.MutableRefObject<HTMLInputElement>
	const inputRef3 = useRef() as React.MutableRefObject<HTMLInputElement>
	const inputRef4 = useRef() as React.MutableRefObject<HTMLInputElement>
	const inputRef5 = useRef() as React.MutableRefObject<HTMLInputElement>

	const [isChecked, setIsChecked] = useState(false)

	const test = (index: number, letter?: string): void => {
		console.log(index, letter)
	}

	const checkValues = (): void => {
		setIsChecked((prev) => !prev)
		inputRef1.current.value = inputRef1.current.value.toUpperCase()
		inputRef2.current.value = inputRef2.current.value.toUpperCase()
		inputRef3.current.value = inputRef3.current.value.toUpperCase()
		inputRef4.current.value = inputRef4.current.value.toUpperCase()
		inputRef5.current.value = inputRef5.current.value.toUpperCase()
	}

	return (
		<div className="p-10">
			<Header />
			<div className="flex justify-center items-center space-x-4 mt-5">
				<WordlyInput
					currentInputRef={inputRef1}
					nextInputElement={inputRef2}
					updateLetter={test}
					inputIndex={0}
					correctLetter={false}
					correctPlacement={false}
					isChecked={isChecked}
				/>
				<WordlyInput
					currentInputRef={inputRef2}
					nextInputElement={inputRef3}
					updateLetter={test}
					inputIndex={1}
					correctLetter={true}
					correctPlacement={false}
					isChecked={isChecked}
				/>
				<WordlyInput
					currentInputRef={inputRef3}
					nextInputElement={inputRef4}
					updateLetter={test}
					inputIndex={2}
					correctLetter={true}
					correctPlacement={true}
					isChecked={isChecked}
				/>
				<WordlyInput
					currentInputRef={inputRef4}
					nextInputElement={inputRef5}
					updateLetter={test}
					inputIndex={3}
					isChecked={isChecked}
				/>
				<WordlyInput
					currentInputRef={inputRef5}
					updateLetter={test}
					inputIndex={4}
					isChecked={isChecked}
				/>
			</div>
			<button
				onClick={checkValues}
				className="px-4 py-2 bg-teal-500 rounded-lg"
			>
				Check
			</button>
		</div>
	)
}

export default App
