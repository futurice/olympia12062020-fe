import styled from 'styled-components';
import React, { FC, useCallback, ChangeEvent } from 'react';

import * as colors from '../../style/colors';
import Flex from './flex';

interface Props {
  label: string;
  mandatory?: boolean;
  name: string;
  onValueChange: (value: string) => void;
  value: string;
}

const Label = styled.label`
  font-weight: bold;
`;

const TextAreaField = styled.textarea`
  background-color: ${colors.White};
  border: 1px solid ${colors.InputBorderColor};
  color: ${colors.DefaultFontColor};
  font-size: 16px;
  line-height: 120%;
  padding: 15px 11px;
  min-height: 300px;

  ::placeholder {
    color: ${colors.InputPlaceholderColor};
  }

  :focus {
    border: 1px solid ${colors.InputFocusBorderColor};
    outline: none;
  }

  :hover:not(:focus) {
    border: 1px solid ${colors.InputHoverBorderColor};
  }
`;

const Input: FC<Props> = ({ label, mandatory, name, onValueChange, value }) => {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) =>
      onValueChange(event.target.value),
    [onValueChange]
  );
  return (
    <Flex flexDirection="column">
      <Label htmlFor={name}>
        {label}
        {mandatory ? ' *' : ''}
      </Label>
      <TextAreaField
        id={name}
        name={name}
        required={mandatory}
        onChange={onChange}
        value={value}
      />
    </Flex>
  );
};

export default Input;
