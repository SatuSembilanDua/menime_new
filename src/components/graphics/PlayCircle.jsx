const PlayCircle = (props) => {
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
				<rect width={256} height={256} fill="none" />
				<path
					fill="currentColor"
					d="M170.83,118.13l-52-36A12,12,0,0,0,100,92v72a12,12,0,0,0,18.83,9.87l52-36a12,12,0,0,0,0-19.74Z"
				/>
				<circle
					cx={128}
					cy={128}
					r={96}
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={24}
				/>
			</svg>
		</>
	)
}
export default PlayCircle
