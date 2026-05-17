import { getAnimeBySlug } from "@/server/anime";
import ErrorPage from "../shared/error-page";
import PageTitle from "../shared/page-title";
import AnimePage from "../shared/anime-page";

export type AnimePropsType = Promise<{ slug: string }>;

const MainAnimePage = async ({ params }: { params: AnimePropsType }) => {
  const { slug } = await params;
  const data = await getAnimeBySlug(slug);
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <PageTitle>{data.judulAnime.toUpperCase()}</PageTitle>
      <AnimePage idAnime={data.idAnime} sts={data.sts} />
    </>
  );
};

export default MainAnimePage;
