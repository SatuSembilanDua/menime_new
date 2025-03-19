const CaretDoubleLeft = (props) => {
	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" {...props}>
				<rect width={256} height={256} fill="none" />
				<polyline
					points="200 208 120 128 200 48"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={16}
				/>
				<polyline
					points="120 208 40 128 120 48"
					fill="none"
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={16}
				/>
			</svg>
		</>
	)
}

export default CaretDoubleLeft
