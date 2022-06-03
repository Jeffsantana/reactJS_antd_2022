import React from 'react';
import {
  Route,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import ConstantsRoutes from '../config/routes/ConstantsRoutes';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}
const GuestRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();
  return (
    <Route
      {...rest}
      render={props => {
        return !signed ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: ConstantsRoutes.dashboard,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default GuestRoute;
