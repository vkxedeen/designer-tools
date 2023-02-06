import React, { useEffect, useState } from 'react';
import { useStores } from 'hooks';
import { observer } from 'mobx-react-lite';

import './drawing_container.styles.less';
import { IMAGE_MAX_SIZE } from '../../constants';

function getScale(size: number): number {
  return IMAGE_MAX_SIZE >= size ? 1 : IMAGE_MAX_SIZE / size;
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
    <div className="image_layout">
      {imageEntity && imageLoaded && (
        <img
          src={`${import.meta.env.VITE_APP_IMAGE_GENERATOR_URL}${imageEntity?.maskKey}`}
          width={`${imageSize}px`}
          alt={imageEntity?.name}
        />
      )}
    </div>
  );
}

export default observer(DrawingContainer);
