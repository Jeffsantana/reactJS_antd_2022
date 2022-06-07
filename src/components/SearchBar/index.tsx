/* eslint-disable no-underscore-dangle */
import React, { useCallback } from 'react';

import { useLocation, useHistory, Link } from 'react-router-dom';

import Notifications from '../Notifications';
import Profile from '../Profile';
// import ConstantsRoutes from '../../config/routes/ConstantsRoutes';
import api from '../../services/api';

import logo from '../../assets/criatech_blue.png';
// import logo from '../../assets/VinciLogo.jpeg';

import { Container, Buttons } from './styles';
import { useMenu } from '../../hooks/menu';
import useDebounce from '../../hooks/debounce';

const SearchBar: React.FC = () => {
  const { pathname } = useLocation();
  const { replace } = useHistory();

  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [term, setTerm] = React.useState<string>('');
  const [result, setResult] = React.useState<Array<any>>([]);
  const { toggleMenu } = useMenu();
  const debouncedSearchTerm = useDebounce(term, 500);

  const handleSearch = useCallback(
    async (searchTerm: string) => {
      if (pathname !== '/search') {
        setOpen(true);
        setLoading(true);
        const response = await api.get(`/search?terms=${searchTerm}&limit=5`);
        if (response.status === 200) {
          setResult(response.data.docs);
          setLoading(false);
        }
      } else {
        replace(`/search?search=${term}`);
      }
    },
    [pathname, replace, term],
  );

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, handleSearch]);

  const handleSubmit: React.FormEventHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (term !== '') {
      handleSearch(term);
    } else {
      setOpen(false);
    }
  };

  const handleCloseResults = () => {
    setOpen(false);
  };

  const handleType = (e: any) => {
    setTerm(e.target.value);
    if (e.target.value === '') {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="QrCode" />
      </Link>
      <Buttons>
        <Profile />
      </Buttons>
    </Container>
  );
};

export default SearchBar;
