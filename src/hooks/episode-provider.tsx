"use client";
import { CursorResponse, EpisodeType, getEpisodesByIdAnime } from "@/server/episode";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type ProviderProps = {
  id: string;
  sts: number;
  children: React.ReactNode;
};

type EpisodesContextType = {
  items: Array<EpisodeType>;
  initialLoading: boolean;
  hasMoreLoading: boolean;
  hasMore: boolean;
  search: string;
  setSearch: (v: string) => void;
  sortMode: boolean;
  toggleSort: () => void;
  fetchNext: () => Promise<void>;
};

const EpisodesContext = createContext<EpisodesContextType | null>(null);

export const useEpisodes = () => {
  const ctx = useContext(EpisodesContext);
  if (!ctx) throw new Error("useEpisodes must be used inside provider");
  return ctx;
};

export const EpisodesProvider = ({ id, sts, children }: ProviderProps) => {
  const [items, setItems] = useState<Array<EpisodeType>>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMoreLoading, setHasMoreLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState(false);
  const loadingRef = useRef(false);

  const loadData = useCallback(
    async ({
      reset = false,
    }: {
      reset?: boolean;
    } = {}) => {
      if (loadingRef.current) return;
      loadingRef.current = true;
      if (reset) {
        setInitialLoading(true);
      } else {
        setHasMoreLoading(true);
      }
      try {
        const res: CursorResponse = await getEpisodesByIdAnime({
          idAnime: id,
          sts: sts,
          sort: sortMode,
          search: search,
          cursor: reset ? null : cursor,
        });
        // setItems((prev) => (reset ? res.items : [...prev, ...res.items]));
        setItems((prev) => {
          const merged = reset ? res.items : [...prev, ...res.items];
          return Array.from(new Map(merged.map((item) => [item.idEpisode, item])).values());
        });
        setCursor(res.nextCursor);
        setHasMore(res.hasMore);
      } finally {
        loadingRef.current = false;
        setInitialLoading(false);
        setHasMoreLoading(false);
      }
    },
    [cursor, id, search, sortMode, sts]
  );

  useEffect(() => {
    const call = () => {
      setItems([]);
      setCursor(null);
      setHasMore(true);
      loadData({ reset: true });
    };
    call();
    // }, [search, sortMode, loadData]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortMode]);

  const toggleSort = () => {
    setSortMode((prev) => (prev === false ? true : false));
  };

  const fetchNext = useCallback(async () => {
    if (!hasMore) return;
    if (loadingRef.current) return;
    await loadData();
  }, [hasMore, loadData]);

  const value = useMemo(
    () => ({
      items,
      initialLoading,
      hasMoreLoading,
      hasMore,
      search,
      setSearch,
      sortMode,
      toggleSort,
      fetchNext,
    }),
    [hasMore, items, initialLoading, hasMoreLoading, search, sortMode, fetchNext]
  );

  return <EpisodesContext.Provider value={value}>{children}</EpisodesContext.Provider>;
};
