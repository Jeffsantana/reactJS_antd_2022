import React from 'react';
import { useHistory } from 'react-router-dom';
import { GiGears } from 'react-icons/gi';

import { Container } from './styles';
import defaultRoutes from '../../../../config/routes/defaultRoutes';
import { useAuth } from '../../../../hooks/auth';

const baseURL = defaultRoutes;

const Home: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  return (
    <Container>
      <p>
        Seja bem-vindo,
        {user.name}
      </p>
      <div>

        <button type="button" onClick={() => history.push(`${baseURL.admin}`)}>
          <GiGears size={52} />
          <h4>System ADMIN</h4>
          <p>Centro de Controle de Configurações</p>
        </button>
      </div>
    </Container>
  );
};

export default Home;
