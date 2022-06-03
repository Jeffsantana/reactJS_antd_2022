import styled from 'styled-components';

export const Menu = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.colors.background};
  opacity: 0.8;
  backdrop-filter: saturate(180%) blur(5px);
  opacity: 0.8;
  backdrop-filter: saturate(180%) blur(5px);
  width: 260px;
  right: 10px;
  top: calc(100% + 30px);
  border-radius: 5px;
  padding: 15px 0px;
  display: block;
  transition: visibility 0s, opacity 0.5s linear;
  box-shadow: 1px 1px 3px #2225;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    height: 0;
    width: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid ${({ theme }) => theme.colors.sidebar};
  }
`;

export const MenuItem = styled.button.attrs({
  type: 'button',
})`
  background: none;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background: none;
  border: none;
  padding: 10px 15px;
  border-radius: 0px;
  text-transform: none;
  font-weight: 500px;
  font-size: 15px;

  svg {
    margin-right: 10px;
  }

  & + button {
    border-top: 1px solid #fff1;
  }
`;
