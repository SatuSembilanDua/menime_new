"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const IframePlayer = (props: React.ComponentProps<"iframe">) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoad = () => {
    console.log("frame loading");
    setIsLoading(false);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {isLoading && (
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
      )}
      <iframe {...props} onLoad={handleLoad}></iframe>
    </>
  );
};

export default IframePlayer;
