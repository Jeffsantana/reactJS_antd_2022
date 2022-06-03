import React, { useCallback, useState } from 'react';
import { Menu, Button } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LayoutOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Container } from './styles';

const { SubMenu } = Menu;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [route, setRoute] = useState(window.location.pathname);
  const history = useHistory();

  const handleNavigate = useCallback(
    (path: string) => {
      setRoute(path);
      history.push(path);
    },
    [history],
  );

  return (
    <Container
      collapsible
      draggable
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
    >
      <Menu
        className="menu"
        theme="dark"
        defaultSelectedKeys={[route.toString()]}
        mode="inline"
      >
        <Menu.Item
          key="/dashboard"
          onClick={() => handleNavigate('/dashboard')}
          icon={<LayoutOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/settings"
          onClick={() => handleNavigate('/settings')}
          icon={<FolderOpenOutlined />}
        >
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3" icon={<UserOutlined />}>
            Tom
          </Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </Container>
  );
};

export default Sidebar;
