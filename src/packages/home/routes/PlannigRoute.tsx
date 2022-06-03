import React from 'react';
import {
  Route,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import CommonLayout from '../../../components/CommonLayout';

import { usePermission } from '../../../hooks/permission';

interface RouteProps extends ReactDOMRouteProps {
  component: React.ComponentType;
}

const PlanningRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { authorized } = usePermission();
  return (
    <Route
      {...rest}
      render={props => {
        return authorized ? (
          <CommonLayout >
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

export default PlanningRoute;
