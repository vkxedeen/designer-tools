import React from 'react';
import Page from 'components/Page';
import Sidebar from 'components/Sidebar';
import { DRAWING_STAGE_SIZE } from 'constants';
import Settings from './Selectors';
import DrawingContainer from './DrawingContainer';
import ImageContainer from './ImageContainer';
import Controls from './Controls';

function ImageMagicPage() {
  return (
    <Page title="Image magic">
      <div style={{
        width: DRAWING_STAGE_SIZE,
        height: DRAWING_STAGE_SIZE,
        background: 'yellowgreen',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '50px',
      }}>
        <DrawingContainer />
        <ImageContainer />
      </div>

      <Controls />

      <Sidebar header="Print field settings">
        <Settings />
      </Sidebar>
    </Page>
  );
}

export default ImageMagicPage;
