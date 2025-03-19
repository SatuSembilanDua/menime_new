import Image from "next/image"
import Link from "next/link"

const HeaderPage = () => {
	return (
		<>
			<div className="border-b-4 border-primary p-0 text-center md:px-24 md:text-left">
				<Link href={"/"} className="linking inline-block">
					<Image
						src={"/imgs/icons.webp"}
						alt="Menime Logo"
						width={250}
						height={75}
						className="mx-auto my-5 h-16 md:mx-0 w-auto"
						priority
						placeholder="blur"
						blurDataURL={"/imgs/icons.webp"}
					/>
				</Link>
			</div>
		</>
	)
}

export default HeaderPage
