/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useRef } from 'react';
import { FiMail, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import logo from '../../assets/criatech_blue.png';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Background, Content } from './styles';
import ConstantsRoutes from '../../config/routes/ConstantsRoutes';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(8, 'São necessários 8 dígitos'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="MEU CTM" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <p>Digite seu e-mail abaixo para recuperar sua senha</p>
          <Input name="email" type="email" icon={FiMail} placeholder="Email" />
          <Button type="submit">Enviar</Button>
        </Form>
        <Link to={ConstantsRoutes.signing}>
          <FiLogOut />
          Já tenho conta
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
