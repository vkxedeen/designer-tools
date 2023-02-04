import { Container } from 'rsuite';
import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[],
}

function Layout({ children }: Props) {
  return (
    <Container >
      {children}
    </Container>
  );
}

export default Layout;
