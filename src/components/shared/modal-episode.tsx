"use client";
import { cn } from "@/lib/utils";
import { EpisodeType, getAllEpisodeByAnime } from "@/server/episode";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PiListBullets, PiX } from "react-icons/pi";
import EpisodeList from "./episode-list";

const ModalEpisode = ({ anime, slug }: { anime: string; slug: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<EpisodeType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const listRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getEpisode = async () => {
      setLoading(true);
      const episode = await getAllEpisodeByAnime(anime);
      console.log(episode);
      setData(episode ?? []);
      setLoading(false);
    };
    // if (isOpen && data.length == 0) {
    if (isOpen) {
      getEpisode();
    }
  }, [isOpen, anime]);

  useEffect(() => {
    if (data.length > 0 && !loading) {
      const indexScrl = itemRefs.current.findIndex((e) => e?.classList.contains("active"));
      // itemRefs.current[indexScrl].scrollIntoView({
      // 	behavior: "smooth",
      // 	block: "nearest",
      // })
      if (indexScrl !== -1 && itemRefs.current[indexScrl]) {
        itemRefs.current[indexScrl]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [data, loading]);

  return (
    <>
      <button onClick={toggleModal}>
        <ButtonDiv>
          <PiListBullets size={32} />
        </ButtonDiv>
      </button>
      <div className={cn(isOpen ? "block" : "hidden")}>
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/50"
          onClick={toggleModal}
        >
          <div className="h-1/2 w-1/2 rounded-md bg-background">
            <div className="flex items-center justify-between border-b-2 px-4 py-2">
              <h3>List Episode</h3>
              <button onClick={toggleModal}>
                <ButtonDiv>
                  <PiX width={16} height={16} />
                </ButtonDiv>
              </button>
            </div>
            <div className="h-5/6 overflow-y-auto p-2">
              {loading ? <LoadingBox /> : <ListEpisode data={data} slug={slug} itemRefs={itemRefs} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ButtonDiv = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-white/30">{children}</div>;
};

const LoadingBox: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={`/imgs/loading.svg`}
        alt="loading"
        width={200}
        height={200}
        className="mx-auto w-40"
        loading="eager"
      />
    </div>
  );
};

interface ListEpisodeProps {
  data: Array<EpisodeType>;
  slug: string;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const ListEpisode: React.FC<ListEpisodeProps> = ({ data, slug, itemRefs }) => {
  return (
    <div className="mb-5 pr-2">
      {data.map((item: EpisodeType, index: number) => {
        const isActive: boolean = slug === item.link;
        return (
          <div
            key={item.idEpisode}
            ref={(el: HTMLDivElement | null) => {
              itemRefs.current[index] = el;
            }}
            className={cn(isActive && "active")}
          >
            <EpisodeList item={item} isDark={false} isActive={isActive} />
          </div>
        );
      })}
    </div>
  );
};
export default ModalEpisode;
