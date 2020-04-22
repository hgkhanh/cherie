const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context, callback) => {

    const payload = JSON.parse(event.body);
    console.log('confirmationEmail', event);
    const {
        email,
        subject,
        name,
        phone,
        bookTime,
        budget,
        note,
        bookingId,
        domain
    } = payload;

    sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY);

    const msgToCustomer = {
        to: email,
        from: process.env.GATSBY_SENDGRID_FROM_EMAIL,
        templateId: 'd-240b50a01ce84da38ccae10eb4ef228a',
        dynamic_template_data: {
            subject: subject,
            name: name,
            email: email,
            phone: phone,
            bookTime: bookTime,
            budget: budget ? budget : 'N/A',
            note: note ? note : 'N/A',
            bookingId: bookingId,
            domain: domain
        },
    };

    const msgToCherie = {
        to: process.env.GATSBY_SENDGRID_TO_EMAIL,
        from: process.env.GATSBY_SENDGRID_FROM_EMAIL,
        templateId: 'd-b86ce5173a5f4c4ba3563df340d26472',
        dynamic_template_data: {
            subject: subject,
            name: name,
            email: email,
            phone: phone,
            bookTime: bookTime,
            budget: budget ? budget : 'N/A',
            note: note ? note : 'N/A',
            bookingId: bookingId,
            domain: domain
        },
    };
    try {
        console.log('send mail to customer', msgToCustomer);
        console.log('send mail to Cherie', msgToCherie);

        await sgMail.send(msgToCustomer);
        await sgMail.send(msgToCherie);

        callback(null, {
            statusCode: 200,
            body: "Message sent"
        });
    } catch (e) {
        console.log(e);
        callback(null, {
            statusCode: e.code,
            body: e.message
        });
    }
};