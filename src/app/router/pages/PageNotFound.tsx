import ContentWrapper from "@/components/ContentWrapper";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import "@/styles/scss/other/pages/page-not-found.scss";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <Header />
      <div className="pageNotFound m-8 flex h-[90vh] flex-col items-center justify-center text-center font-mono">
        <ContentWrapper>
          <div className="bigText">Error: 404</div>
          <div className="smallText">Page Not Found!</div>
        </ContentWrapper>
      </div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
