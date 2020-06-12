import React, { useState } from 'react';
import { Form, Button, Input, Icon } from 'antd';
import styles from './SizeRequestForm.module.scss';
import { FormComponentProps } from "antd/lib/form";

interface RequestPayload {
    productName: string;
    size: string;
    email: string;
}

const SizeRequestForm = ({ form, productName, size, popupSuccess, setPopupSuccess }: { form: FormComponentProps }) => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const handleForm = (event: any) => {
        event.preventDefault();
        setIsError(false);
        setLoading(true);
        const payload = {
            productName: productName,
            size: size,
            email: form.getFieldValue('email')
        }
        sendEmail(payload).then((response) => {
            console.log('Size Request - email sent', response);
            setLoading(false);
            if (response.ok) {
                setPopupSuccess(true);
                return;
            } else {
                console.log('Error', response.statusText);
                setIsError(true);
            }
        });
    }

    const sendEmail = (payload: RequestPayload) => {
        return fetch("/.netlify/functions/sizeRequestEmail", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    return (
        <Form onSubmit={handleForm} colon={false}>
            <Form.Item label='E-mail'>
                {form.getFieldDecorator('email')
                    (< Input type='email' size="large" required />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>Send</Button>
            </Form.Item>
            {isError && !loading && (
                <h3 className='error'>Something went wrong!&nbsp;&nbsp;
                    <Icon type="frown" theme="twoTone" twoToneColor="#a8071a" /></h3>
            )}
        </Form>
    )
};

const WrappedSizeRequestForm = Form.create({ name: 'sizeRequest' })(SizeRequestForm);

export default WrappedSizeRequestForm;