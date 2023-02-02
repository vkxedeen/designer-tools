import { Container } from 'rsuite';
import Sidebar from './Sidebar';
import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[],
}

function Layout({ children }: Props) {
  return (
    <Container>
      <Sidebar />
      {children}
    </Container>
  );
}

export default Layout;
