import { AnimesSkeleton } from "@/components/shared/skeletons";
import HomePage from "@/components/ui/home-page";
import { Suspense } from "react";

const Home = () => {
  return (
    <>
      <Suspense fallback={<AnimesSkeleton />}>
        <HomePage />
      </Suspense>
    </>
  );
};

export default Home;
