import Link from "next/link";

const ButtonDiv = ({ children }: { children: React.ReactNode }) => {
  return <div className="rounded-full p-2 transition-all duration-300 ease-in-out hover:bg-white/30">{children}</div>;
};

const LinkButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  return (
    <>
      <Link href={href} className="linking">
        <ButtonDiv>{children}</ButtonDiv>
      </Link>
    </>
  );
};

export default LinkButton;
