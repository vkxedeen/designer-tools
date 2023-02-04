import React, { useEffect } from 'react';
import { Col, Content, Grid, Row } from 'rsuite';
import { useStores } from 'hooks';
import { observer } from 'mobx-react-lite';
import Selector from 'components/Selector';
import ImagePartsPreviewContainer from './ImagePartsPreviewContainer';

import './styles.less';

function Selectors() {
  const { productStore } = useStores();
  const { isFetching, products, activeProduct } = productStore;

  const activeImage = activeProduct?.imageStore.activeImage;
  const activeImagePart = activeImage?.imagePartStore.activePart;


  useEffect(() => {
    productStore.fetch();
  }, []);

  useEffect(() => {
    if (activeProduct) {
      activeProduct.fetchImages();
    }
  }, [activeProduct]);

  useEffect(() => {
    if (activeImage) {
      activeImage.fetchParts();
    }
  }, [activeImage]);

  return (
    <Content>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Selector
              loading={isFetching}
              label="Product"
              list={products.map(({ id, name }) => ({ label: name, value: id }))}
              onChange={productStore.setActive}
            />
          </Col>
        </Row>
        {activeProduct && (
          <Row>
            <Col xs={8}>
              <Selector
                loading={activeProduct.imageStore.isFetching}
                label="Product image"
                list={activeProduct.imageStore.list.map(({ id, name }) => ({ label: name, value: id }))}
                onChange={activeProduct.imageStore.setActive}
              />
            </Col>
          </Row>
        )}
        {activeImage && (
          <ImagePartsPreviewContainer
            images={activeImage.imagePartStore.list}
            onImgClick={activeImage.imagePartStore.setActive}
            selected={activeImagePart}
          />
        )}
      </Grid>
    </Content>
  );
}

export default observer(Selectors);
