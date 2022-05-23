import React from "react"

const Header: React.FC = () => {
	const WORDLE = "WORDLE"

	const headerArray = WORDLE.split("")

	return (
		<div className="flex justify-center space-x-4">
			{headerArray.map((letter, idx) => {
				const bgColor = (index: number): string => {
					if (index === 1) return "bg-yellow-500"
					if (index === 3) return "bg-stone-600"
					return "bg-lime-600"
				}
				return (
					<div className={`w-[6rem] h-[6rem] flex justify-center items-center ${bgColor(idx)}`} key={`${letter} ${idx}`}>
						<span className="text-white text-5xl">{letter}</span>
					</div>
				)
			})}
		</div>
	)
}

export default Header