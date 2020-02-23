const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL } = process.env;

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

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: email,
        from: SENDGRID_FROM_EMAIL,
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
    try {
        console.log('send mail', msg);

        await sgMail.send(msg);

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