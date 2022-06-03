import styled from 'styled-components';
import { animated } from 'react-spring';

export const Content = styled.div``;

export const Container = styled(animated.div)`
  width: 100%;
  height: 100vh;
  position: absolute;
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

export const PokaYoke = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 90%;
  max-width: 400px;
  margin: auto;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 1px 10px #2225;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    width: 70px;
    object-fit: contain;
  }

  h1 {
    font-weight: 300;
  }

  footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      width: calc(50% - 4px);
    }
  }
  /* overflow: hidden; */
`;
