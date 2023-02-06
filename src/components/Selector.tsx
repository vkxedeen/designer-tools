import React from 'react';
import { SelectPicker } from 'rsuite';

interface Props {
  label?: string;
  list: {
    label: string,
    value: string,
  }[];
  loading?: boolean,
  onChange?: (value: string | null) => void,
  value?: string,
}

function Selector({
  label,
  list,
  loading,
  onChange,
  value
}: Props) {
  return (
    <SelectPicker
      value={value}
      label={label}
      data={list}
      loading={loading}
      onChange={onChange}
      style={{ width: '100%', margin: '20px 0'}}
      size="lg"
    />
  );
}

export default Selector;
