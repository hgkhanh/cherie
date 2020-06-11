import React, { useState } from 'react';
import { Input, Form, Button, Select, Icon } from 'antd';
import { FormComponentProps } from "antd/lib/form";
import styles from './StylistPickForm.module.scss';
import moment from 'moment';


interface RequestPayload {
    month: string;
    year: string;
    venue: string;
    vibe: string;
    email: string;
}

const WrappedForm = ({ form }: { form: FormComponentProps['form'] }) => {
    const { getFieldDecorator } = form;
    // Form options
    const { Option } = Select;
    let monthOptions: Array<React.ReactElement> = [];
    for (let i = 0; i < 12; i++) {
        let month = moment().month(i).format('MMMM');
        monthOptions.push(<Option key={month} value={month}>{month}</Option>);
    }
    let yearOptions: Array<React.ReactElement> = [];
    const currentYear = moment().get('year');
    for (let i = currentYear; i <= currentYear + 3; i++) {
        yearOptions.push(<Option key={i} value={i}>{i}</Option>);
    }
    // yearOptions.push(<Option key='year_0' value="I'm not sure">I'm not sure</Option>);

    const VENUE_TYPES = [
        'Backyard', 'Ballroom', 'Barn',
        'Beach', 'City Hall', 'Garden',
        'Industrial', 'Rooftop', 'Vineyard',
        'Other'
    ];
    let venueOptions: Array<React.ReactElement> = [];
    for (let i = 0; i < VENUE_TYPES.length; i++) {
        venueOptions.push(<Option key={VENUE_TYPES[i]} value={VENUE_TYPES[i]}>{VENUE_TYPES[i]}</Option>);
    }

    const VIBE_TYPES = [
        'Romantic',
        'Elegant',
        'Cozy',
        'Casual',
        'Classic'
    ];
    let vibeOptions: Array<React.ReactElement> = [];
    for (let i = 0; i < VIBE_TYPES.length; i++) {
        vibeOptions.push(<Option key={VIBE_TYPES[i]} value={VIBE_TYPES[i]}>{VIBE_TYPES[i]}</Option>);
    }

    // Form handling
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const handleForm = (event: any) => {
        event.preventDefault();
        setIsError(false);
        setLoading(true);
        const payload = {
            month: form.getFieldValue('month'),
            year: form.getFieldValue('year'),
            venue: form.getFieldValue('venue'),
            vibe: form.getFieldValue('vibe'),
            email: form.getFieldValue('email')
        }
        setIsSuccess(true);
        setLoading(false);
        // sendEmail(payload).then((response) => {
        //     console.log('Stylist pick - email sent', response);
        //     setLoading(false);
        //     if (response.ok) {
        //         setIsSuccess(true);
        //         return;
        //     } else {
        //         console.log('Error', response.statusText);
        //         setIsError(true);
        //     }
        // });
    }

    const sendEmail = (payload: RequestPayload) => {
        return fetch("/.netlify/functions/stylistPickEmail", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    }

    const renderForm = () => {
        return (
            <Form colon={false} onSubmit={handleForm}>
                <Input.Group compact>
                    <span className={styles.inlineLabel}>I am going to get married on</span>
                    <Form.Item className={styles.inlineInput}>
                        {getFieldDecorator('month')(
                            <Select placeholder='month' style={{ width: 100 }}>
                                {monthOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item className={styles.inlineInput}>
                        {getFieldDecorator('year')(
                            <Select placeholder='year' style={{ width: 100 }}>
                                {yearOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <span className={styles.inlineLabel}>.&nbsp;&nbsp;</span>
                    <span className={styles.inlineLabel}>I am planning to get married at</span>
                    <Form.Item className={styles.inlineInput}>
                        {getFieldDecorator('venue')(
                            <Select placeholder='venue' style={{ width: 100 }}>
                                {venueOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <span className={styles.inlineLabel}>and want it to feel</span>
                    <Form.Item className={styles.inlineInput}>
                        {getFieldDecorator('vibe')(
                            <Select placeholder='vibe' style={{ width: 100 }}>
                                {vibeOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <span className={styles.inlineLabel}>.&nbsp;&nbsp;</span>
                    <span className={styles.inlineLabel}>You can contact me at</span>
                    <Form.Item className={styles.inlineInput} required>
                        {getFieldDecorator('email')(
                            <Input type='email' placeholder='your@email.com' required />
                        )}
                    </Form.Item>
                </Input.Group>
                <Form.Item className='centerAlign'>
                    <Button block style={{ width: 150}} htmlType="submit" loading={loading}>Submit</Button>
                </Form.Item>
            </Form>
        )
    }

    return (
        <div className={`gridWrapper ${styles.container}`}>
            <div className='grid narrow'>
                <div className='sectionTextBlock'>
                    {
                        isSuccess ? (
                            <div className='success'>
                                <Icon type="check-circle" theme="filled" style={{ color: '#237804' }} />
                                <span>&nbsp;&nbsp;Thank you! We will contact you promptly!</span>
                            </div>
                        ) : (
                                renderForm()
                            )
                    }

                    {isError && !loading && (
                        <h3 className='error'>Something went wrong!&nbsp;&nbsp;
                            <Icon type="frown" theme="twoTone" twoToneColor="#a8071a" /></h3>
                    )}
                </div >
            </div >
        </div >
    )
};

const StylistPickForm = Form.create()(WrappedForm);

export default StylistPickForm;