import type { ReactNode } from "react";
import styled from "styled-components";
import { media } from "@/theme";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Must clear both fixed bars stacked above (TopBar + Navbar).
const Main = styled.main`
  padding-top: 7.5rem;

  ${media.sm} {
    padding-top: 7.75rem;
  }
`;

const PageShell = ({ children }: { children: ReactNode }) => (
  <>
    <TopBar />
    <Navbar />
    <Main>{children}</Main>
    <Footer />
  </>
);

export default PageShell;
