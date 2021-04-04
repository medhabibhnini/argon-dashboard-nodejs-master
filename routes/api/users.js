const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/userModel");
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
var nodemailer = require('nodemailer');
// @route    POST api/agents
// @desc     Register user
// @access   Public
router.post(
    "/",
    [
        check("name", "firstName is required")
            .not()
            .isEmpty(),
        check("lastName", "lastName is required")
            .not()
            .isEmpty(),
            check("userName", "userName is required")
            .not()
            .isEmpty(),
        check("email", "invalid email").isEmail(),
        check("password", "password has to be 6 or more caracters").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, name, lastName, userName} = req.body;
        try {
            //See if user exists
            let user = await User.findOne({ email });
            if (user) {
                console.log(user.enabled);
                return res.status(400).json({ errors: [{ msg: "user already exists" }] });
            }

            const activation = cryptoRandomString({ length: 10 });
            user = new User({
                email,
                password,
                name,
                lastName,
                userName,
                activation
            });
            //send confirmation mail
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'improve.stack@gmail.com',
                    pass: 'improve123'
                }
            });
            const mailOptions = {
                from: 'improve.stack@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Confirmation code', // Subject line
                html: '<p>Your confirmation code ' + activation + '</p>'// plain text body
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.error(err)
                else
                    console.log(info);
            });
            //encrypt passwor(bcrypt)
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //reurn jsonwebtoken
         /*   const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
*/

        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }
    }
);


module.exports = router;
