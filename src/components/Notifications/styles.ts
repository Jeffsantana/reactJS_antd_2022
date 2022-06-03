import styled, { css } from 'styled-components';
import PerfectScroll from 'react-perfect-scrollbar';
import { lighten, darken, shade, transparentize } from 'polished';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-right: 15px; */
`;

interface BadgeProps {
  hasUnread: boolean;
}

export const Badge = styled.button<BadgeProps>`
  background: transparent;
  border: 0;
  margin-right: 16px;
  position: relative;
  padding: 4px 8px;
  border-radius: 4px;

  ${({ hasUnread }) =>
    hasUnread &&
    css`
      &::after {
        position: absolute;
        left: calc(50% + 1px);
        top: calc(50% - 15px);

        width: 8px;
        height: 8px;
        background: ${({ theme }) => theme.colors.warning};
        content: '';
        border-radius: 50%;
      }
    `}

  svg {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    background: ${({ theme }) => shade(0.1, theme.colors.background)};
  }
`;

interface NotificationListProps {
  visible: boolean;
}

export const NotificationList = styled.div<NotificationListProps>`
  position: absolute;
  background: ${({ theme }) => darken(0.3, theme.colors.menu)};
  opacity: 0.7;
  backdrop-filter: saturate(180%) blur(5px);
  width: 260px;
  z-index: 99999999999999;
  right: calc(100% - 45px);
  top: calc(100% + 10px);
  border-radius: 5px;
  padding: 8px 4px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  transition: visibility 0s, opacity 0.5s linear;

  &::before {
    content: '';
    position: absolute;
    right: calc(10% - 8px);
    top: -8px;
    height: 0;
    width: 0;
    border-left: 8px solid transparent;

    border-right: 8px solid transparent;
    border-bottom: 8px solid ${({ theme }) => darken(0.8, theme.colors.menu)};
    backdrop-filter: saturate(180%) blur(5px);
  }
`;

export const Scroll = styled(PerfectScroll)`
  max-height: 260px;
  padding: 5px 15px;
`;

interface NotificationProps {
  unread?: boolean;
}

export const Notification = styled.div<NotificationProps>`
  color: ${({ theme }) => lighten(0.5, theme.colors.text)};

  & + div {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid
      ${({ theme }) => transparentize(0.8, theme.colors.text)};
  }

  p {
    font-size: 12px;
    line-height: 16px;
    margin: 0 8px;
  }

  time {
    font-size: 10px;
    opacity: 0.6;
    margin: 0 10px;
  }

  button {
    font-size: 10px;
    border: 0;
    background: none;
    color: ${({ theme }) => lighten(0.3, theme.colors.primary)};
    padding: 0 5px;
    margin: 0 5px;
    ${({ unread }) =>
      unread &&
      css`
        &::after {
          content: '';
          margin-left: 5px;
          display: inline-block;
          width: 8px;
          height: 8px;
          background: ${({ theme }) => theme.colors.warning};
          border-radius: 50%;
        }
      `}
  }
`;
