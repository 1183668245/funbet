const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// 获取所有游戏
router.get('/', async (req, res) => {
    try {
        const { category, status, page = 1, limit = 10 } = req.query;
        const filter = {};
        
        if (category) filter.category = category;
        if (status) filter.status = status;
        
        const games = await Game.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
            
        const total = await Game.countDocuments(filter);
        
        res.json({
            games,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 获取单个游戏详情
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 创建新游戏（管理员功能）
router.post('/', async (req, res) => {
    try {
        const game = new Game(req.body);
        await game.save();
        res.status(201).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 更新游戏状态
router.patch('/:id/status', async (req, res) => {
    try {
        const { status, result } = req.body;
        const game = await Game.findByIdAndUpdate(
            req.params.id,
            { status, result },
            { new: true }
        );
        
        if (!game) {
            return res.status(404).json({ error: 'Game not found' });
        }
        
        res.json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;