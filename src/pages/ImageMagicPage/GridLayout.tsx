import React from 'react';
import { Button } from 'rsuite';
import { useStores } from 'hooks';
import { observer } from 'mobx-react-lite';
import ImageContainer from './ImageContainer';

function GridLayout() {
  const { printFieldStore, productStore } = useStores();

  return (
    <>
      <div
        className="img_container"
        style={{
          position: 'relative',
          background: 'darkgray',
          flex: 8,
        }}
      >
       <ImageContainer />
      </div>

      <div className="settings" style={{ flex: 4, padding: 20 }}>
        <Button onClick={() => productStore.fetch()}>
          Products fetch
        </Button>

        <Button onClick={() => printFieldStore.fetch()}>
          Print fields fetch
        </Button>

        <Button onClick={() => printFieldStore.create()}>
          Add Print field
        </Button>

        <Button onClick={() => printFieldStore.printFields[0].delete()}>
          Delete Print field
        </Button>

        <Button onClick={() => {
          // printFields.setGridSize({ colCount: 2, rowCount: 2 });
          // printFields.initNodes();
        }}>
          Add grid 2x2
        </Button>

      </div>
    </>
  );
}

export default observer(GridLayout);
