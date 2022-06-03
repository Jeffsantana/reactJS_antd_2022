import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { PokaYokeProvider } from './pokayoke';
import { MenuProvider } from './menu';
import { PermissionProvider } from './permission';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <PermissionProvider>
        <ToastProvider>
          <MenuProvider>
            <PokaYokeProvider>{children}</PokaYokeProvider>
          </MenuProvider>
        </ToastProvider>
      </PermissionProvider>
    </AuthProvider>
  );
};

export default AppProvider;
