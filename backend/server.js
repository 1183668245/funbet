const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const gameRoutes = require('./routes/games');
const userRoutes = require('./routes/users');
const predictionRoutes = require('./routes/predictions');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);
app.use('/api/predictions', predictionRoutes);

// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'FunBet API is running' });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`FunBet API server is running on port ${PORT}`);
});

module.exports = app;