import FooterPage from "@/components/shared/footer-page"
import HeaderPage from "@/components/shared/header-page"
import Image from "next/image"
import Link from "next/link"

const Mainlayout = ({ children }) => {
	return (
		<>
			<HeaderPage />
			<div className="relative min-h-[540px] px-5 py-5 pt-12 md:px-12">{children}</div>
			<FooterPage />
		</>
	)
}

export default Mainlayout
