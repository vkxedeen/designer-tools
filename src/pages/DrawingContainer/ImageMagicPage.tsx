import React from 'react';
import Page from 'components/Page';
import Sidebar from 'components/Sidebar';
import Settings from './Selectors';
import ImageContainer from './ImageContainer';

function ImageMagicPage() {
  return (
    <Page title="Image magic">
      <ImageContainer />
      <Sidebar header="Print field settings">
        <Settings />
      </Sidebar>
    </Page>
  );
}

export default ImageMagicPage;
