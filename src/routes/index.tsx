import React from 'react';
import { Switch } from 'react-router-dom';

/*
  A nagevação consiste em 3 tipos de navegação:
  - PrivateRoutes - São rotas privadas que exigem o usuário estar
  autenticado e renderiza o Menu lateral, 
  caso o usuário não esteja autenticado
  a rota irá redirecioná-lo para rota de login
  
  - GuestRoute - São rotas que só devem ser usadas quando o usuário não está
  logado, exemplo: rotas de Login, Cadastro e Recuperar senha
  
  - Route são rotas pública (Deve ser importado do react-router-dom), devem ser
  rotas usadas em: página de apresentação, páginas de termos de uso e etc.
*/

import PrivateRoute from './PrivateRoute';
import GuestRoute from './GuestRoute';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ConstantsRoutes from '../config/routes/ConstantsRoutes';

import AdminRoutes from '../packages/admin/routes'
import HomeRoutes from '../packages/home/routes'

import Error403 from '../pages/Error403';
import Error404 from '../pages/Error404';
import MyProfile from '../components/Profile/MyProfile';

const Routes: React.FC = () => {
  return (
    <Switch>
      <GuestRoute path={ConstantsRoutes.signing} exact component={SignIn} />
      <GuestRoute path={ConstantsRoutes.forgotPassword} component={SignUp} />

      <PrivateRoute path="/admin" component={AdminRoutes} />
      <PrivateRoute path="/dashboard" component={HomeRoutes} />
      <PrivateRoute path="/403" component={Error403} />
      <PrivateRoute path="*" component={Error404} />
      <PrivateRoute path="/admin/*" component={Error404} />
      <PrivateRoute path="/planning/*" component={Error404} />
    </Switch>
  );
};

export default Routes;
