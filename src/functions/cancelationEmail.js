const sgMail = require('@sendgrid/mail')
const { SENDGRID_API_KEY, SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL } = process.env

exports.handler = async (event, context, callback) => {

    const payload = JSON.parse(event.body);
    console.log('cancelationEmail', event);
    const {
        email,
        subject,
        name,
        phone,
        bookTime,
    } = payload;

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
        to: SENDGRID_TO_EMAIL,
        from: SENDGRID_FROM_EMAIL,
        templateId: 'd-3fb49ae5877e480aa1b7278d1d9d1800 ',
        dynamic_template_data: {
            subject: subject,
            name: name,
            email: email,
            phone: phone,
            bookTime: bookTime,
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
        callback(null, {
            statusCode: e.code,
            body: e.message
        });
    }
};