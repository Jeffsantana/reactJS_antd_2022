import React, { useState, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AxiosRequestConfig, AxiosError } from 'axios';

import {
  Table,
  Menu,
  Dropdown,
  Select,
  Breadcrumb,
  Button,
  Tooltip,
  Input
} from 'antd';

import {
  HomeOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';

import defaultRoutes from '../../../../config/routes/defaultRoutes';
import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import { usePokaYoke } from '../../../../hooks/pokayoke';

import { Container, Header, BoxAction } from './styles';

import useFetch from '../../../../hooks/useFetchMemo';

const { Search } = Input
interface UserState {
  _id: string;
  active?: boolean;
  name: string;
  email: string;
  phone_number?: string;
  createdAt?: string;
  updatedAp?: string;
  _v?: number;

}
interface UserDocs {
  docs?: UserState[],
  totalDocs?: number;
  offset?: string;
  limit?: string;
  totalPages?: number;
  page?: string;
  pagingCounter?: string;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: boolean;
  nextPage?: boolean;
}
interface Params {
  search: string;
}

const Users: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { search } = useParams<Params>()
  const { data, mutate } = useFetch<UserDocs>('/user', { params: { search } });


  const { pokaYoke, closePokaYoke } = usePokaYoke();
  const { addToast } = useToast();

  const { push } = useHistory();
  const myRequest = async (url: string, options?: AxiosRequestConfig) => {

    setLoading(true);
    const res = await api(url, options);
    const usersUpdatedDocs: UserDocs = res.data
    setLoading(false);
    mutate(usersUpdatedDocs, false)
  }

  const columns = [
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'name',
      render: (active: any) => (
        <span>{!active ? <CloseOutlined /> : <CheckOutlined />}</span>
      ),
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => (
        <Button size="small" type="link">
          {name}
        </Button>
      ),
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ação',
      dataIndex: '_id',
      key: '_id',
      width: '5%',
      render: (_id: string) => {
        const MenuOptions = (
          <Menu>
            <Menu.Item
              key="0"
              onClick={() => push(`${defaultRoutes.admin}/users/${_id}`)}
            >
              <span>Editar</span>
            </Menu.Item>
            <Menu.Item danger key="1" onClick={() => preHandleDelete(_id)}>
              <span>Apagar</span>
            </Menu.Item>
          </Menu>
        );
        return (
          <BoxAction style={{ position: 'static' }}>
            <Dropdown overlay={MenuOptions} trigger={['hover']}>
              <FiMoreHorizontal
                onClick={e => {
                  e.preventDefault();
                }}
              />
            </Dropdown>
          </BoxAction>
        );
      },
    },
  ];

  const handleDeleteUser = useCallback(
    async (user_id: string) => {
      api.delete(`/user/${user_id}`);

      const usersUpdatedDocs: UserState[] = data?.docs?.filter(user => user._id !== user_id) ?? [];
      const mongooseElements = { ...data };
      mongooseElements.docs = usersUpdatedDocs;
      mongooseElements.totalDocs = mongooseElements.totalDocs ? mongooseElements.totalDocs - 1 : 0;
      const usersUpdated: UserDocs = { ...mongooseElements } ?? [];
      mutate(usersUpdated, false);
      addToast({
        type: 'success',
        title: 'Usuário removido com sucesso',
      });
      closePokaYoke();
    },
    [addToast, closePokaYoke, data, mutate],
  );

  const preHandleDelete = useCallback(
    (delete_id: string) => {
      pokaYoke({
        title: 'Você tem certeza que deseja remover este usuário?',
        callback: () => handleDeleteUser(delete_id),
        confirmButtonText: 'Apagar',
      });
    },
    [pokaYoke, handleDeleteUser],
  );

  const handleSearch = async (search: string) => {
    await myRequest('user', { params: { search } })
  };

  const handlePagination = async (page: any) => {
    await myRequest('user', { params: { page } })

  };


  return (
    <Container>
      <Header>
        <Breadcrumb
          style={{ width: '14%', background: '' }}
        >
          <Breadcrumb.Item
            href=""
            onClick={() => push(`${defaultRoutes.admin}`)}
          >
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <span>Usuários</span>
            <span> </span>
            <UserOutlined />
          </Breadcrumb.Item>
        </Breadcrumb>
        <Search
          placeholder="Pesquisar"
          style={{ padding: '0 0 0 0', width: '56%' }}
          onSearch={handleSearch}
          enterButton />

        <Tooltip title="Adicionar um novo usuário" placement="left">
          <Button
            type="primary"
            style={{ width: '14%', background: '#001529' }}
            onClick={() => push(`${defaultRoutes.admin}/user/new`)}
          >
            Adicionar
          </Button>
        </Tooltip>
      </Header>
      <Table
        dataSource={data?.docs}
        loading={!data || loading}
        columns={columns}
        style={{ padding: '0 4% 0 4%' }}
        pagination={{
          defaultCurrent: 1,
          total: data ? data.totalDocs : 0,
          defaultPageSize: 1,
          showTotal: (total: number) => { return `Total ${total} itens` },
          onChange: (page: number, pageSize?: number | undefined) => {
            handlePagination(page)

          },
          itemRender: (current, type, originalElement) => {
            return originalElement;
          },

        }}
        onRow={(record: { _id: string }) => {
          return {
            onDoubleClick: () => {
              if (record) {
                push(`${defaultRoutes.admin}/user/${record._id}`);
              }
            },
          };
        }}
      />

    </Container>
  );
};

export default Users;
