import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { HomeOutlined, ShopOutlined } from '@ant-design/icons';
import { FiCheck, FiX, FiMoreHorizontal } from 'react-icons/fi';

import { Table, Menu, Dropdown, Select, Button, Breadcrumb } from 'antd';

import api from '../../../../services/api';
import { useToast } from '../../../../hooks/toast';
import { usePokaYoke } from '../../../../hooks/pokayoke';

import { Container, Header, BoxAction } from './styles';
import defaultRoutes from '../../../../config/routes/defaultRoutes';
import useFetch from '../../../../hooks/useFetchMemo';

const { Option } = Select;

interface ProviderState {
  id: string;
  active?: boolean;
  name: string;
  contact: string;
  phone: string;
  register: string;
}

const Providers: React.FC = () => {
  const { data, mutate } = useFetch<ProviderState[]>('/suppliers');
  const [pageSize, setPageSize] = useState<number>(10);

  const { addToast } = useToast();
  const { pokaYoke, closePokaYoke } = usePokaYoke();

  const history = useHistory();

  const columns = [
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'active',
      render: (active: any) => (
        <span>
          {!active ? <FiX color="#e74a3b" /> : <FiCheck color="#0ec778" />}
        </span>
      ),
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Documento',
      dataIndex: 'register',
      key: 'register',
    },
    {
      title: 'Contato',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Ação',
      dataIndex: 'id',
      key: 'id',
      render: (id: any) => {
        const MenuOptions = (
          <Menu>
            <Menu.Item
              key="0"
              onClick={() => {
                history.push(`${defaultRoutes.admin}/providers/${id}`);
              }}
            >
              <span>Editar</span>
            </Menu.Item>
            <Menu.Item danger key="1" onClick={() => preHandleDelete(id)}>
              <span>Apagar</span>
            </Menu.Item>
          </Menu>
        );
        return (
          <BoxAction>
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

  const handleDeleteProvider = useCallback(
    async provider_id => {
      api.delete(`/suppliers/${provider_id}`);
      const providersUpdated = data?.filter(
        provider => provider.id !== provider_id,
      );
      mutate(providersUpdated, false);
      addToast({
        type: 'success',
        title: 'Fornecedor removido com sucesso',
      });
      closePokaYoke();
    },
    [addToast, closePokaYoke, data, mutate],
  );

  const preHandleDelete = useCallback(
    delete_id => {
      pokaYoke({
        title: 'Você tem certeza que deseja remover este fornecedor?',
        callback: () => handleDeleteProvider(delete_id),
        confirmButtonText: 'Apagar',
      });
    },
    [pokaYoke, handleDeleteProvider],
  );

  return (
    <>
      <Container>
        <Header>
          <Breadcrumb>
            <Breadcrumb.Item
              href=""
              onClick={() => history.push(`${defaultRoutes.admin}`)}
            >
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="">
              <ShopOutlined />
              <span>Fornecedores</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button
            type="primary"
            onClick={() => history.push(`${defaultRoutes.admin}/providers/new`)}
          >
            Adicionar
          </Button>
        </Header>
        <Table
          dataSource={data}
          loading={!data}
          columns={columns}
          pagination={{
            showSizeChanger: false,
            pageSize,
            defaultCurrent: 1,
            total: data ? data.length : 0,
            showTotal: () => {
              return (
                <div className="page-size">
                  Itens por pagina:
                  <Select
                    defaultValue="10"
                    style={{ width: 120 }}
                    onChange={value => setPageSize(parseInt(value, 10))}
                  >
                    <Option value="10">10</Option>
                    <Option value="20">20</Option>
                    <Option value="50">50</Option>
                    <Option value="100">100</Option>
                  </Select>
                </div>
              );
            },
          }}
          onRow={(record: { id: string }) => {
            return {
              onDoubleClick: () => {
                if (record)
                  history.push(`${defaultRoutes.admin}/providers/${record.id}`);
              },
            };
          }}
        />
      </Container>
    </>
  );
};

export default Providers;
