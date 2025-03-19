import Image from "next/image"
import Link from "next/link"

const FooterPage = () => {
	return (
		<>
			<div className="border-t-4 border-solid border-primary px-4">
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div className="py-8">
						<Link href={"/"} aria-label="home">
							<Image
								src={"/imgs/icons.webp"}
								alt="Menime Logo"
								width={155}
								height={45}
								className="my-1 h-11 w-auto"
								priority
								placeholder="blur"
								blurDataURL={"/imgs/icons.webp"}
							/>
						</Link>
						<p className="mb-1 border-t-2 border-solid border-white py-2">
							Copyright &copy; 2025 Menime. All Rights Reserved
							<br />
						</p>
						<p className="leading-1 text-xs">
							Disclaimer: This site Menime does not store any files on its server. All contents are provided by
							non-affiliated third parties.
						</p>
					</div>
					<div className="px-5 py-12 text-right text-border">
						<Link href={"/about/dmca"} aria-label="DMCA" className="linking text-primary hover:text-border">
							DMCA
						</Link>
						&nbsp;&nbsp;
						<Link href={"/about/privacy"} aria-label="Privacy" className="linking text-primary hover:text-border">
							Privacy
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default FooterPage
