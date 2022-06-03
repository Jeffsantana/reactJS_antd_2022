import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ModalContainer from '../../../../../components/ModalContainer';

import api from '../../../../../services/api';
import getValidationErrors from '../../../../../utils/getValidationErrors';
import Select from '../../../../../components/Select';
import { useToast } from '../../../../../hooks/toast';

import { InputGroup } from '../../../../../styles/Forms';

interface Params {
  id: string;
  search: string;
}

interface OptionSelect {
  label: string;
  value: string | number;
}
interface UserFormData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

const UserEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id, search } = useParams<Params>();


  const profiles = useMemo(
    () => [
      { label: 'ADM', value: 'ADM' },
      { label: 'USER', value: 'USER' },
      // { label: 'ENG', value: 'ENG' },
      // { label: 'MNT', value: 'MNT' },
      // { label: 'OPR', value: 'OPR' },
      { label: 'TI', value: 'TI' },
    ],
    [],
  );

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          profile: Yup.string().required('Tipo de perfil obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        if (id === 'new') {
          await api.post('/user', data);
        } else {
          await api.put(`/user/${id}`, data);
        }

        history.goBack();

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso',
          description:
            'O novo usuário foi convidado e receberá as instruções de cadastro via e-mail',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar usuário',
            description: err?.message,
          });
        }

      }
    },
    [addToast, history, id],
  );

  useEffect(() => {
    async function loadUser() {
      if (id !== 'new') {
        const response = await api.get(`/user/${id}`);
        const { name, email, profile } = response.data;
        if (response) {
          formRef.current?.setFieldValue('name', name);
          formRef.current?.setFieldValue('email', email);
          formRef.current?.setFieldValue('profile', {
            label: profile,
            value: profile,
          });
        }
      }
    }
    loadUser();
  }, [id]);

  return (
    <ModalContainer
      title={id === 'new' ? 'Criar usuário' : 'Editar usuário'}
      open
      onClose={() => history.goBack()}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input placeholder="Nome" name="name" type="text" icon={FiUser} />
        <Input placeholder="E-mail" name="email" type="email" icon={FiMail} />
        <Select
          placeholder="Perfil"
          name="profile"
          options={profiles}
          noOptionsMessage={() => 'Não há tipo de perfil'}
        />
        {id === 'new' && (
          <InputGroup>
            <Input
              icon={FiLock}
              placeholder="Senha"
              name="password"
              type="password"
            />

            <Input
              icon={FiLock}
              placeholder="Confirmação de senha"
              name="confirmPassword"
              type="password"
            />
          </InputGroup>
        )}
        <Button type="submit">Salvar</Button>
      </Form>
    </ModalContainer>
  );
};

export default UserEdit;
