import { Content } from 'rsuite';
import React from 'react';
import Header from './Header';
import './page.less'

type Props = {
  children: JSX.Element | JSX.Element[],
  title?: string,
}

function Page({ children, title = '' }: Props) {
  return (
    <Content>
      <Header title={title}/>
      <Content style={{
        padding: 50,
        display: 'flex',
      }}>
        {children}
      </Content>
    </Content>
  );
}

export default Page;
