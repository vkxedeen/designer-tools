import React from 'react';
import { SelectPicker } from 'rsuite';

interface Props {
  label?: string;
  list: {
    label: string,
    value: string,
  }[];
  loading?: boolean,
  onChange: (value: string | null) => void,
}

function Selector({
  label,
  list,
  loading,
  onChange,
}: Props) {
  return (
    <SelectPicker
      label={label}
      data={list}
      loading={loading}
      onChange={onChange}
      style={{ width: '100%', margin: '20px' }}
    />
  );
}

export default Selector;
