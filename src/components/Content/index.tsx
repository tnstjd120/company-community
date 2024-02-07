import { ReactNode } from "react";
import { ContentContainer } from "./styles";

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return <ContentContainer>{children}</ContentContainer>;
};

export default Content;
