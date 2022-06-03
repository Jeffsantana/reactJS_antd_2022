import React from 'react';
import {
  Route,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import ConstantsRoutes from '../../config/routes/ConstantsRoutes';

// import CommonLayout from '../components/CommonLayout';

import { useAuth } from '../../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return signed ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: ConstantsRoutes.signing,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
