import React, { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Content,
  FlexboxGrid,
  Grid,
  InputNumber,
  Row,
} from 'rsuite';
import { useStores } from 'hooks';
import { observer } from 'mobx-react-lite';
import Selector from 'components/Selector';
import ImagePartsPreviewContainer from './ImagePartsPreviewContainer';
import MapDesignContainer from './MapDesignContainer';

import './styles.less';

function Selectors() {
  const { productStore } = useStores();
  const { isFetching, products, activeProduct } = productStore;

  const [colCount, setColCount] = useState<number>(1);
  const [rowCount, setRowCount] = useState<number>(1);

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

        {activeImage?.imagePartStore.activePart && (
          <FlexboxGrid
            style={{ marginTop: '30px', gap: '20px' }}
          >
            <div style={{ width: '100%' }}>
              Create print field grid
            </div>
            <div>
              <label>Columns</label>
              <InputNumber
                onChange={(value) => setColCount(Number(value))}
                value={colCount}
                style={{ width: '200px' }}
                step={1}
              />
            </div>
            <div>
              <label>Rows:</label>
              <InputNumber
                onChange={(value) => setRowCount(Number(value))}
                defaultValue={rowCount}
                style={{ width: '200px' }}
                step={1}
              />
            </div>
            <Button
              style={{ alignSelf: 'end' }}
              onClick={() => {
                if (activeImage.imagePartStore.activePart) {
                  activeImage.imagePartStore.activePart.createNewGrid({ colCount, rowCount })
                }
              }}
            >
              Create
            </Button>
          </FlexboxGrid>
        )}
        <MapDesignContainer />
      </Grid>
    </Content>
  );
}

export default observer(Selectors);
