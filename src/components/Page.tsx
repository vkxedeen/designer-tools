import { Container, Content } from 'rsuite';
import React from 'react';
import Header from './Header';

type Props = {
  children: JSX.Element | JSX.Element[],
  title?: string,
}

function Page({ children, title = '' }: Props) {
  return (
    <Container>
      <Header title={title} />
      <Content style={{
        padding: 50,
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {children}
      </Content>
    </Container>
  );
}

export default Page;
