import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  profile: string;
}

interface AuthContextData {
  user: User;
  signed: boolean;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): void;
  revivalAuth(): void;
}

interface AuthState {
  user: User;
  token: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('MyApp@token');
    const user = localStorage.getItem('MyApp@user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const revivalAuth = useCallback(async () => {

    const toUser = localStorage.getItem('MyApp@user');
    const token = localStorage.getItem('MyApp@token');
    if (toUser && token) {
      const user = JSON.parse(toUser);
      const response = await api.get(`/user/${user._id}`);
      const newUser = response.data;
      localStorage.setItem('MyApp@user', JSON.stringify(newUser));
      setData({ token, user: newUser });

    }
  }, [])
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/login', { email, password });
    const { user, token } = response.data;

    localStorage.setItem('MyApp@token', token);
    localStorage.setItem('MyApp@user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('MyApp@token');
    localStorage.removeItem('MyApp@user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signed: !!data.user, signIn, signOut, revivalAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}


export { AuthProvider, useAuth };
