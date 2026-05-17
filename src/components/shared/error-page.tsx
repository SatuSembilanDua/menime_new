import Image from "next/image";

const ErrorPage = () => {
  return (
    <>
      <div className="container mx-auto flex min-h-screen flex-col items-center px-6 py-12">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mx-auto flex max-w-sm flex-col items-center text-center">
            <Image width={300} height={279} src={`/imgs/choppersad.png`} alt="Error" priority loading="eager" />
          </div>
          <h1 className="mt-3 text-2xl font-semibold text-primary md:text-3xl">{`Something's went wrong!`}</h1>
          <p className="text-secondary-foreground mt-4">
            We apologize for the error that occurred while loading the content. Please refresh the page.
          </p>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
