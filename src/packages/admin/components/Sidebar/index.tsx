import React, { useCallback, useState } from 'react';
import { Menu, Layout } from 'antd';
import {
  UserOutlined,
  LayoutOutlined,
  ShopOutlined,
  ToolOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { saveAs } from 'file-saver';
import api from '../../../../services/api';
const { Sider: SiderContainer } = Layout;

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
  const downloadPdf = useCallback(async () => {

    const response = await api.get(`/generate_qrcode`, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment',
      },
    })
    const objectUrl = window.URL.createObjectURL(response.data);
    window.open(objectUrl, '_blank');
    window.URL.revokeObjectURL(objectUrl);
  }, [])

  return (
    <SiderContainer
      collapsible
      draggable
      collapsed={collapsed}
      onCollapse={() => setCollapsed(!collapsed)}
      // theme="light"
      style={{
        paddingTop: '100px'
      }}
    >
      <Menu
        className="menu"
        defaultSelectedKeys={[route.toString()]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item
          key="/admin"
          onClick={() => handleNavigate('/admin')}
          icon={<LayoutOutlined />}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/admin/users"
          onClick={() => handleNavigate('/admin/users')}
          icon={<UserOutlined />}
        >
          Usuários
        </Menu.Item>

        <Menu.Item
          key="/admin/providers"
          // onClick={() => handleNavigate('/admin/providers')}
          icon={<ShopOutlined />}
        >
          Fornecedores
        </Menu.Item>
        <Menu.Item
          key="/admin/manufacturers"
          // onClick={() => handleNavigate('/admin/manufacturers')}
          icon={<ToolOutlined />}
        >
          Fabricantes
        </Menu.Item>
        <Menu.Item
          key="/admin/operators"
          // onClick={() => handleNavigate('/admin/operators')}
          icon={<SolutionOutlined />}
        >
          Operadores
        </Menu.Item>
        <Menu.Item
          key="/admin/qrcode"
          // onClick={() => downloadPdf()}
          onClick={() => history.push('/admin/qrcode')}
          icon={<SolutionOutlined />}
        >
          QrCode Download
        </Menu.Item>



      </Menu>
    </SiderContainer >
  );
};

export default Sidebar;
