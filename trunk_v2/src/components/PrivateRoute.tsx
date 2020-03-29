import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { UserContext } from '../UserContext';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactElement;
}

export function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
