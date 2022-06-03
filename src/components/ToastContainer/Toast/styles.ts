import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

interface ToastProps {
  type?: 'success' | 'info' | 'error';
}

const toastTypesVariants = {
  info: css`
    background: ${({ theme }) => theme.colors.menu};
    color: #fff;
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: #fff;
  `,
  error: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #fff;
  `,
};

export const Container = styled(animated.div)<ToastProps>`
  width: 360px;
  position: relative;
  padding: 16px 8px 16px 16px;
  border-radius: 10px;
  color: #fff;
  z-index: 5000000;
  /* box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2); */

  display: flex;
  align-items: center;

  ${({ type }) => toastTypesVariants[type || 'info']};

  opacity: 0.6;
  backdrop-filter: saturate(180%) blur(5px);

  > svg {
    margin: 4px 12px 0 0;
  }
  div {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }
  strong {
    color: inherit;
  }
  p {
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.8;
    line-height: 20px;
  }
  button {
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
    display: flex;
    align-items: center;
  }
  & + div {
    margin-top: 8px;
  }
`;
