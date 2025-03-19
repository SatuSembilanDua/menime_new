import AnimeCard from "./anime-card"

const HomePage = ({ data }) => {
	return (
		<>
			{data.map((e) => (
				<AnimeCard key={e.id_anime} data={e} />
			))}
		</>
	)
}

export default HomePage
