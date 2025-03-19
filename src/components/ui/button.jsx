"use client"
import Link from "next/link"

const ButtonDiv = ({ children }) => {
	return <div className="rounded-full hover:bg-white/30 p-2 transition-all duration-300 ease-in-out">{children}</div>
}

export const LinkButton = ({ children, ...props }) => {
	return (
		<>
			<Link {...props}>
				<ButtonDiv>{children}</ButtonDiv>
			</Link>
		</>
	)
}

export const Button = ({ children, ...props }) => {
	return (
		<>
			<button {...props}>
				<ButtonDiv>{children}</ButtonDiv>
			</button>
		</>
	)
}
