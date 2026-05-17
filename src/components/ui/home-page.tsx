import { getAllAnime } from "@/server/anime";
import AnimeCard from "../shared/anime-card";
import ErrorPage from "../shared/error-page";

const HomePage = async () => {
  const data = await getAllAnime();
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-8 md:gap-6">
        {data.map((d) => (
          <AnimeCard key={d.idAnime} data={d} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
