import React from 'react';
import {
  Route,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import CommonLayout from '../../../components/CommonLayout';

import { usePermission } from '../../../hooks/permission';
import Sidebar from '../components/Sidebar';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}

const PrivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authorized } = usePermission();
  return (
    <Route
      {...rest}
      render={props => {
        return authorized ? (
          <CommonLayout sidebar={Sidebar}>
            <Component />
          </CommonLayout>
        ) : (
          <Redirect
            to={{
              pathname: '/403',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
