const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context, callback) => {

    const payload = JSON.parse(event.body);
    console.log('sizeRequestEmail', event);
    const {
        productName,
        size,
        email
    } = payload;

    sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY);

    const msgToCherie = {
        to: process.env.GATSBY_SENDGRID_TO_EMAIL,
        from: process.env.GATSBY_SENDGRID_FROM_EMAIL,
        templateId: 'd-97b4344e52d948d690b229322fa4c4fa',
        dynamic_template_data: {
            productName: productName,
            size: size,
            email: email
        },
    };
    try {
        console.log('send mail to Cherie', msgToCherie);
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