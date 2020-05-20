const fetch = require(`node-fetch`);
const base64 = require('base-64');

exports.handler = async (event, context, callback) => {
    console.log('placeOrder', event.body);
    const payload = JSON.parse(event.body);
    const authToken = payload.authorization_token;
    const order = payload.order;
    console.log('authToken', authToken);
    console.log('order', order);
    // TO-DO validate the order (stock, shipping capabilities, prices, etc.)

    // Place order

    const url = process.env.GATSBY_KLARNA_BASE_URL
        + '/instantshopping/v1/authorizations/'
        + authToken
        + '/orders';

    console.log('url', url);
    fetch(url, {
        method: "POST",
        headers: {
            'Authorization': 'Basic '
                + base64.encode(
                    process.env.GATSBY_KLARNA_API_USERNAME
                    + ':'
                    + process.env.GATSBY_KLARNA_API_PASSWORD
                ),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => {
            console.log('response', response);
            response.json()
        })
        .then(data => {
            console.log('data', data);
            callback(null, {
                statusCode: 200,
                body: data
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            if (error) {
                callback(null, {
                    statusCode: error.code,
                    body: error.message
                });
            }
        });
};