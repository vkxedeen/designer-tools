import React from 'react';
import { Button, FlexboxGrid } from 'rsuite';
import { observer } from 'mobx-react-lite';
import { useStores } from 'hooks';

function Controls() {
  const { productStore } = useStores();

  const currentImgPart = productStore.activeProduct?.imageStore.activeImage?.imagePartStore.activePart;

  if (!currentImgPart) {
    return null;
  }

  return (
    <FlexboxGrid>
      <Button onClick={() => currentImgPart.update()}>
        Save print field
      </Button>
      <Button>
        Image processing
      </Button>
    </FlexboxGrid>
  );
}

export default observer(Controls);
