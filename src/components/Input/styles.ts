/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled, { css } from 'styled-components';
import { darken } from 'polished';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  padding: 0px 0px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 5px;

  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;

  position: relative;

  border: 1px solid ${({ theme }) => darken(0.12, theme.colors.sidebar)};
  color: #6c6c80;

  & + div {
    margin-top: 10px;
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


  input {
    flex: 1;
    padding: 24px 6px 6px 6px;
    max-height: 50px;
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
  }

  svg{
    &:not(:last-child) {
      margin-right: 10px;
    }

    &:not(:first-child) {
      margin-left: 10px;
    }
  }
`;

export const Label = styled.label`
  font-size: 13px;
  margin-left: 0px;
  position: absolute;
  top: 6px;
  left: 6px;
`;

export const Content = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 0px;
  top: 0px;
  width: 40px;
  height: 100%;
  display: flex;
  flex: 1;
`;
