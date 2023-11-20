import { ReactNode } from "react";

import "@/styles/scss/other/components/content-wrapper.scss";

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
