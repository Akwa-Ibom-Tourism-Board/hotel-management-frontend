import styled from "styled-components";
import { media } from "@/theme";

export const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.container.maxWidth};
  margin: 0 auto;
  padding: 0 1rem;

  ${media.sm} {
    padding: 0 2rem;
  }
`;
