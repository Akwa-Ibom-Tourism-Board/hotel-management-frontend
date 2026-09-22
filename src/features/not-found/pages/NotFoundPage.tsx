import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@/shared/ui";

const Wrap = styled.div`
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  gap: 1rem;
`;

const Code = styled.div`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const Message = styled.p`
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  max-width: 28rem;
`;

const NotFoundPage = () => (
  <Wrap>
    <Code>404</Code>
    <Message>The page you&apos;re looking for doesn&apos;t exist or may have moved.</Message>
    <Link to="/">
      <Button>Back to Home</Button>
    </Link>
  </Wrap>
);

export default NotFoundPage;
