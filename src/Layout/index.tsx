import { Container, Content, Header } from 'rsuite';
import Sidebar from './Sidebar';
import React from 'react';

type Props = {
  children: JSX.Element | JSX.Element[],
}

function Layout({children}: Props) {
  return (
    <div>
      <div className="show-fake-browser sidebar-page">
        <Container>
          <Sidebar />
          <Container>
            <Header>
              <h2>Page Title</h2>
            </Header>
            <Content style={{
              padding: 50,
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              {children}
            </Content>
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default Layout;
