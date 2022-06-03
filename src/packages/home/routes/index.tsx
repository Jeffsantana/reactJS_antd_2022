import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyProfile from '../../../components/Profile/MyProfile';
import defaultRoutes from '../../../config/routes/defaultRoutes';
import Error404 from '../../../pages/Error404';
import Home from '../pages/Home';
import PlannigRoute from './PlannigRoute';

const baseURL = defaultRoutes.home;
const profileURL = defaultRoutes.profile;

const Routes: React.FC = () => {
  return (
    <Switch>
      <PlannigRoute path={`${baseURL}`} exact component={Home} />
      <Route path={`${baseURL}/me`} exact component={MyProfile} />
      <Route path={`${baseURL}/*`} component={Error404} />
    </Switch>
  );
};

export default Routes;
