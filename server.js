require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.static( __dirname));

app.post('/submit-form', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    console.log(name, email, message);

    const transporter =  nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });
    // console.log(transporter);
    const mailOptions = {
        from: email,
        to: 'michaelm810129@gmail.com',
        subject: 'New Message from Portfolio Website!',
        text: `${name} (${email} says: ${message})`
    };

    transporter.sendMail(mailOptions, (error, data) => {
        if(error) {
            console.log(error);
             res.status(500).send('Error: There has been an error, please try again');
             return;
        } else {
            console.log('Message sent');
            res.status(200).send('Thank you for reaching out!');
        }
    })


});





app.listen(PORT, (req, res) => {console.log(`Now listening at http://localhost:${PORT}`)});