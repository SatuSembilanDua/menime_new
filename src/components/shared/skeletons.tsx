import { cn } from "@/lib/utils";
import PageTitle from "./page-title";
import Image from "next/image";

export const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="skeleton" className={cn("animate-pulse rounded-none bg-muted", className)} {...props} />;
};

export const AnimesSkeleton = () => {
  const dummy = [...Array(16).keys()];
  return (
    <>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-8 md:gap-6">
        {dummy.map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export const CardSkeleton = () => {
  return (
    <>
      <div className="group">
        <Skeleton className="h-[40vw] w-full rounded-xl md:h-[15vw]" />
        <Skeleton className="mt-3 h-6 w-full" />
      </div>
    </>
  );
};

export const EpisodeSkeleton = () => {
  const dummy = [...Array(50).keys()];
  return (
    <>
      <PageTitle>
        <Skeleton className="h-6 w-full" />
      </PageTitle>
      <div className="my-2 grid grid-cols-2 gap-2 border-b-2 border-solid border-white/70 py-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="mb-5 h-dvh overflow-y-auto pr-2">
        {dummy.map((i) => (
          <RowSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export const EpisodeListSkeleton = () => {
  const dummy = [...Array(10).keys()];
  return (
    <>
      {dummy.map((i) => (
        <RowSkeleton key={i} />
      ))}
    </>
  );
};

export const RowSkeleton = () => {
  return (
    <>
      <div className="flex gap-2 border-b-2 border-solid border-white/40 py-1">
        <div className="flex-none basis-12">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grow">
          <div className="flex justify-between pt-1">
            <Skeleton className="h-2 w-64" />
            <Skeleton className="h-2 w-40" />
          </div>
          <Skeleton className="my-2 h-4 w-full" />
        </div>
      </div>
    </>
  );
};

export const ViewEpisodeSkeleton = () => {
  return (
    <>
      <div className="t-0 l-0 absolute z-9996 w-screen">
        <div className="flex items-center justify-between gap-4 px-8 py-4 text-primary transition-all duration-300 ease-in-out hover:bg-black/40">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-white">
              <Skeleton className="h-6 w-96" />
            </h1>
          </div>
          <div>
            <Skeleton className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="t-0 l-0 absolute flex h-dvh w-dvw items-center justify-center">
        <Image
          src={`/imgs/loading.svg`}
          alt="loading"
          width={200}
          height={200}
          className="mx-auto w-80"
          loading="eager"
        />
      </div>
    </>
  );
};
