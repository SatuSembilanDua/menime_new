import { EpisodeSkeleton } from "@/components/shared/skeletons";
import MainAnimePage, { AnimePropsType } from "@/components/ui/anime-page";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { getAnimeBySlug } from "@/server/anime";
import { Suspense } from "react";

export const generateMetadata = async ({ params }: { params: AnimePropsType }) => {
  const { slug } = await params;
  const data = await getAnimeBySlug(slug);
  if (!data) {
    return {
      title: `Error`,
    };
  }
  const judul = data?.judulAnime;
  const deskripsi = `Nonton ${data?.judulAnime}. ${APP_DESCRIPTION}`;
  const url = new URL(`${SERVER_URL}/anime/${slug}`);
  console.log(data?.img);
  const imgurl = new URL(data?.img ?? `${SERVER_URL}imgs/icons.webp`);
  return {
    title: judul,
    description: deskripsi,
    openGraph: {
      siteName: APP_NAME,
      title: judul,
      description: deskripsi,
      url: url.toString(),
      locale: "id_ID",
      type: "website",
      images: [
        {
          url: imgurl.toString(),
          width: 225,
          height: 350,
          alt: judul,
        },
      ],
    },
  };
};

const AnimeMainPage = ({ params }: { params: AnimePropsType }) => {
  return (
    <>
      <Suspense fallback={<EpisodeSkeleton />}>
        <MainAnimePage params={params} />
      </Suspense>
    </>
  );
};

export default AnimeMainPage;
