import React from 'react';
import { FlexboxGrid } from 'rsuite';
import { ImagePartEntity } from 'features/image-part/image-part.module';

import './styles.less';
import clsx from 'clsx';

interface Props {
  images: ImagePartEntity[];
  selected?: ImagePartEntity;
  onImgClick: (id: string | null) => void;
}

function ImagePartsPreviewContainer({ images, onImgClick, selected }: Props) {
  return (
    <FlexboxGrid className="preview_container">
      <div className="preview_header">
        Product images parts
      </div>
      {images.map((image) => (
        <div
          key={image.id}
          className={clsx('img_part_preview', selected?.id === image.id && 'selected')}
          onClick={() => onImgClick(image.id)}
        >
          <img
            src={`${import.meta.env.VITE_APP_IMAGE_GENERATOR_URL}${image.maskKey}`} alt={image.name}
            width="100px"
          />
        </div>
      ))}
    </FlexboxGrid>
  );
}

export default ImagePartsPreviewContainer;
