const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// 用户注册
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 检查用户是否已存在
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        
        const user = new User({ username, email, password });
        await user.save();
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'funbet_secret',
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                balance: user.balance
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'funbet_secret',
            { expiresIn: '7d' }
        );
        
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                balance: user.balance,
                totalWinnings: user.totalWinnings,
                level: user.level
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 获取用户信息
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 更新用户余额
router.patch('/balance', auth, async (req, res) => {
    try {
        const { amount, type } = req.body; // type: 'deposit' or 'withdraw'
        
        const user = await User.findById(req.userId);
        
        if (type === 'withdraw' && user.balance < amount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        
        const newBalance = type === 'deposit' 
            ? user.balance + amount 
            : user.balance - amount;
            
        user.balance = newBalance;
        await user.save();
        
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;