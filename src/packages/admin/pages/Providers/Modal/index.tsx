import React, { useRef, useCallback, useEffect } from 'react';
import { useHistory, withRouter, useParams } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ModalContainer from '../../../../../components/ModalContainer';

import api from '../../../../../services/api';
import getValidationErrors from '../../../../../utils/getValidationErrors';
import { useToast } from '../../../../../hooks/toast';

import { InputGroup } from '../../../../../styles/Forms';

interface Params {
  id: string;
}
interface ProviderFormData {
  name: string;
  contact: string;
  phone: string;
  register: string;
}

const ProviderEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams<Params>();

  const handleSubmit = useCallback(
    async (data: ProviderFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          contact: Yup.string().required('Contato é obrigatório'),
          phone: Yup.string().required('Telefone é obrigatório'),
          register: Yup.string().required('Documento é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        if (id === 'new') {
          await api.post('/suppliers', data);
        } else {
          await api.put(`/suppliers/${id}`, data);
        }

        history.goBack();

        addToast({
          type: 'success',
          title: `Fornecedor ${id === 'new' ? 'cadastrado' : 'atualizado'
            } com sucesso`,
          description: 'O novo fornecedo foi cadastrado com sucesso!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar fornecedor',
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
        const response = await api.get(`/suppliers/${id}`);
        const { name, register, phone, contact } = response.data;
        if (response.status) {
          formRef.current?.setFieldValue('name', name);
          formRef.current?.setFieldValue('register', register);
          formRef.current?.setFieldValue('contact', contact);
          formRef.current?.setFieldValue('phone', phone);
        }
      }
    }
    loadUser();
  }, [id]);

  return (
    <ModalContainer
      title={id !== 'new' ? 'Editar fornecedor' : 'Criar fornecedor'}
      open
      onClose={() => history.goBack()}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input placeholder="Nome" name="name" type="text" />
        <InputGroup>
          <Input placeholder="Documento" name="register" type="text" />
          <Input placeholder="Contato" name="contact" type="text" />
          <Input placeholder="Telefone" name="phone" type="text" />
        </InputGroup>
        <Button type="submit">Salvar</Button>
      </Form>
    </ModalContainer>
  );
};

export default withRouter(ProviderEdit);
