/* eslint-disable react/no-unescaped-entities */
import React from "react"
import WordlyDialog from "./shared/WordlyDialog"

type TutorialDialog = {
	isOpen: boolean
	onClickClose: () => void
}

const TutorialDialog: React.FC<TutorialDialog> = ({ isOpen, onClickClose }) => {
	return (
		<WordlyDialog isOpen={isOpen} onClose={onClickClose}>
			<div className="flex flex-col justify-center items-center m-4">
				<span className="mb-5 text-4xl font-semibold">Tutorial</span>
				<p className="text-lg mb-4">
					Objective of this game is to guess the hidden word, which is always
					five letters long.
				</p>
				<p className="text-lg mb-4">
					Type letters using keyboard, backspace to delete letters and enter to
					accept the word.
				</p>
				<p className="text-lg mb-3">
					You can only press enter when all fileds in one row are filled.
				</p>
				<p className="text-lg mb-1">
					After accepting the word, background color of the letters will change:
				</p>
				<p className="text-lg mb-1 flex flex-col">
					<span>
						<span className="text-lime-600 font-bold">Green</span> means that
						the letter and it's position in the word are correct.
					</span>
					<span>
						<span className="text-yellow-500 font-bold">Yellow</span> means that
						the letter is correct but it's somwhere else in the word.
					</span>
					<span>
						<span className="text-stone-600 font-bold">Gray</span> means that
						the letter doesn't occur in the world.
					</span>
				</p>
				<button
					onClick={onClickClose}
					className="text-xl mt-3 font-medium rounded-lg py-2 px-4 bg-stone-200 hover:bg-stone-300 active:bg-stone-400"
				>
					Close
				</button>
			</div>
		</WordlyDialog>
	)
}

export default TutorialDialog
