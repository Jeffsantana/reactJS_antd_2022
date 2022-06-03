import React from 'react';
import { Layout } from 'antd';
import SearchBar from '../SearchBar';

import { Wrapper, Header, Content, Footer } from './styles';
import SiderDemo from '../SiderDemo';

interface Props {
  sidebar?: any;
}

const CommonLayout: React.FC<Props> = ({ children, sidebar: Sidebar }) => {
  return (
    <Layout>
      <Header>
        <SearchBar />
      </Header>
      <Layout>
        {Sidebar && <Sidebar />}
        {/* {Sidebar && <SiderDemo />} */}
        {/* <Layout> */}
        <Content>
          <Wrapper>{children}</Wrapper>
        </Content>
      </Layout>
      <Footer>
        <span>
          Created by @
          <a href="https://criatech.me"> Criatech Soluções</a>
        </span>
      </Footer>
    </Layout>
    // </Layout>
  );
};

export default CommonLayout;
