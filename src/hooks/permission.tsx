import React, { createContext, useCallback, useState, useContext } from 'react';
// import api from '../services/api';

interface PermissionContextData {
  authorized: boolean;
  checkPermission(): void;
}

interface PermissionState {
  authorized: boolean;
}

const PermissionContext = createContext<PermissionContextData>(
  {} as PermissionContextData,
);

const PermissionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<PermissionState>(() => {
    return {
      authorized: true,
    };
  });

  const checkPermission = useCallback(async () => {
    setData(state => ({ ...state, authorized: true }));
  }, []);

  return (
    <PermissionContext.Provider
      value={{ authorized: data.authorized, checkPermission }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

function usePermission(): PermissionContextData {
  const context = useContext(PermissionContext);

  if (!context) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }

  return context;
}

export { PermissionProvider, usePermission };
