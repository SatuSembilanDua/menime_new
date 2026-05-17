"use client";
import { EpisodesProvider, useEpisodes } from "@/hooks/episode-provider";
import { useEffect, useRef } from "react";
import EpisodeList from "./episode-list";
import Image from "next/image";
import { PiSortAscending, PiSortDescending } from "react-icons/pi";
import { EpisodeListSkeleton } from "./skeletons";
import { useDebouncedCallback } from "use-debounce";

const AnimePage = ({ idAnime, sts }: { idAnime: string; sts: number }) => {
  return (
    <>
      <EpisodesProvider id={idAnime} sts={sts}>
        <div className="my-2 grid grid-cols-2 gap-2 border-b-2 border-solid border-white/70 py-2 text-black">
          <div>
            <ButtonSort />
          </div>
          <div>
            <Search />
          </div>
        </div>
        <ListEpisode />
      </EpisodesProvider>
    </>
  );
};

const ListEpisode = () => {
  const { items, fetchNext, hasMore, initialLoading, hasMoreLoading } = useEpisodes();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !hasMoreLoading) {
          await fetchNext();
        }
      },
      {
        threshold: 1,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNext, hasMore, hasMoreLoading]);

  if (initialLoading) {
    return <EpisodeListSkeleton />;
  }
  return (
    <div className="mb-5 h-dvh overflow-y-auto pr-2">
      {items.map((item) => (
        <EpisodeList item={item} key={`${item.idEpisode}${item.idEps}`} />
      ))}
      <div ref={triggerRef} />
      {hasMoreLoading && (
        <Image src={`/imgs/loading.svg`} alt="loading" width={200} height={200} className="mx-auto" loading="eager" />
      )}
      {!hasMore && <p>&nbsp;</p>}
    </div>
  );
};

const ButtonSort = () => {
  const { sortMode, toggleSort } = useEpisodes();
  return (
    <>
      <button
        onClick={toggleSort}
        className="flex items-center justify-center rounded-sm bg-white px-8 py-1 active:bg-white/35"
      >
        Sort&nbsp;
        {sortMode ? <PiSortAscending size={16} /> : <PiSortDescending size={16} />}
      </button>
    </>
  );
};

const Search = () => {
  const { search, setSearch } = useEpisodes();
  const handleSearch = useDebouncedCallback((term) => {
    setSearch(term);
  }, 500);
  return (
    <input
      type="search"
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 ps-5 text-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="Search..."
      defaultValue={search}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default AnimePage;
