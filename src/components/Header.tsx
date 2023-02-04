import { Header as HeaderComponent } from 'rsuite';
import React from 'react';

type Props = {
  title?: string,
}

function Header({ title = '' }: Props) {
  return (
    <HeaderComponent className="page_header">
      <h2>{title}</h2>
    </HeaderComponent>
  );
}

export default Header;
