import React, { useRef, useEffect, useCallback, useState } from 'react';
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { Container, Label } from './styles';

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  customStyle?: any;
}

const Select: React.FC<Props> = ({
  name,
  placeholder,
  customStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const selectRef = useRef(null);
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name);

  const handleInputFill = useCallback((): void => {
    setIsFilled(true);
    clearError();
  }, [clearError]);

  const handleInputFocus = useCallback((): void => {
    setIsFocused(true);
    clearError();
  }, [clearError]);

  const handleInputBlur = useCallback((): void => {
    setIsFocused(false);
    // setIsFilled(!!selectRef.current?.select.value);
    clearError();
  }, [clearError]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value) {
            return [];
          }
          return ref.state.value.map((option: OptionTypeBase) => option.value);
        }
        if (!ref.state.value) {
          return '';
        }
        return ref.state.value.value;
      },
      setValue: (ref: any, value: any) => {
        ref.select.setValue(value);
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  return (
    <Container
      style={customStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
    >
      <Label>{placeholder}</Label>
      <ReactSelect
        defaultValue={defaultValue}
        ref={selectRef}
        onBlur={handleInputBlur}
        onChange={handleInputFill}
        onFocus={handleInputFocus}
        classNamePrefix="react-select"
        {...rest}
      />
    </Container>
  );
};

export default Select;
