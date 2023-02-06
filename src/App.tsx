import React from 'react';
import Layout from './Layout';
import ImageMagicPage from './pages/ImageMagicPage/ImageMagicPage';
import 'rsuite/dist/rsuite.min.css';
import './index.less'


function App() {
  return (
    <Layout>
      <ImageMagicPage />
    </Layout>
  );
}

export default App;
