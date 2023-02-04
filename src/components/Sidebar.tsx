import { Sidenav, Sidebar as SidebarComponent } from 'rsuite';
import React, { useState } from 'react';
import NavigationToggle from './NavigationToggle';

import './sidebar.less'

interface Props {
  header?: string,
  children: JSX.Element | JSX.Element[]
}

function Sidebar({
  header,
  children,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  function expandHandler() {
    setIsExpanded(!isExpanded);
  }

  return (
    <SidebarComponent
      className="sidebar_container"
      style={{ display: 'flex', flexDirection: 'column', position: 'fixed', zIndex: 1, background: 'white', right: 0, height: '100%', boxShadow: '0 0 10px rgba(0,0,0,0.5)', paddingLeft: '40px' }}
      width={isExpanded ? 720 : 38}
      collapsible
    >
      <Sidenav.Header>
        <div className='header'>
          <span>{header}</span>
        </div>
      </Sidenav.Header>
      <Sidenav expanded={isExpanded} defaultOpenKeys={['3']} appearance="subtle">
        <Sidenav.Body>
          {children}
        </Sidenav.Body>
      </Sidenav>
      <NavigationToggle isExpanded={isExpanded} onChange={expandHandler} />
    </SidebarComponent>
  )
}

export default Sidebar;