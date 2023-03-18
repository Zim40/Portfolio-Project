require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const {submitFormHandle} = require('./index');
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.static('./index.html'));

app.post('/submit-form', submitFormHandle, (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const transporter = nodemailer.createtransport({
        service: 'gmail',
        auth: {
           user: process.env.Email_User,
           pass: process.env.Email_Pass
        }
    });
    const recievedMail = {
        from: email,
        to: 'michaelm810129@gmail.com',
        subject: 'New Message from Portfolio Website!',
        text: `${name} (${email} says: ${message})`
    };

    transporter.sendMail(recievedMail, (error, info) => {
        if(error) {
            console.log(error);
            res.send('Error: There has been an error, please try again');
        } else {a
            console.log('Message sent');
            res.status(200).send('Thank you for reaching out!');
        }
    })


});





app.listen(PORT, (req, res) => {console.log(`Now listening at http://localhost:${PORT}`)});