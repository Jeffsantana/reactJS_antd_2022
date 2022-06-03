import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiShoppingBag, FiUsers } from 'react-icons/fi';
import { RiTreasureMapLine, RiGroup2Line } from 'react-icons/ri';
import { Container, Grid, Card } from './styles';
import defaultRoutes from '../../../config/routes/defaultRoutes';

const AdminHome: React.FC = () => {
  const history = useHistory();
  const handleNavigate = useCallback(
    (path: string) => {
      history.push(`${defaultRoutes.admin}/${path}`);
    },
    [history],
  );
  return (
    <Container>
      <Grid>
        <Card onClick={() => handleNavigate('users')}>
          <FiUsers />
          <h4>Usuários</h4>
          <p>
            Adicione, edite, remova usuários ou ainda gerencie suas permissões
          </p>
        </Card>
        <Card onClick={() => handleNavigate('providers')}>
          <FiShoppingBag />
          <h4>Fornecedores</h4>
          <p>Gerencie todas os fornecedores do sistema</p>
        </Card>
        <Card onClick={() => handleNavigate('manufacturers')}>
          <RiGroup2Line />
          <h4>Fabricantes</h4>
          <p>Gerencie todos os fabricantes do sistema</p>
        </Card>
        <Card onClick={() => handleNavigate('operators')}>
          <RiTreasureMapLine />
          <h4>Operadores</h4>
          <p>Gerencie todos os operadores do sistema</p>
        </Card>

      </Grid>
    </Container>
  );
};

export default AdminHome;
