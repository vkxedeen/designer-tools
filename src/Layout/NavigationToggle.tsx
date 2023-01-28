import React from 'react';
import { Nav, Navbar } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import AngleLeftIcon from '@rsuite/icons/legacy/AngleLeft';
import AngleRightIcon from '@rsuite/icons/legacy/AngleRight';

type Props = {
  onChange: () => void;
  isExpanded: boolean;
}

function NavigationToggle({ onChange, isExpanded }: Props) {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav>
        <Nav.Menu
          noCaret
          placement="topStart"
          trigger="click"
          title={<CogIcon style={{ width: 20, height: 20 }} />}
        >
          <Nav.Item>Help</Nav.Item>
          <Nav.Item>Settings</Nav.Item>
          <Nav.Item>Sign out</Nav.Item>
        </Nav.Menu>
      </Nav>

      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
          {isExpanded ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
}

export default NavigationToggle;
