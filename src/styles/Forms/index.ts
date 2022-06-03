import styled from 'styled-components';

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 8px;
  margin-top: 10px;
  &.switch-group {
    display: flex;
    align-items: center;
  }
  > div {
    margin-top: 0px;

    & + div {
      margin-top: 0px;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    max-width: 200px;
    & + button {
      margin-left: 8px;
    }
  }
`;
