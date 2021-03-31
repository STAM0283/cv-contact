const express = require('express');
const nodemailer = require('nodemailer');

require('dotenv/config');

const router = express.Router();

router.post('/send-email', (req, res) => {
  const messageReceived = `
    <p>Vous avez reçu un nouveau message</p>
    <h3>Détail du contact</h3>
    <ul>
       <li>Nom : ${req.body.name}</li>
       <li>Email : ${req.body.email}</li>
       <li>Objet : ${req.body.object}</li>
    </ul>
    <h3>Message :</h3>
    <p>${req.body.message}</p>
    `;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    port: 465,
    secure: true,
  });
  transporter.sendMail({
    from: req.body.email,
    to: process.env.EMAIL,
    name: req.body.name,
    email: req.body.email,
    object: req.body.object,
    message: req.body.message,
    html: messageReceived,
  }, (err) => {
    if (err) {
      console.log(err);
    }
    res.send('Email a été envoyé avec succés');
  });
});

module.exports = router;
