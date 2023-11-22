import { ReactNode } from "react";

import "@/styles/scss/other/components/content-wrapper.scss";

type Props = {
  children: ReactNode;
  className?: string;
};

const ContentWrapper = ({ children, className }: Props) => {
  return <div className={"contentWrapper " + className}>{children}</div>;
};

export default ContentWrapper;
