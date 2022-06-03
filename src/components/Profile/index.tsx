import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { Avatar } from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import userPreview from '../../assets/user.jpg';
import defaultRoutes from '../../config/routes/defaultRoutes';

import { useAuth } from '../../hooks/auth';

import { Container, Button, Menu, MenuItem } from './styles';

const Profile: React.FC = () => {

  const { user, signOut } = useAuth();
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const refMenu = useRef<HTMLDivElement>(null);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleSignOut() {
    setVisible(false);
    signOut();
  }

  const handleClickOutSide = useCallback(e => {
    if (refMenu.current?.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, [handleClickOutSide]);

  return (
    <Container>
      <Button onClick={handleToggleVisible}>
        <div>
          <span>{user.name}</span>
          <span>{user.email}</span>
        </div>
        <Avatar alt={user.name} src={userPreview} />
      </Button>
      <Menu ref={refMenu} visible={visible}>
        <MenuItem
          onClick={() => {
            history.push(`${defaultRoutes.home}/me`);
          }}
        >
          <FiUser size={20} />
          Meu perfil
        </MenuItem>
        <MenuItem textColor="danger" onClick={handleSignOut}>
          <FiLogOut size={20} />
          Sair
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Profile;
