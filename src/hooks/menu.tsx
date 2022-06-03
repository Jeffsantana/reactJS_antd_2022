import React from 'react';

type TMenuContext = {
  menuOpen: boolean;
  toggleMenu(): void;
};

const MenuContext = React.createContext<TMenuContext>({} as TMenuContext);

const MenuProvider: React.FC = ({ children }) => {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <MenuContext.Provider value={{ menuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { MenuProvider, useMenu };
