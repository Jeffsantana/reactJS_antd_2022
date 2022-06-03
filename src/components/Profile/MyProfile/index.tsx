import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../Input';
import Button from '../../Button';
import ModalContainer from '../../ModalContainer';

import api from '../../../services/api';
import getValidationErrors from '../../../utils/getValidationErrors';
import Select from '../../Select';
import { useToast } from '../../../hooks/toast';
import { InputGroup } from '../../../styles/Forms';
import { useAuth, AuthProvider } from '../../../hooks/auth';

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

const MyProfile: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const { user, signOut, revivalAuth } = useAuth();
    const id = user._id;

    const profiles = useMemo(
        () => [
            { label: 'ADM', value: 'ADM' },
            { label: 'USER', value: 'USER' },
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
                    // profile: Yup.string().required('Tipo de perfil obrigatório'),
                    password: Yup.mixed().test({
                        message: 'Confirmação de senha deve ser igual a senha',
                        test: () => data.confirmPassword === data.password,
                    })
                });

                await schema.validate(data, { abortEarly: false });


                await api.put(`/me/${id}`, data)
                    .then(async success => {
                        await revivalAuth();
                        console.log("🚀 ~ success", success);
                        addToast({
                            type: 'success',
                            title: 'Seu Perfil foi atualizado com sucesso'
                        });
                        history.goBack();
                    })
                    .catch(err => {
                        addToast({
                            type: 'error',
                            title: 'Erro ao editar usuário',
                            description: err?.message,
                        });
                        // }
                    })





            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    addToast({
                        type: 'error',
                        title: 'Erro ao editar usuário',
                        description: err?.message,
                    });
                }

            }
        },
        [addToast, history, id],
    );

    useEffect(() => {
        async function loadUser() {
            // if (id !== 'new') {
            // const response = await api.get(`/user/${id}`);
            const { name, email, profile } = user;
            if (user) {
                formRef.current?.setFieldValue('name', name);
                formRef.current?.setFieldValue('email', email);
                formRef.current?.setFieldValue('profile', {
                    label: profile,
                    value: profile,
                });
            }
            // }
        }
        loadUser();
    }, [id]);

    return (
        <ModalContainer
            title={id === 'new' ? 'Criar usuário' : 'Editar usuário'}
            open
            onClose={() => { history.goBack(); revivalAuth(); }}
        >
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input placeholder="Nome" name="name" type="text" icon={FiUser} />
                <Input placeholder="E-mail" name="email" type="email" icon={FiMail} />
                {user.profile === 'ADM' && (
                    <Select
                        placeholder="Perfil"
                        name="profile"
                        options={profiles}
                        noOptionsMessage={() => 'Não há tipo de perfil'}
                    />
                )}
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
                {/* )} */}
                <Button type="submit">Salvar</Button>
            </Form>
        </ModalContainer>
    );
};

export default MyProfile;
