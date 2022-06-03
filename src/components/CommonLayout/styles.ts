import styled from 'styled-components';
import { Layout } from 'antd';

const {
  Header: HeaderContainer,
  Content: ContentContainer,
  Footer: FooterContainer,
} = Layout;

export const Wrapper = styled.section``;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  flex-basis: 1;
  height: 100%;
  width: 100%;
  position: fixed;
`;

export const Content = styled(ContentContainer)`
  padding: 70px 0px 0px 0px;
  min-height: calc(100vh - 50px);
  margin: 0 auto;
  width: 80%;
  /* max-width: 1200px; */
`;

export const Header = styled(HeaderContainer)`
  position: fixed;
  background: #fff;
  z-index: 500;
  width: 100%;
  padding: 4px 8px;
`;

export const Footer = styled(FooterContainer)`
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
