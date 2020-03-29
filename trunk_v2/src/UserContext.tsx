import React, { createContext, useEffect, useState, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface User {
  _id: string;
  email: string;
  token: string;
}

interface UserProviderProps extends RouteComponentProps {
  children: React.ReactElement;
}

export const UserContext = createContext<
  Partial<{
    user: User | null;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<null>>;
    logout: () => void;
  }>
>({ user: null, setUser: () => {}, logout: () => {} });

export const UserProvider = withRouter(
  ({ children, history }: UserProviderProps) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveUser = useCallback(user => {
      window.localStorage.setItem('token', user.token);

      setUser(user);
    }, []);

    const logout = () => {
      window.localStorage.removeItem('token');

      setUser(null);
    };

    useEffect(() => {
      const token = window.localStorage.getItem('token');

      async function getUser() {
        let res = null;

        try {
          res = await fetch('/api/users/user', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            method: 'GET',
          }).then(data => data.json());
  
          if (res.user && res.user.token) {
            // saveUser(res.user);
          }
        } catch (e) {
          // history.push('/login')
        }

        setIsLoading(false);
      }

      getUser();
    }, []); // eslint-disable-line

    return (
      <UserContext.Provider value={{ isLoading, user, setUser: saveUser, logout }}>
        {isLoading ? null : children}
      </UserContext.Provider>
    );
  }
);
