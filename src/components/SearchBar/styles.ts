import styled, { css } from 'styled-components';
import PerfectScroll from 'react-perfect-scrollbar';
import { darken, lighten, transparentize } from 'polished';

export const Container = styled.div`
  /* position: fixed; */
  max-width: 100vw;
  height: 60px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    > img {
      width: 50px;
      height: 50px;
      margin-left: 8px;
    }
  }

  @media (max-width: 640px) {
    .menu-button {
      display: flex;
    }
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  padding: 8px;
  background: transparent;
  height: 99%;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    font-size: 14px;
  }
`;

export const SearchContent = styled.form`
  position: relative;
  display: flex;
  width: 50%;
  overflow: visible;
  background: ${({ theme }) => darken(0.03, theme.colors.sidebar)};
  padding: 4px;
  margin-left: 16px;
  align-items: center;
  border-radius: 4px;
  > svg {
    margin-left: 8px;
    font-size: 24px;
  }
`;

export const Buttons = styled.div`
  display: flex;

  button {
    max-height: 50px;
  }
`;

interface SearchListProps {
  visible: boolean;
}

export const SearchList = styled.div<SearchListProps>`
  position: absolute;
  background: ${({ theme }) => darken(0.3, theme.colors.menu)};
  opacity: 0.8;
  backdrop-filter: saturate(180%) blur(5px);
  width: 100%;
  z-index: 555555;
  right: calc(50% - 50%);
  top: calc(100% + 20px);
  border-radius: 5px;
  padding: 8px 4px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  transition: visibility 0s, opacity 0.5s linear;

  &::before {
    content: '';
    position: absolute;
    right: calc(50% - 8px);
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
  padding: 4px 8px;
`;

interface SearchItemProps {
  unread?: boolean;
}

export const SearchItem = styled.div<SearchItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => lighten(0.6, theme.colors.text)};

  & + div {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid
      ${({ theme }) => transparentize(0.8, theme.colors.text)};
  }

  time {
    font-size: 10px;
    opacity: 0.6;
    margin: 0 10px;
  }

  button {
    padding: 4px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    border: 0;
    border-radius: 8px;
    color: ${({ theme }) => lighten(0.3, theme.colors.primary)};
    background: none;

    svg {
      margin-left: 8px;
    }
  }
`;

interface BadgeProps {
  color: 'aircraft' | 'equipment_model';
}

const colors = {
  aircraft: css`
    color: ${({ theme }) => lighten(0, theme.colors.success)};
  `,
  equipment_model: css`
    color: ${({ theme }) => lighten(0, theme.colors.warning)};
  `,
  default: css`
    color: ${({ theme }) => darken(0.1, theme.colors.text)};
  `,
};

export const Bagde = styled.span<BadgeProps>`
  padding: 4px 16px;
  border-radius: 4px;
  margin-left: 16px;
  font-size: 11px;

  ${({ color }) => colors[color || 'default']}
`;
export const ResultsContainer = styled.div`
  position: absolute;
  z-index: 100;
  padding: 20px;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  border: 1px solid #eee;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  top: 100%;
  left: 0px;
  background-color: #eee;
  box-shadow: 0px 0px 3px lightgrey;
  background-color: white;
  .see-more {
    display: flex;
    justify-content: flex-end;
  }
`;

export const ResultCard = styled.div`
  min-height: 80px;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 3px lightgrey;
`;

export const ResultTitle = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #073da6;
  text-decoration: underline;
`;

export const ResultContent = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
`;

export const ResultTitleInfo = styled.p`
  font-size: 10px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const ResultContentInfo = styled.p`
  font-size: 12px;
  margin-bottom: 10px;
`;
export const NotFound = styled.div`
  font-size: 12px;
  text-align: center;
  color: gray;
`;
