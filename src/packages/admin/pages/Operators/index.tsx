import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheck, FiX, FiMoreHorizontal } from 'react-icons/fi';
import { HomeOutlined, SolutionOutlined } from '@ant-design/icons';

import { Table, Menu, Dropdown, Select, Button, Breadcrumb } from 'antd';
import { useToast } from '../../../../hooks/toast';
import { usePokaYoke } from '../../../../hooks/pokayoke';

import api from '../../../../services/api';

import { Container, Header, BoxAction } from './styles';
import defaultRoutes from '../../../../config/routes/defaultRoutes';
import useFetch from '../../../../hooks/useFetchMemo';

const { Option } = Select;

interface OperatorState {
  id: string;
  active?: boolean;
  name: string;
  abbreviation: string;
}

const Operators: React.FC = () => {
  const { data, isLoading, mutate } = useFetch<OperatorState[]>('/operators');
  const [pageSize, setPageSize] = useState<number>(10);

  const { addToast } = useToast();
  const { pokaYoke, closePokaYoke } = usePokaYoke();

  const history = useHistory();

  const handleDeleteOperator = useCallback(
    (operator_id: string) => {
      api.delete(`/operators/${operator_id}`);
      const updatedOperators = data?.filter(
        operator => operator.id !== operator_id,
      );
      mutate(updatedOperators, false);
      addToast({
        type: 'success',
        title: 'Operador removida com sucesso',
      });
      closePokaYoke();
    },
    [addToast, closePokaYoke, mutate, data],
  );

  const preHandleDelete = useCallback(
    delete_id => {
      pokaYoke({
        title: 'Você tem certeza que deseja remover este operador?',
        callback: () => handleDeleteOperator(delete_id),
        confirmButtonText: 'Apagar',
      });
    },
    [pokaYoke, handleDeleteOperator],
  );

  const columns = [
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'name',
      width: '5%',
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
      title: 'Abreviatura',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
    },
    {
      title: 'Ação',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      render: (id: any) => {
        const MenuOptions = (
          <Menu>
            <Menu.Item
              key="0"
              onClick={() => {
                history.push(`${defaultRoutes.admin}/operators/${id}`);
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
              <SolutionOutlined />
              <span>Operadores</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button
            type="primary"
            onClick={() => history.push(`${defaultRoutes.admin}/operators/new`)}
          >
            Adicionar
          </Button>
        </Header>
        <Table
          dataSource={data}
          loading={isLoading}
          columns={columns}
          pagination={{
            showSizeChanger: false,
            pageSize,
            defaultCurrent: 1,
            total: data?.length || 0,
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
                  history.push(
                    `${defaultRoutes.admin}/operators/${record?.id}`,
                  );
              },
            };
          }}
        />
      </Container>
    </>
  );
};

export default Operators;
