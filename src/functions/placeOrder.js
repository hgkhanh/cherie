const fetch = require(`node-fetch`);
const base64 = require('base-64');

exports.handler = async (event, context) => {
    try {
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
        console.log('asdf2');
        const response = await fetch(url, {
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
        });
        console.log('response done');
        const data = await response.json();
        console.log('data done');
        console.log('data', data);
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    }
    catch (error) {
        console.log('error', error)
        return {
            statusCode: 400,
            body: JSON.stringify(error)
        }
    }
};