import styled, { css } from 'styled-components';
import { darken, transparentize, shade } from 'polished';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

export const Button = styled.button`
  background: transparent;
  border-radius: 4px;
  border: none;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 2px 5px 2px 5px;

  span {
    text-transform: none;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
    line-height: 18px;
  }

  img {
    border: 2px solid ${({ theme }) => darken(0.1, theme.colors.success)};
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  div {
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &:hover {
    background: ${({ theme }) => shade(0.1, theme.colors.background)};
  }
  @media (max-width: 640px) {
    .info {
      display: none;
    }
  }
`;

interface MenuProps {
  visible: boolean;
}

export const Menu = styled.div<MenuProps>`
  position: absolute;
  z-index: 9999999;
  background: ${({ theme }) => darken(0.3, theme.colors.menu)};
  opacity: 0.7;
  backdrop-filter: saturate(180%) blur(5px);
  width: 260px;
  right: 10px;
  top: calc(100% + 10px);
  border-radius: 5px;
  padding: 15px 0px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  transition: visibility 0s, opacity 0.5s linear;
  box-shadow: 1px 1px 3px #2225;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 8px);
    top: -8px;
    height: 0;
    width: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => darken(0.8, theme.colors.menu)};
    backdrop-filter: saturate(180%) blur(5px);
  }
`;

const colors = {
  default: css`
    color: #fff;
    svg {
      color: #fff;
    }

    &:hover {
      background: ${transparentize(0.9, '#fff')};
    }
  `,
  danger: css`
    color: ${props => darken(0, props.theme.colors.danger)};

    svg {
      color: ${props => darken(0, props.theme.colors.danger)};
    }

    &:hover {
      background: ${props => transparentize(0.9, props.theme.colors.danger)};
    }
  `,
};

interface MenuItemProps {
  textColor?: 'default' | 'danger';
}

export const MenuItem = styled.button<MenuItemProps>`
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

  ${({ textColor }) => colors[textColor || 'default']}

  svg {
    margin-right: 10px;
  }

  & + button {
    border-top: 1px solid #fff1;
  }
`;
