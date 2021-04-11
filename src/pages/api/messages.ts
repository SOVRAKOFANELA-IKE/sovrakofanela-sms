const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request
        client.messages
            .create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: req.body.to,
                body: req.body.body
            })
            .then(() => {
                res.status(200).send(JSON.stringify({ success: true }));
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(JSON.stringify({ success: false }));
            });
    } else {
        // Handle any other HTTP method
        res.status(200).json({ name: 'John Doe' })
    }
}