import FooterPage from "@/components/shared/footer-page";
import HeaderPage from "@/components/shared/header-page";
import ProgressBar from "@/components/shared/progress-bar";
import { Suspense } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Suspense>
        <ProgressBar />
      </Suspense>
      <HeaderPage />
      <div className="relative min-h-135 px-5 py-12 md:px-12">{children}</div>
      <FooterPage />
    </>
  );
};

export default MainLayout;
