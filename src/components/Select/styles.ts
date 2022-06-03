import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  isErrored?: boolean;
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  position: relative;

  & + div {
    margin-top: 10px;
  }

  border: 1px solid ${({ theme }) => darken(0.12, theme.colors.sidebar)};

  ${props =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.danger};
    `}

  color: #6c6c80;

  input {
    border: none;
  }

  > div {
    width: 100%;
    background: transparent;

    border-color: transparent !important;

    color: ${({ theme }) => theme.colors.text};

    > div {
      background: transparent;
      border-color: transparent !important;
      padding: 12px 0px 0px 0px !important;
      padding: 4px 0;
      border: none;
      height: 100%;
      & + div {
        background: ${({ theme }) => theme.colors.background};
        height: auto;
      }
    }

    span {
      width: 0;
    }
  }


  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.colors.success};
      border-color: ${({ theme }) => theme.colors.success};
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
      color: ${({ theme }) => theme.colors.danger};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.secondary};
    `}
`;

export const Label = styled.label`
  font-size: 13px;
  margin-left: 0px;

  position: absolute;
  top: 3px;
  left: 10px;
`;

export const Content = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 100%;
  display: flex;
  flex: 1;
`;
