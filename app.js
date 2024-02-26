const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple authentication
    if (username === 'johnosero98@gmail.com' && password === '12345') {
        // Redirect to welcome page
        res.redirect('/welcome');
    } else {
        // Send verification email
        sendVerificationEmail();
        res.send('Verification email sent. Please check your email to reset your password.');
    }
});

app.get('/welcome', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Function to send verification email
function sendVerificationEmail() {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Your Gmail address
            pass: 'your-password' // Your Gmail password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'johnosero98@gmail.com',
        subject: 'Password Reset Verification',
        text: 'Please reset your password by clicking on the following link: http://localhost:3000/reset-password'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
