const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');


const User = require('../../models/userModel');
// @route   GET api/auth
// @desc    Test route
// @access  Public 
router.get('/', auth, async (req, res) => {
    
    try {
       
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});





// @route   POST api/auth
// @desc    Authenticate agent & get token
// @access  Public 
router.post('/', [
    check('email', 'plz include a valid email').isEmail(),
    check('password',
        'password is required').exists()
],
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            //See if agent exists
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
            }


            //match password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: ' invalid credentials' }] });
            }
            //return jsonwebtoken 
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }




    });
// @route    api/auth/confirmation
// @desc    confirmation user account
// @access  Private
router.post('/confirmation', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).select('-password');
        if (user.activation != req.body.activation) {
            return res.status(400).json({ errors: [{ msg: ' invalid confirmation code ' }] })
        }

        user.enabled = true;
        await user.save();
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
// @route    api/auth/reset
// @desc     reset user password
// @access   Private
router.post('/reset', [auth, [
    check('password', 'plz include a valid email').exists(),
    check('newpassword', 'new password is required').exists(),
    check('confirmnewpassword', 'confirm new password is required').exists()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { password, newpassword, confirmnewpassword } = req.body;
        try {
            var user = await User.findById(req.user.id);
            if (!user) {
                return res.status(400).json({ errors: [{ msg: 'user does not exist' }] });
            }
            //match password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: [{ msg: ' invalid credentials' }] });
            }
            if (newpassword != confirmnewpassword) {
                return res.status(400).json({ errors: [{ msg: ' invalid confirmation' }] });
            }
            // Encrypt password

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newpassword, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }


);
module.exports = router;