import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  padding: 16px;
`;

export const Grid = styled.div`
  width: 100%;
  margin: 0px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 24px;
`;

export const Card = styled.button`
  background: ${({ theme }) => theme.colors.sidebar};
  border: 1px solid #f1f1f1;
  background: ${darken(0.02, '#f1f1f1')};
  padding: 16px;
  border-radius: 8px;
  box-shadow: 1px 1px 20px ${({ theme }) => lighten(0.75, theme.colors.text)};
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.5s ease-in-out;

  display: flex;
  flex-direction: column;

  svg {
    font-size: 32px;
    align-self: center;
    color: inherit;
  }

  h4 {
    text-align: center;
    align-self: center;
    margin: 8px 0px;
    color: inherit;
  }

  p {
    font-size: 13px;
    opacity: 0.8;
    text-align: center;
    color: inherit;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;
