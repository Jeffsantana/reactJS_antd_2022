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
interface ManufacturerFormData {
  active?: boolean;
  name: string;
  abbreviation: string;
}

const OperatorEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { id } = useParams<Params>();

  const handleSubmit = useCallback(
    async (data: ManufacturerFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          abbreviation: Yup.string().required('Abreviatura é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        if (id === 'new') {
          await api.post('/manufacturers', data);
        } else {
          await api.put(`/manufacturers/${id}`, data);
        }

        history.goBack();

        addToast({
          type: 'success',
          title: `Fabricante ${id === 'new' ? 'cadastrado' : 'atualizado'
            } com sucesso`,
          description: 'Novo fabricante cadastrado com sucesso',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          addToast({
            type: 'error',
            title: 'Erro ao cadastrar fabricante',
            description: err ? err.message : '',
          });
        }
      }
    },
    [addToast, history, id],
  );

  useEffect(() => {
    async function loadUser() {
      if (id !== 'new') {
        const response = await api.get(`/manufacturers/${id}`);
        const { name, abbreviation } = response.data;
        if (response.status) {
          formRef.current?.setFieldValue('name', name);
          formRef.current?.setFieldValue('abbreviation', abbreviation);
        }
      }
    }
    loadUser();
  }, [id]);

  return (
    <ModalContainer
      title={id !== 'new' ? 'Editar fabricante' : 'Criar fabricante'}
      open
      onClose={() => history.goBack()}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputGroup>
          <Input placeholder="Nome" name="name" type="text" />
          <Input placeholder="Abreviatura" name="abbreviation" type="text" />
        </InputGroup>
        <Button type="submit">Salvar</Button>
      </Form>
    </ModalContainer>
  );
};

export default withRouter(OperatorEdit);
