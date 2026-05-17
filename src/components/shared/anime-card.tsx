import { AnimeType } from "@/server/anime";
import Link from "next/link";
import { PiFilmStripBold } from "react-icons/pi";
import { SiGradleplaypublisher } from "react-icons/si";
import LazyImage from "./lazy-image";

const AnimeCard = ({ data }: { data: AnimeType }) => {
  return (
    <>
      <div className="group">
        <div className="relative h-[40vw] overflow-hidden rounded-xl md:h-[15vw]">
          <Link href={`/anime/${data.linkAnime}`} className="linking">
            <LazyImage
              // fallbackSrc={data.gambar}
              // src={data.img}
              fallbackSrc={data.img}
              src={data.gambar}
              width={126}
              height={196}
              alt={data.idAnime}
              className="aspect-9/16 h-full min-w-full transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:blur-sm"
            />
            <div className="absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-black/50 text-white transition-all duration-1000 ease-in-out group-hover:flex">
              <SiGradleplaypublisher size={80} />
            </div>
            {data.sts == 0 && (
              <div className="absolute top-0 left-0 bg-primary px-2 py-1 text-xs text-white">ONGOING</div>
            )}
            <div className="absolute right-0 -bottom-30 left-0 p-1.5 transition-all duration-250 ease-in-out group-hover:bottom-0">
              <p className="text-md text-white">{data.judulAnime}</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-start overflow-hidden text-ellipsis whitespace-nowrap text-primary md:hidden">
          <div className="mr-1">
            <PiFilmStripBold width={18} height={18} />
          </div>
          <div>
            <Link href={`/anime/${data.linkAnime}`} aria-label={data.judulAnime}>
              <p className="text-md text-white">{data.judulAnime}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeCard;
