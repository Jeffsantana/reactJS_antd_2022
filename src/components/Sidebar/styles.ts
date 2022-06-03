import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider: SiderContainer } = Layout;

export const Container = styled(SiderContainer)`
  padding-top: 60px;
  position: relative;

  > div {
    width: 200px;
    position: fixed;
  }
`;
