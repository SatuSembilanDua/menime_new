import { getEpisodeAnimeBySlug } from "@/server/episode";
import ErrorPage from "../shared/error-page";
import LinkButton from "../shared/link-button";
import { PiArrowFatLeftFill, PiCaretDoubleLeft, PiCaretDoubleRight } from "react-icons/pi";
import ModalEpisode from "../shared/modal-episode";
import IframePlayer from "../shared/iframe-player";

export type ViewPropsType = Promise<{ slug: string }>;

const ViewPage = async ({ params }: { params: ViewPropsType }) => {
  const { slug } = await params;
  const data = await getEpisodeAnimeBySlug(slug);
  if (!data) {
    return <ErrorPage />;
  }
  return (
    <>
      <div className="t-0 l-0 absolute h-dvh w-dvw">
        <IframePlayer className="h-full w-full" src={data.vid} allowFullScreen={true} />
      </div>
      <div className="t-0 l-0 absolute z-40 w-screen">
        <div className="flex items-center justify-between gap-4 px-8 py-4 text-primary transition-all duration-300 ease-in-out hover:bg-black/40">
          <div className="flex gap-2">
            <LinkButton href={`/anime/${data.linkAnime}`}>
              <PiArrowFatLeftFill size={24} />
            </LinkButton>
            <LinkButton href={data.nav.prev == null ? "#" : `/episode/${data.nav.prev}`}>
              <PiCaretDoubleLeft size={24} />
            </LinkButton>
            <LinkButton href={data.nav.next == null ? "#" : `/episode/${data.nav.next}`}>
              <PiCaretDoubleRight size={24} />
            </LinkButton>
          </div>
          <div>
            <h1 className="text-white">{`${data.eps} - ${data.judul}`}</h1>
          </div>
          <div>
            <ModalEpisode anime={data.idAnime} slug={slug} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
