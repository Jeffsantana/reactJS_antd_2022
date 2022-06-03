import styled from 'styled-components';
import { animated } from 'react-spring';
import { shade } from 'polished';

export const Modal = styled(animated.div)`
  width: 100%;
  height: 100vh;
  padding: 16px;
  position: absolute;
  overflow: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: saturate(180%) blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div``;

export const ModalContent = styled.div`
  width: 80%;

  margin: auto;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  box-shadow: 1px 1px 10px #2225;
  /* overflow: hidden; */

  section {
    padding: 16px;
    /* max-height: 80vh; */
    margin: 0 !important;
    flex-direction: column;

    form {
      width: 100%;

      > button {
        max-width: 180px;
        margin-top: 16px auto;
      }
    }
  }
`;

export const ModalHeader = styled.header`
  padding: 8px 16px 8px 20px;
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.sidebar}; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    display: flex;
    padding: 4px;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    transition: color 0.5s;

    &:hover {
      background: ${({ theme }) => shade(0.1, theme.colors.background)};
    }
  }
  h3 {
    display: flex;
    align-items: center;
    svg{
      margin-right: 10px;
    }
  }
`;
