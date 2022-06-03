import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Label, Content } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  placeholder,
  icon: Icon,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const {
    fieldName,
    defaultValue,
    error,
    registerField,
    clearError,
  } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputBlur = useCallback((): void => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
    clearError();
  }, [clearError]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      <Label>{placeholder}</Label>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => handleInputBlur()}
        onChange={() => setIsFilled(!!inputRef.current?.value)}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      <Content>
        {Icon && !error && <Icon size={20} />}
        {!!error && <FiAlertCircle size={20} />}
      </Content>
    </Container>
  );
};

export default Input;
