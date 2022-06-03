import React, { useCallback, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import * as Yup from 'yup';
import ModalContainer from '../../../../components/ModalContainer';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import api from '../../../../services/api';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../../../hooks/toast';
import getValidationErrors from '../../../../utils/getValidationErrors';
import { FiDownload } from 'react-icons/fi';


interface DownloadFormData {
    amount: Number
}

const QrCodeDownload: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const { push, goBack } = useHistory();
    const downloadPdf = useCallback(async (amount: Number) => {

        const response = await api.get(`/generate_qrcode/${amount}`, {
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment',
            },
        })
        const objectUrl = window.URL.createObjectURL(response.data);
        window.open(objectUrl, '_blank');
        window.URL.revokeObjectURL(objectUrl);
        return response;
    }, [])

    const handleSubmit = useCallback(
        async (data: DownloadFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    amount: Yup.number().required('É obrigatório informar a quantidade'),
                });

                await schema.validate(data, { abortEarly: false });

                const response = await api.get(`/generate_qrcode/${data.amount}`, {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'attachment',
                    },
                })
                const objectUrl = window.URL.createObjectURL(response.data);
                window.open(objectUrl, '_blank');
                window.URL.revokeObjectURL(objectUrl);

                goBack();

                addToast({
                    type: 'success',
                    title: 'QRCODE download ok',
                    description:
                        'Recebeu o PDF',
                })
                    ;

            } catch (err) {
                console.log("🚀 ~ err", err);
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    addToast({
                        type: 'error',
                        title: 'Erro ao realizar o download do arquivo',
                        description: err?.message,
                    });
                } else {
                    addToast({
                        type: 'error',
                        title: 'Error ao realizar o download',
                        description:
                            `Entre em contato com o suporte ${err}`,
                    })
                }

            }
        },
        [addToast, history],
    );

    return (
        <ModalContainer
            title={'QRCODE Download'}
            open
            onClose={() => goBack()}
        >
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input placeholder="ex:10" name="amount" type="number" icon={FiDownload}>
                </Input>
                <Button type="submit">Download</Button>
            </Form>
        </ModalContainer>
    )

};

export default QrCodeDownload;