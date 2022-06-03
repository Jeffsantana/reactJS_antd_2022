import styled from 'styled-components';
import { Layout } from 'antd';

const { Sider: SiderContainer } = Layout;

export const Container = styled(SiderContainer)`
  padding-top: 100px;
  position: relative;

  /* min-width: 10%; */

  > div {
    width: 250px;
    position: relative;
  }
`;
