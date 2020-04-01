import React from 'react';
import styled from 'styled-components';

export const Select = styled.select`
  padding: 10px 15px;
  border: 1px solid #ccc;

  font-size: 1em;

  option {
    padding: 0;
    line-height: 1.2;
  }
`;

interface SelectComponentProps {
  name: string;
  id: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  values: {
    value: string;
    label: string;
  }[];
}

export const SelectComponent: React.FunctionComponent<SelectComponentProps> = ({
  name,
  id,
  handleChange,
  handleBlur,
  values,
}) => (
  <Select onChange={handleChange} onBlur={handleBlur} id={id} name={name}>
    {values.map(({ label, value }) => (
      <option value={value} key={value}>
        {label}
      </option>
    ))}
  </Select>
);
