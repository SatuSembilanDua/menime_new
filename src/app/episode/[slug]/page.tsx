import { ViewEpisodeSkeleton } from "@/components/shared/skeletons";
import ViewPage, { ViewPropsType } from "@/components/ui/view-page";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { getEpisodeAnimeBySlug } from "@/server/episode";
import { Suspense } from "react";

export const generateMetadata = async ({ params }: { params: ViewPropsType }) => {
  const { slug } = await params;
  const data = await getEpisodeAnimeBySlug(slug);
  const judul = `${data?.anime} | ${data?.eps} - ${data?.judul}`; //data?.judulAnime;
  const deskripsi = `Nonton ${data?.anime} ${data?.eps} - ${data?.judul}. ${APP_DESCRIPTION}`;
  const url = new URL(`${SERVER_URL}/anime/${slug}`);
  const imgurl = new URL(data?.img ?? "");
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

const MainViewPage = ({ params }: { params: ViewPropsType }) => {
  return (
    <>
      <Suspense fallback={<ViewEpisodeSkeleton />}>
        <ViewPage params={params} />
      </Suspense>
    </>
  );
};

export default MainViewPage;
