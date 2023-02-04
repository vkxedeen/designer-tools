import React from 'react';
import { Nav, Navbar } from 'rsuite';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

type Props = {
  onChange: () => void;
  isExpanded: boolean;
}

function NavigationToggle({ onChange, isExpanded }: Props) {
  return (
    <Navbar appearance="subtle" className="nav-toggle" style={{
      background: 'aliceblue',
      width: '40px',
      textAlign: 'center',
      position: 'absolute',
      height: '100%',
      left: 0,
      display: 'flex',
      alignItems: 'center',
    }}>
      <Nav style={{ height: '100%' }}>
        <Nav.Item onClick={onChange} style={{ height: '100%' }}>
          {isExpanded ? <AngleRightIcon /> : <AngleLeftIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default NavigationToggle;
