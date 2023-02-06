import React from 'react';
import Selector from 'components/Selector';
import { DesignEntity } from '../../features/design/design.module';
import { PrintFieldEntity } from '../../features/print-field/print-field.module';

import './styles.less';

interface Props {
  design: DesignEntity,
  printFields: PrintFieldEntity[];
  onSelectPrintField: ({ printFieldId, designId }: { designId: string, printFieldId: string | null }) => void;
  boundedPrintFieldId?: string,
}

function PrintFieldDesignLinkView({
  design,
  printFields,
  onSelectPrintField,
  boundedPrintFieldId,
}: Props) {
  function onSelectHandler(printFieldId: string | null) {
    if (printFieldId) {
      onSelectPrintField({
        printFieldId,
        designId: design.id,
      })
    }
  }

  return (
    <div
      key={design.id}
      style={{
        margin: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100px',
      }}
    >
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundImage: `url(${import.meta.env.VITE_APP_IMAGE_GENERATOR_URL}${design.uploadKey})`,
          backgroundSize: 'cover',
          border: '1px solid grey',
        }}
      >
      </div>
      <Selector
        value={boundedPrintFieldId}
        list={printFields.map(({ id, name }) => ({ value: id, label: name }))}
        onChange={onSelectHandler}
      />
    </div>
  );
}

export default PrintFieldDesignLinkView;
