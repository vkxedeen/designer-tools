import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FlexboxGrid, Loader, Panel } from 'rsuite';
import { useStores } from 'hooks';
import PrintFieldDesignLinkView from './PrintFieldDesignLinkView';

import './styles.less';

function MapDesignContainer() {
  const { printFieldDesignStore, printFieldStore, designStore } = useStores();
  const { designs } = designStore;
  const { printFields } = printFieldStore;
  const { printFieldDesigns } = printFieldDesignStore;

  const isFetching = printFieldStore.isFetching || designStore.isFetching || printFieldDesignStore.isFetching;

  useEffect(() => {
    printFieldStore.fetch();
    designStore.fetch();
    printFieldDesignStore.fetch();
  }, []);

  function getPrintFieldId(designId: string): string | undefined {
    const foundLink = printFieldDesigns.find((link) => designId === link.designId);
    return foundLink?.printFieldId;
  }

  function bindPrintFieldDesign({ printFieldId, designId }: { designId: string, printFieldId: string | null }) {
    if (printFieldId) {
      printFieldDesignStore.postLink({
        designId,
        printFieldId,
      });
    }
  }

  return (
    <>
      {isFetching && <Loader />}
      <Panel header="Map design to print fields" collapsible shaded style={{ marginTop: 50 }}>
        <FlexboxGrid className="preview_container">
          {designs.map((design) => (
            <PrintFieldDesignLinkView
              key={design.id}
              design={design}
              printFields={printFields}
              onSelectPrintField={bindPrintFieldDesign}
              boundedPrintFieldId={getPrintFieldId(design.id)}
            />
          ))}
        </FlexboxGrid>
      </Panel>
    </>
  );
}

export default observer(MapDesignContainer);
