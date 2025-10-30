const express = require('express');
const router = express.Router();
const Prediction = require('../models/Prediction');
const Game = require('../models/Game');
const User = require('../models/User');
const auth = require('../middleware/auth');

// 创建预测
router.post('/', auth, async (req, res) => {
    try {
        const { gameId, selectedOption, betAmount } = req.body;
        
        // 检查游戏是否存在且可投注
        const game = await Game.findById(gameId);
        if (!game || game.status !== 'active') {
            return res.status(400).json({ error: 'Game not available for betting' });
        }
        
        // 检查用户余额
        const user = await User.findById(req.userId);
        if (user.balance < betAmount) {
            return res.status(400).json({ error: 'Insufficient balance' });
        }
        
        // 计算潜在收益
        const option = game.options.find(opt => opt.text === selectedOption);
        if (!option) {
            return res.status(400).json({ error: 'Invalid option' });
        }
        
        const potentialWinning = betAmount * option.odds;
        
        // 创建预测
        const prediction = new Prediction({
            user: req.userId,
            game: gameId,
            selectedOption,
            betAmount,
            potentialWinning
        });
        
        await prediction.save();
        
        // 更新用户余额
        user.balance -= betAmount;
        user.totalBets += betAmount;
        await user.save();
        
        // 更新游戏统计
        option.totalBets += 1;
        option.totalAmount += betAmount;
        game.totalPool += betAmount;
        await game.save();
        
        res.status(201).json(prediction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 获取用户的预测历史
router.get('/my-predictions', auth, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const filter = { user: req.userId };
        
        if (status) filter.status = status;
        
        const predictions = await Prediction.find(filter)
            .populate('game', 'title description status result')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Prediction.countDocuments(filter);
        
        res.json({
            predictions,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取游戏的所有预测
router.get('/game/:gameId', async (req, res) => {
    try {
        const predictions = await Prediction.find({ game: req.params.gameId })
            .populate('user', 'username level')
            .sort({ createdAt: -1 });
            
        res.json(predictions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;