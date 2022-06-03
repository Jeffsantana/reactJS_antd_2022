/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface ButtonProps {
  size?: 'default' | 'big' | 'small' | 'medium';
  color?: 'default' | 'primary' | 'danger' | 'inherit';
  disabled?: boolean;
}

const colors = {
  inherit: css`
    background: none;
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background: ${shade(0.15, '#fff')};
    }
  `,
  default: css`
    background: ${({ theme }) => theme.colors.primary};
    color: #fff;
    &:hover {
      background: ${props => shade(0.15, props.theme.colors.primary)};
    }
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: #fff;
    &:hover {
      background: ${({ theme }) => shade(0.15, theme.colors.danger)};
    }
  `,
  primary: css`
    background: ${({ theme }) => lighten(0.6, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.primary};
    &:hover {
      background: ${({ theme }) => lighten(0.55, theme.colors.primary)};
    }
  `,
};

export const Container = styled.button<ButtonProps>`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-weight: 600;
  border: none;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  padding: 0px 12px;
  margin-top: 16px;
  text-transform: uppercase;
  transition: background-color 0.2s;
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: default;
    `}

  ${({ color }) => colors[color || 'default']}

  svg {
    color: inherit;
    font-size: 14px !important;
    margin-left: 8px;
  }
`;
