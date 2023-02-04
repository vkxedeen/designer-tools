import React from 'react';
import Page from 'components/Page';
import Sidebar from 'components/Sidebar';
import Settings from './Selectors';
import DrawingContainer from './DrawingContainer';
import ImageContainer from './ImageContainer';

function ImageMagicPage() {
  return (
    <Page title="Image magic">
      <DrawingContainer />
      <ImageContainer />
      <Sidebar header="Print field settings">
        <Settings />
      </Sidebar>
    </Page>
  );
}

export default ImageMagicPage;
