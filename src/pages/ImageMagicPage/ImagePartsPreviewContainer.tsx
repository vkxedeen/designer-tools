import React from 'react';
import { FlexboxGrid, Panel } from 'rsuite';
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
    <Panel collapsible shaded header=" Product images parts">
      <FlexboxGrid className="preview_container">
        {images.map((image) => (
          <div
            key={image.id}
            className={clsx('img_part_preview', selected?.id === image.id && 'selected')}
            onClick={() => {
              onImgClick(image.id)
            }}
          >
            <img
              src={`${import.meta.env.VITE_APP_IMAGE_GENERATOR_URL}${image.maskKey}`} alt={image.name}
              width="100px"
            />
            <span>{image.name}</span>
          </div>
        ))}
      </FlexboxGrid>
    </Panel>

  );
}

export default ImagePartsPreviewContainer;
