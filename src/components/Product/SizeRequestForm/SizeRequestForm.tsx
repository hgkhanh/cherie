import React, { useState } from 'react';
import { Form, Button, Input, Icon } from 'antd';
import styles from './SizeRequestForm.module.scss';

interface SizeRequestPayload {
    productName: string;
    size: string;
    email: string;
}

const SizeRequestForm = ({ form, productName, size, popupSuccess, setPopupSuccess }) => {
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

    const sendEmail = (payload: SizeRequestPayload) => {
        return fetch("/.netlify/functions/sizeRequestEmail", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }
    return (
        <Form onSubmit={handleForm}>
            <Form.Item label='E-mail'>
                {form.getFieldDecorator('email')
                    (< Input type='email' size="large" required />)}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" size="large">Send</Button>
            </Form.Item>
            {isError && !loading && (
                <h3 className={styles.error}>Something went wrong!&nbsp;&nbsp;
                    <Icon type="frown" theme="twoTone" twoToneColor="#a8071a" /></h3>
            )}
        </Form>
    )
};

const WrappedSizeRequestForm = Form.create({ name: 'sizeRequest' })(SizeRequestForm);

export default WrappedSizeRequestForm;