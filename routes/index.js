const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/mongo/user');
const JWT = require('jsonwebtoken');
const JWT_SECRET = require('../cipher').JWT_SECRET;
const apiRouter = require('./api');
const userRouter = require('./users');

router.options('/api/*', cors()); // 开发用
router.use('/api', apiRouter);

router.use('/users', userRouter);

router.options('/login', cors()); // 开发用
router.post('/login', (req, res, next) => {
    (async () => {
        if(!req.body.password) throw new Error('密码不能为空');
        if(typeof req.body.password !== 'string') throw new Error('密码虚伪字符串');
        if(req.body.password.length < 8) throw new Error('密码不能小于8位');
        if(req.body.password.length > 32) throw new Error('密码不能大于32位');
        const user = await User.login(req.body.phoneNumber, req.body.password);
        const token = JWT.sign({
            _id: user._id,
            iat: Date.now(),
            expire: Date.now() + 24 * 60 * 60 * 1000
        }, JWT_SECRET);
        return {
            code: 0,
            data: {
                user,
                token,
            }
        }
    })()
        .then(r => {
            res.header('Access-Control-Allow-Origin', ['*']);
            res.json(r);
        })
        .catch(e => {
            console.log('post /login', e);
            next(e);
        })
})

module.exports = router;
