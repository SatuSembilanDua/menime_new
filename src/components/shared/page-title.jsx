import React from "react"

const PageTitle = ({ children }) => {
	return (
		<>
			<h1 className="my-5 -mx-4 pl-5 border-l-4 border-primary text-xl">{children}</h1>
		</>
	)
}

export default PageTitle
