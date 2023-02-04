import React, { useEffect, useRef, useState } from 'react';
import { useStores } from 'hooks';
import { observer } from 'mobx-react-lite';
import { Content } from 'rsuite';

import './drawing_container.styles.less';

const MAX_IMG_SIZE = 840;

function getScale(size: number): number {
  return MAX_IMG_SIZE >= size ? 1 : MAX_IMG_SIZE / size;
}

function DrawingContainer() {
  const { productStore } = useStores();
  const imageEntity = productStore.activeProduct?.imageStore.activeImage?.imagePartStore.activePart;
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageSize, setImageSize] = useState<number | null>(null);

  useEffect(() => {
    if (imageEntity) {
      const img = document.createElement('img');

      img.onload = () => {
        const scale = getScale(img.width);
        imageEntity.setCurrentScale(scale);
        setImageSize(img.width * scale);
        setImageLoaded(true);
      };

      img.src = `${import.meta.env.VITE_APP_IMAGE_GENERATOR_URL}${imageEntity?.maskKey}`;
    }

  }, [imageEntity]);

  return (
    <Content className="image_layout">
      {imageEntity && imageLoaded && (
        <img
          src={`${import.meta.env.VITE_APP_IMAGE_GENERATOR_URL}${imageEntity?.maskKey}`}
          width={`${imageSize}px`}
        />
      )}
    </Content>
  );
}

export default observer(DrawingContainer);
