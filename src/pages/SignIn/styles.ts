/* eslint-disable @typescript-eslint/explicit-function-return-type */
import styled from 'styled-components';
import { shade } from 'polished';
// import bg from '../../assets/aircraft_background.jpg';
import bg from '../../assets/qr-code-background-24299765.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0px;
    width: 95%;
    max-width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: ${({ theme }) => theme.colors.text};
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${({ theme }) => shade(0.2, theme.colors.primary)};
      }
    }
  }

  > a {
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${({ theme }) => shade(0.2, theme.colors.primary)};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  height: 100%;
  background: url(${bg}) no-repeat center;
  background-size: cover;
  background-position: right;
`;
