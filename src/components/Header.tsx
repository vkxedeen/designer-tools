import { Header as HeaderComponent } from 'rsuite';
import React from 'react';

type Props = {
  title?: string,
}

function Header({ title = '' }: Props) {
  return (
    <HeaderComponent>
      <h2>{title}</h2>
    </HeaderComponent>
  );
}

export default Header;
