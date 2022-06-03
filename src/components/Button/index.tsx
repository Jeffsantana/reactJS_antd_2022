import React, { ButtonHTMLAttributes } from 'react';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  size?: 'default' | 'big' | 'small' | 'medium';
  color?: 'default' | 'primary' | 'danger' | 'inherit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  color,
  size,
  ...rest
}) => {
  return (
    <Container color={color} size={size} type="button" {...rest}>
      {loading && <CircularProgress size={16} />}
      {!loading && children}
    </Container>
  );
};

export default Button;
