const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context, callback) => {

    const payload = JSON.parse(event.body);
    console.log('stylistPickEmail', event);
    const {
        month,
        year,
        venue,
        vibe,
        email
    } = payload;

    sgMail.setApiKey(process.env.GATSBY_SENDGRID_API_KEY);

    const msgToCherie = {
        to: process.env.GATSBY_SENDGRID_TO_EMAIL,
        from: process.env.GATSBY_SENDGRID_FROM_EMAIL,
        templateId: 'd-18ebe8c9ce2942e29756443a389eed25',
        dynamic_template_data: {
            month: month,
            year: year,
            venue: venue,
            vibe: vibe,
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