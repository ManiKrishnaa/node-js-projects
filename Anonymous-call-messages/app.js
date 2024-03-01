const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const accountSid = 'AC68f05a4ea92088ae5640bc0bf80c1bad';
const authToken = 'fec5d7d6273f1d3e879fb0c10b32c396';

const client = twilio(accountSid, authToken);

app.post('/accesscall', (req, res) => {
    const phoneNumber = req.body.phoneno_call;

    initiateCall(phoneNumber)
        .then(call => {
            const callResponse = { success: true, message: 'Call initiated successfully', callSid: call.sid };
            res.render('index', { callResponse: callResponse, messageResponse: null });
        })
        .catch(error => {
            const callResponse = { success: false, message: 'Error initiating call', error: error.message };
            res.render('index', { callResponse: callResponse, messageResponse: null });
        });
});

app.post('/accessmessage', (req, res) => {
    const phoneNumber = req.body.phoneno_message;
    const message = req.body.message;

    client.messages.create({
        body: message,
        to: phoneNumber,
        from: '+17815774780',
    })
    .then(() => {
        const messageResponse = { success: true, message: 'Message sent successfully' };
        res.render('index', { callResponse: null, messageResponse: messageResponse });
    })
    .catch(error => {
        const messageResponse = { success: false, message: 'Error sending message', error: error.message };
        res.render('index', { callResponse: null, messageResponse: messageResponse });
    });
});


async function initiateCall(phoneNumber) {
    try {
      const call = await client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml', 
        to: phoneNumber,
        from: '+17815774780',
      });
  
      console.log('Call initiated with SID:', call.sid);
      return call;
    } catch (error) {
      console.error('Error initiating call:', error);
      throw error;
    }
}


app.get('/', (req, res) => {
    res.render('index', { callResponse: null, messageResponse: null });
});

app.listen(8081, () => {
    console.log("Server running at port 8081");
});
