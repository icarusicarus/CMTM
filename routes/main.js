const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        res.render('main.html');
    })

    .post(async (req, res, next) => {
        console.log('[POST] email: ' + req.body.email);
        // send email
        if (req.body.email) {

            let transporter = nodemailer.createTransport({
                service: 'gamil',
                host: 'smtp.gmail.com',
                secure: false,
                auth: {
                    user: process.env.EM,
                    pass: process.env.EPW,
                },
            });
            
            let info = await transporter.sendMail({
                from: '"Icarus🐍" <0flame0dawn0@gmail.com>',
                to: req.body.email,
                subject: 'Test Mail👋',
                html: `<b>Test email</b><br><div>Hello~!</div>`,
            });
            
            console.log('Message sent: %s', info.messageId);
            res.redirect('/');
        } else {
            res.send('something wrong :(');
        }
    })


module.exports = router;