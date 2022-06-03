import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 2em;
    padding: 1em;
  }

  > div {
    display: flex;
    /* padding:24px; */
    justify-content: center;
    height: 350px;
    width: 50%;

    button {
      cursor: pointer;
      border: 1px solid #fff;
      border-radius: 8px;
      display: flex;
      background-color: white;
      width: 40%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition-duration: 0.4s;
      padding: 12px;

      p {
        font-size: 12px;
      }
      :hover {
        transform: scale(1.1, 1.1);
        border: 1px solid ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;
