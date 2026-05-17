const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h1 className="-mx-4 my-5 border-l-4 border-primary pl-5 text-xl">{children}</h1>
    </>
  );
};

export default PageTitle;
