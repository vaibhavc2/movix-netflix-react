import ContentWrapper from "@/components/ContentWrapper";
import { BASE_TITLE } from "@/constants";
import useDocumentTitle from "@/hooks/useDocumentTitle";

import "@/styles/scss/other/pages/page-not-found.scss";
import { memo } from "react";
import RootLayout from "../layouts/RootLayout";

const PageNotFound = () => {
  useDocumentTitle(BASE_TITLE + " | 404");
  return (
    <div className="flex h-screen flex-col justify-between">
      <RootLayout>
        <div className="pageNotFound m-8 flex h-[90vh] flex-col items-center justify-center text-center font-mono">
          <ContentWrapper>
            <div className="bigText">Error: 404</div>
            <div className="smallText">Page Not Found!</div>
          </ContentWrapper>
        </div>
      </RootLayout>
    </div>
  );
};

export default memo(PageNotFound);
