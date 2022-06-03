import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';

import Users from '../pages/Users';
import AdminHome from '../pages';
import defaultRoutes from '../../../config/routes/defaultRoutes';
import Error404 from '../../../pages/Error404';
import UserEdit from '../pages/Users/Modal';

import Providers from '../pages/Providers';
import Manufacturers from '../pages/Manufacturers';
import Operators from '../pages/Operators';
import ProviderEdit from '../pages/Providers/Modal';
import ManufacturerEdit from '../pages/Manufacturers/Modal';
import OperatorEdit from '../pages/Operators/OperatorEdit';
import QrCodeDownload from '../pages/QrCode';

/*
  A nagevação consiste em 3 tipos de navegação:
  - PrivateRoutes - São rotas privadas que exigem o usuário estar
  autenticado e renderiza o Menu lateral, caso o usuário não esteja autenticado
  a rota irá redirecioná-lo para rota de login
  - GuestRoute - São rotas que só devem ser usadas quando o usuário não está
  logado, exemplo: rotas de Login, Cadastro e Recuperar senha
  - Route são rotas pública (Deve ser importado do react-router-dom), devem ser
  rotas usadas em: página de apresentação, páginas de termos de uso e etc.
*/

// import PrivateRoute from './PrivateRoute';
// import MCCRoute from './MccRoute';
// import GuestRoute from './GuestRoute';

const baseURL = defaultRoutes.admin;

const Routes: React.FC = () => {
  return (
    <Switch>
      <AdminRoute path={`${baseURL}`} exact component={AdminHome} />
      <AdminRoute path={`${baseURL}/users/:search?`} exact component={Users} />

      <AdminRoute path={`${baseURL}/qrcode`} component={QrCodeDownload} />

      <AdminRoute path={`${baseURL}/providers`} exact component={Providers} />
      <AdminRoute
        path={`${baseURL}/manufacturers`}
        exact
        component={Manufacturers}
      />
      <AdminRoute path={`${baseURL}/operators`} exact component={Operators} />

      <AdminRoute path={`${baseURL}/providers/:id`} component={ProviderEdit} />
      <AdminRoute
        path={`${baseURL}/manufacturers/:id`}
        component={ManufacturerEdit}
      />
      <AdminRoute path={`${baseURL}/operators/:id`} component={OperatorEdit} />

      <AdminRoute path={`${baseURL}/user/:id`} component={UserEdit} />
      <Route path={`${baseURL}/*`} component={Error404} />
    </Switch>
  );
};

export default Routes;
