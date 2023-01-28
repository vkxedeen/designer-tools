import React, { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';
import { Button } from 'rsuite';
import { PositionableContainer, Position } from 're-position';
import Layout from './Layout';

function App() {
  const [isLayoutVisible, setIsLayoutVisible] = useState(false);

  const position = {
    left: '37.5%',
    top: '37.5%',
    width: '100px',
    height: '100px',
    rotation: '30deg',
  };

  function handleUpdate(position: Position) {
    console.log(position);
  }

  return (
    <Layout>
      <div
        className="img_container"
        style={{
          padding: 50,
          position: 'relative',
          background: 'darkgray',
          flex: 8,
        }}
      >
        <img
          src="/src/assets/pamela.png"
          draggable={false}
          alt="pamela.png"
        />
        {isLayoutVisible && (
          <PositionableContainer
            className="container"
            movable
            resizable
            rotatable
            position={position}
            disabled
            onUpdate={handleUpdate}
            style={{
              width: 200,
              height: 200,
              position: 'absolute',
              top: 'calc(50% - 100px)',
              left: 'calc(50% - 100px)',
              border: '1px solid grey',
            }}
          >
          </PositionableContainer>
        )}
      </div>

      <div className="settings" style={{ flex: 4, padding: 20 }}>
        <Button onClick={() => setIsLayoutVisible(!isLayoutVisible)}>
          Add layout
        </Button>
      </div>

    </Layout>
  );
}

export default App;
