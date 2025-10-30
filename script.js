// Banner轮播功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化功能
    initWalletConnection();
    initPublishModal();
    initThemeToggle();
    initAnimations();
    initMyPredictions();
    initLeaderboard();
    initChatRoom();
    
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

// 初始化动画效果
function initAnimations() {
    // 页面加载动画
    const animatedElements = document.querySelectorAll('.hero-section, .banner-section, .games-section');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.classList.add('fade-in');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // 为按钮添加悬停效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .view-all-btn, .pagination-btn');
    buttons.forEach(button => {
        button.classList.add('btn-hover-effect');
    });
    
    // 游戏卡片交错动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // 观察游戏卡片
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
    
    // 为主题切换按钮添加脉冲效果
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('pulse-effect');
            setTimeout(() => {
                themeToggle.classList.remove('pulse-effect');
            }, 1000);
        });
    }
    
    // 为钱包连接按钮添加弹跳效果
    const walletBtn = document.querySelector('.wallet-btn');
    if (walletBtn) {
        walletBtn.addEventListener('click', () => {
            walletBtn.classList.add('bounce-effect');
            setTimeout(() => {
                walletBtn.classList.remove('bounce-effect');
            }, 1000);
        });
    }
}

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // 自动轮播
    setInterval(nextSlide, 4000);

    // 点击圆点切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // 游戏数据
    const gamesData = [
        { name: 'BLISTERINO', color: '#ff6b6b' },
        { name: 'ZOMBIE HUNTER', color: '#4ecdc4' },
        { name: 'LAVA BALLS', color: '#45b7d1' },
        { name: 'BIG BASS BONANZA', color: '#f39c12' },
        { name: 'BEAT THE DEVIL', color: '#e74c3c' },
        { name: 'CRUSHER', color: '#9b59b6' },
        { name: 'SOLARWINDS', color: '#f1c40f' },
        { name: 'REACTOONZ', color: '#2ecc71' }
    ];

    // 分页功能
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(gamesData.length / itemsPerPage);

    const gamesGrid = document.getElementById('gamesGrid');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // 更新总页数显示
    totalPagesSpan.textContent = totalPages;

    function createGameCard(game, index) {
        // 为不同游戏类型配置符合预测主题的图片
        const gameImages = {
            'BLISTERINO': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop&crop=center',
            'ZOMBIE HUNTER': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop&crop=center',
            'LAVA BALLS': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop&crop=center',
            'BIG BASS BONANZA': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop&crop=center',
            'BEAT THE DEVIL': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
            'CRUSHER': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop&crop=center',
            'SOLARWINDS': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop&crop=center',
            'REACTOONZ': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop&crop=center'
        };
        
        // 游戏分类
        const gameCategories = {
            'BLISTERINO': '加密货币',
            'ZOMBIE HUNTER': '电竞游戏',
            'LAVA BALLS': '自然现象',
            'BIG BASS BONANZA': '股票市场',
            'BEAT THE DEVIL': '游戏娱乐',
            'CRUSHER': '区块链',
            'SOLARWINDS': '新能源',
            'REACTOONZ': '影视娱乐'
        };
        
        // 随机生成数据
        const participants = Math.floor(Math.random() * 500 + 50);
        const prizePool = (Math.random() * 20000 + 5000).toFixed(0);
        const timeLeft = 0; // 设置为0表示已结束
        
        // 状态判断 - 全部设置为已结束
        let statusClass = 'ended';
        let statusText = '已结束';
        
        const gameImage = gameImages[game.name] || `https://via.placeholder.com/400x300/${game.color.substring(1)}/ffffff?text=${encodeURIComponent(game.name)}`;
        
        return `
            <div class="game-card" onclick="openGameDetail('${game.name}', ${index})">
                <div class="game-image">
                    <img src="${gameImage}" alt="${game.name}" loading="lazy">
                    <div class="game-overlay">
                        <div class="game-status">
                            <span class="status-badge ${statusClass}">${statusText}</span>
                            <span class="participants-count">
                                <i class="fas fa-users"></i>
                                ${participants}
                            </span>
                        </div>
                        <div class="game-prize">
                            <span class="prize-label">总奖池</span>
                            <span class="prize-amount">${prizePool} FUNBET</span>
                        </div>
                    </div>
                </div>
                <div class="game-content">
                    <h3 class="game-title">${game.name}</h3>
                    <p class="game-description">${generateGameDescription(game.name)}</p>
                    <div class="game-meta">
                        <span class="game-category">${gameCategories[game.name] || '预测'}</span>
                        <span class="game-time">
                            <i class="fas fa-clock"></i>
                            已结束
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成游戏描述
    function generateGameDescription(gameName) {
        const descriptions = {
            'BLISTERINO': '预测BTC是否会在本周突破新高？',
            'ZOMBIE HUNTER': '哪支战队将赢得下一场电竞比赛？',
            'LAVA BALLS': '火山爆发会影响全球气候吗？',
            'BIG BASS BONANZA': '下个月哪只股票涨幅最大？',
            'BEAT THE DEVIL': '新游戏发布会成功吗？',
            'CRUSHER': '加密货币市场走向如何？',
            'SOLARWINDS': '太阳能股票会继续上涨吗？',
            'REACTOONZ': '新电影票房能破10亿吗？'
        };
        
        return descriptions[gameName] || `${gameName}相关预测竞猜`;
    }

    function displayGames(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentGames = gamesData.slice(startIndex, endIndex);
        
        const gamesHTML = currentGames.map((game, index) => createGameCard(game, startIndex + index)).join('');

        gamesGrid.innerHTML = gamesHTML;

        // 为新生成的卡片添加动画
        const newCards = gamesGrid.querySelectorAll('.game-card');
        newCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.classList.add('fade-in');
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // 更新页码显示
        currentPageSpan.textContent = page;

        // 更新按钮状态
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;

        // 重新绑定游戏卡片点击事件
        bindGameCardEvents();
    }

    function bindGameCardEvents() {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const gameName = card.querySelector('.game-title').textContent;
                console.log('游戏卡片被点击:', gameName);
                
                // 打开竞猜详情弹窗
                openGameDetail(gameName, index);
            });
        });
    }

    // 分页按钮事件
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayGames(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayGames(currentPage);
        }
    });

    // 初始化显示第一页
    displayGames(currentPage);

    // 分类按钮点击效果
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 这里可以添加筛选逻辑
            console.log('选择分类:', this.textContent);
        });
    });

    // 搜索功能
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase();
                console.log('搜索:', searchTerm);
                // 这里可以添加搜索逻辑
            }
        });
    }

    // 开始预测按钮（首页）
    const heroBtnPrimary = document.querySelector('.hero-btn-primary');
    if (heroBtnPrimary) {
        heroBtnPrimary.addEventListener('click', () => {
            // 检查钱包连接状态
            if (!window.isWalletConnected()) {
                showNotification('请先连接钱包才能发布预测', 'warning');
                return;
            }
            
            // 打开发布预测弹窗
            const modal = document.getElementById('publishModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // 初始化竞猜详情弹窗
    initGameDetailModal()
});

// 显示内盘阶段提示弹窗
function showWarningModal(title = '温馨提示', message = '内盘阶段暂时无法参与', description = '当前竞猜处于内盘阶段，暂时无法接受投注。') {
    const warningModal = document.getElementById('warningModal');
    
    // 更新模态框内容
    const titleElement = warningModal.querySelector('.warning-header h3');
    const messageElement = warningModal.querySelector('.warning-body p:first-child');
    const descElement = warningModal.querySelector('.warning-desc');
    
    if (titleElement) titleElement.textContent = title;
    if (messageElement) messageElement.textContent = message;
    if (descElement) descElement.textContent = description;
    
    // 使用CSS类来显示模态框，确保正确居中
    warningModal.classList.add('show');
    
    // 绑定确认按钮事件
    const confirmBtn = document.getElementById('warningConfirmBtn');
    confirmBtn.onclick = function() {
        warningModal.classList.remove('show');
    };
    
    // 点击背景关闭弹窗
    warningModal.onclick = function(e) {
        if (e.target === warningModal) {
            warningModal.classList.remove('show');
        }
    };
    
    // ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && warningModal.classList.contains('show')) {
            warningModal.classList.remove('show');
        }
    });
}


// 主题切换功能
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题设置
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, themeIcon);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
    } else {
        iconElement.className = 'fas fa-moon';
    }
}

// Web3钱包连接功能
function initWalletConnection() {
    const walletBtn = document.querySelector('.wallet-btn');
    let isConnected = false;
    let userAccount = null;

    // 检查是否已连接钱包
    checkWalletConnection();

    walletBtn.addEventListener('click', async () => {
        if (isConnected) {
            disconnectWallet();
        } else {
            await connectWallet();
        }
    });

    // 连接钱包函数
    async function connectWallet() {
        try {
            // 检查是否安装了MetaMask
            if (typeof window.ethereum !== 'undefined') {
                // 请求连接钱包
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                if (accounts.length > 0) {
                    userAccount = accounts[0];
                    isConnected = true;
                    updateWalletButton();
                    
                    // 监听账户变化
                    window.ethereum.on('accountsChanged', handleAccountsChanged);
                    window.ethereum.on('chainChanged', handleChainChanged);
                    
                    console.log('钱包连接成功:', userAccount);
                    showNotification('钱包连接成功!', 'success');
                } else {
                    showNotification('请在钱包中授权连接', 'warning');
                }
            } else {
                // 未安装MetaMask
                showNotification('请先安装MetaMask钱包', 'error');
                // 可以引导用户安装MetaMask
                window.open('https://metamask.io/download/', '_blank');
            }
        } catch (error) {
            console.error('连接钱包失败:', error);
            if (error.code === 4001) {
                showNotification('用户拒绝了连接请求', 'warning');
            } else {
                showNotification('连接钱包失败，请重试', 'error');
            }
        }
    }

    // 断开钱包连接
    function disconnectWallet() {
        isConnected = false;
        userAccount = null;
        updateWalletButton();
        
        // 移除事件监听器
        if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
        
        console.log('钱包已断开连接');
        showNotification('钱包已断开连接', 'info');
    }

    // 检查钱包连接状态
    async function checkWalletConnection() {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({
                    method: 'eth_accounts'
                });
                
                if (accounts.length > 0) {
                    userAccount = accounts[0];
                    isConnected = true;
                    updateWalletButton();
                    
                    // 重新添加事件监听器
                    window.ethereum.on('accountsChanged', handleAccountsChanged);
                    window.ethereum.on('chainChanged', handleChainChanged);
                }
            }
        } catch (error) {
            console.error('检查钱包连接状态失败:', error);
        }
    }

    // 处理账户变化
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            disconnectWallet();
        } else {
            userAccount = accounts[0];
            updateWalletButton();
            showNotification('账户已切换', 'info');
        }
    }

    // 处理网络变化
    function handleChainChanged(chainId) {
        console.log('网络已切换:', chainId);
        showNotification('网络已切换', 'info');
        // 可以在这里添加网络验证逻辑
    }

    // 更新钱包按钮显示
    function updateWalletButton() {
        if (isConnected && userAccount) {
            const shortAddress = `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
            walletBtn.textContent = shortAddress;
            walletBtn.classList.add('connected');
        } else {
            walletBtn.textContent = '连接钱包';
            walletBtn.classList.remove('connected');
        }
    }

    // 显示通知
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加到页面
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 获取当前连接的账户（供其他功能使用）
    window.getCurrentAccount = function() {
        return isConnected ? userAccount : null;
    };

    // 获取连接状态（供其他功能使用）
    window.isWalletConnected = function() {
        return isConnected;
    };
}

// 发布预测弹窗功能
function initPublishModal() {
    const publishBtn = document.querySelector('.publish-btn');
    const modal = document.getElementById('publishModal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const publishForm = document.getElementById('publishForm');
    const addOptionBtn = document.querySelector('.add-option-btn');
    const optionsContainer = document.querySelector('.options-container');
    
    // 图片上传相关元素
    const imageInput = document.getElementById('predictionImage');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImageBtn');
    
    let uploadedImage = null;

    // 图片上传功能
    function initImageUpload() {
        // 点击上传区域触发文件选择
        imageUploadArea.addEventListener('click', (e) => {
            if (e.target !== removeImageBtn && !e.target.closest('.remove-image-btn')) {
                imageInput.click();
            }
        });

        // 文件选择处理
        imageInput.addEventListener('change', handleImageUpload);

        // 删除图片
        removeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage();
        });

        // 拖拽上传
        imageUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUploadArea.style.borderColor = '#45a049';
        });

        imageUploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            imageUploadArea.style.borderColor = '#4CAF50';
        });

        imageUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUploadArea.style.borderColor = '#4CAF50';
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageFile(files[0]);
            }
        });
    }

    // 处理图片上传
    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file);
        }
    }

    // 处理图片文件
    function handleImageFile(file) {
        // 验证文件类型
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            showNotification('请上传 JPG、PNG、GIF 或 WebP 格式的图片', 'error');
            return;
        }

        // 验证文件大小 (100KB = 102400 bytes)
        if (file.size > 102400) {
            showNotification('图片大小不能超过 100KB', 'error');
            return;
        }

        // 验证图片比例
        const img = new Image();
        img.onload = function() {
            const aspectRatio = this.width / this.height;
            
            // 允许一定的误差范围 (0.9 - 1.1)
            if (aspectRatio < 0.9 || aspectRatio > 1.1) {
                showNotification('请上传比例接近 1:1 的图片', 'error');
                return;
            }

            // 验证通过，显示预览
            uploadedImage = file;
            showImagePreview(file);
            showNotification('图片上传成功', 'success');
        };

        img.onerror = function() {
            showNotification('图片格式错误，请重新选择', 'error');
        };

        img.src = URL.createObjectURL(file);
    }

    // 显示图片预览
    function showImagePreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            document.querySelector('.upload-placeholder').style.display = 'none';
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // 删除图片
    function removeImage() {
        uploadedImage = null;
        imageInput.value = '';
        previewImg.src = '';
        document.querySelector('.upload-placeholder').style.display = 'block';
        imagePreview.style.display = 'none';
        showNotification('图片已删除', 'info');
    }

    // 打开弹窗
    publishBtn.addEventListener('click', () => {
        // 检查钱包连接状态
        if (!window.isWalletConnected()) {
            showNotification('请先连接钱包才能发布预测', 'warning');
            return;
        }
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭弹窗
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        publishForm.reset(); // 重置表单
        resetOptions(); // 重置选项
        removeImage(); // 重置图片
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // 点击背景关闭弹窗
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // 添加选项功能
    let optionCount = 2;
    addOptionBtn.addEventListener('click', () => {
        if (optionCount >= 6) {
            showNotification('最多只能添加6个选项', 'warning');
            return;
        }
        
        optionCount++;
        const newOption = document.createElement('input');
        newOption.type = 'text';
        newOption.className = 'option-input';
        newOption.placeholder = `选项${optionCount}`;
        newOption.required = true;
        
        // 添加删除按钮
        const optionWrapper = document.createElement('div');
        optionWrapper.className = 'option-wrapper';
        optionWrapper.style.cssText = 'display: flex; gap: 10px; align-items: center;';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-option-btn';
        deleteBtn.style.cssText = 'background: #ff6b6b; color: white; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; font-size: 16px;';
        
        deleteBtn.addEventListener('click', () => {
            optionsContainer.removeChild(optionWrapper);
            optionCount--;
        });
        
        optionWrapper.appendChild(newOption);
        optionWrapper.appendChild(deleteBtn);
        optionsContainer.appendChild(optionWrapper);
    });

    // 重置选项到初始状态
    function resetOptions() {
        const optionWrappers = optionsContainer.querySelectorAll('.option-wrapper');
        optionWrappers.forEach(wrapper => {
            optionsContainer.removeChild(wrapper);
        });
        optionCount = 2;
    }

    // 表单提交
    publishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 检查钱包连接
        if (!window.isWalletConnected()) {
            showNotification('请先连接钱包', 'error');
            return;
        }

        // 收集表单数据
        const formData = new FormData(publishForm);
        const options = [];
        
        // 收集所有选项
        const optionInputs = optionsContainer.querySelectorAll('.option-input');
        optionInputs.forEach((input, index) => {
            if (input.value.trim()) {
                options.push({
                    id: index + 1,
                    text: input.value.trim()
                });
            }
        });

        if (options.length < 2) {
            showNotification('至少需要2个选项', 'warning');
            return;
        }

        const predictionData = {
            title: formData.get('predictionTitle'),
            image: uploadedImage, // 添加图片数据
            options: options,
            endTime: formData.get('endTime'),
            commissionRate: parseFloat(formData.get('commissionRate')),
            type: formData.get('predictionType'),
            verificationMethod: formData.get('verificationMethod'),
            fee: 1000, // 固定手续费1000代币
            deposit: parseFloat(formData.get('deposit')) || 0,
            creator: window.getCurrentAccount(),
            createdAt: new Date().toISOString()
        };

        try {
            // 这里可以添加区块链交互逻辑
            console.log('发布预测数据:', predictionData);
            
            // 模拟发布过程
            showNotification('正在发布预测...', 'info');
            
            // 模拟异步操作
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('预测发布成功！', 'success');
            closeModal();
            
            // 可以在这里刷新页面数据或添加到游戏列表
            
        } catch (error) {
            console.error('发布预测失败:', error);
            showNotification('发布失败，请重试', 'error');
        }
    });

    // 通知函数（复用钱包连接的通知系统）
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // 初始化图片上传功能
    initImageUpload();
}

// 竞猜详情弹窗功能
function initGameDetailModal() {
    const detailModal = document.getElementById('detailModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const modalOverlay = detailModal.querySelector('.modal-overlay');
    
    // 关闭弹窗函数
    function closeDetailModal() {
        detailModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // 绑定关闭事件
    closeDetailBtn.addEventListener('click', closeDetailModal);
    modalOverlay.addEventListener('click', closeDetailModal);
    
    // ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal.classList.contains('show')) {
            closeDetailModal();
        }
    });
}

// 打开竞猜详情
function openGameDetail(gameName, gameIndex) {
    const detailModal = document.getElementById('detailModal');
    
    // 模拟竞猜数据
    const gameDetail = generateGameDetail(gameName, gameIndex);
    
    // 填充详情数据
    populateGameDetail(gameDetail);
    
    // 显示弹窗
    detailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 生成模拟竞猜数据
function generateGameDetail(gameName, gameIndex) {
    const options = [
        { text: '是', percentage: 65, amount: 8125 },
        { text: '否', percentage: 35, amount: 4375 }
    ];
    
    const creators = [
        '0x1234...5678', '0xabcd...ef01', '0x9876...5432', 
        '0xfedc...ba98', '0x1111...2222'
    ];
    
    const endDates = [
        '2023-12-15 18:00', '2023-12-20 12:30', '2023-12-25 09:15',
        '2023-12-28 16:45', '2023-12-30 14:20'
    ];
    

    // 为详情页面配置符合预测主题的高分辨率图片
    const detailImages = {
        'BLISTERINO': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop&crop=center', // 比特币/加密货币
        'ZOMBIE HUNTER': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&crop=center', // 电竞游戏
        'LAVA BALLS': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center', // 火山爆发
        'BIG BASS BONANZA': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center', // 股票市场
        'BEAT THE DEVIL': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center', // 游戏发布会/科技
        'CRUSHER': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center', // 加密货币/区块链
        'SOLARWINDS': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&crop=center', // 太阳能板
        'REACTOONZ': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop&crop=center' // 电影院/票房
    };
    
    const detailImage = detailImages[gameName] || `https://via.placeholder.com/800x600/00ff88/ffffff?text=${encodeURIComponent(gameName)}`;
    
    // 使用与卡片一致的标题
    const gameDescriptions = {
        'BLISTERINO': '预测BTC是否会在本周突破新高？',
        'ZOMBIE HUNTER': '哪支战队将赢得下一场电竞比赛？',
        'LAVA BALLS': '火山爆发会影响全球气候吗？',
        'BIG BASS BONANZA': '下个月哪只股票涨幅最大？',
        'BEAT THE DEVIL': '新游戏发布会成功吗？',
        'CRUSHER': '加密货币市场走向如何？',
        'SOLARWINDS': '太阳能股票会继续上涨吗？',
        'REACTOONZ': '新电影票房能破10亿吗？'
    };
    
    return {
        title: gameDescriptions[gameName] || `${gameName}相关预测竞猜`,
        image: detailImage,
        creator: creators[gameIndex % creators.length],
        endTime: endDates[gameIndex % endDates.length],
        commission: (Math.random() * 5).toFixed(1),
        prizePool: (Math.random() * 20000 + 5000).toFixed(0),
        options: options,
        stats: {
            participants: Math.floor(Math.random() * 500 + 50),
            totalBets: Math.floor(Math.random() * 3000 + 500),
            averageBet: (Math.random() * 100 + 20).toFixed(1),
            timeRemaining: calculateTimeRemaining(endDates[gameIndex % endDates.length])
        }
    };
}

// 填充竞猜详情数据
function populateGameDetail(gameDetail) {
    // 基本信息
    document.getElementById('detailTitle').textContent = gameDetail.title;
    document.getElementById('detailImage').src = gameDetail.image;
    document.getElementById('detailCreator').textContent = gameDetail.creator;
    document.getElementById('detailEndTime').textContent = gameDetail.endTime;
    document.getElementById('detailCommission').textContent = gameDetail.commission + '%';
    document.getElementById('detailPrizePool').textContent = Number(gameDetail.prizePool).toLocaleString() + ' 代币';
    
    // 竞猜选项
    const bettingOptions = document.getElementById('bettingOptions');
    bettingOptions.innerHTML = gameDetail.options.map((option, index) => `
        <div class="option-item" data-option="${index}">
            <div class="option-text">${option.text}</div>
            <div class="option-stats">
                <div class="option-percentage">${option.percentage}%</div>
                <div class="option-amount">${option.amount.toLocaleString()} 代币</div>
            </div>
        </div>
    `).join('');
    
    // 统计信息
    document.getElementById('totalParticipants').textContent = gameDetail.stats.participants;
    document.getElementById('totalBets').textContent = gameDetail.stats.totalBets.toLocaleString();
    document.getElementById('averageBet').textContent = gameDetail.stats.averageBet;
    document.getElementById('timeRemaining').textContent = gameDetail.stats.timeRemaining;
    
    // 绑定选项点击事件
    bindOptionEvents();
    
    // 绑定投注功能
    bindBettingEvents();
}

// 绑定选项点击事件
function bindOptionEvents() {
    const optionItems = document.querySelectorAll('.option-item');
    const selectedOptionSpan = document.getElementById('selectedOption');
    const placeBetBtn = document.getElementById('placeBetBtn');
    
    optionItems.forEach(item => {
        item.addEventListener('click', () => {
            // 移除其他选项的选中状态
            optionItems.forEach(opt => opt.classList.remove('selected'));
            
            // 选中当前选项
            item.classList.add('selected');
            
            // 更新选中的选项显示
            const optionText = item.querySelector('.option-text').textContent;
            selectedOptionSpan.textContent = optionText;
            
            // 启用投注按钮
            placeBetBtn.disabled = false;
            
            // 更新预期收益
            updateExpectedReturn();
        });
    });
}

// 绑定投注功能
function bindBettingEvents() {
    const betAmountInput = document.getElementById('betAmount');
    const placeBetBtn = document.getElementById('placeBetBtn');
    
    // 移除之前的事件监听器（避免重复绑定）
    const newBetAmountInput = betAmountInput.cloneNode(true);
    betAmountInput.parentNode.replaceChild(newBetAmountInput, betAmountInput);
    
    const newPlaceBetBtn = placeBetBtn.cloneNode(true);
    placeBetBtn.parentNode.replaceChild(newPlaceBetBtn, placeBetBtn);
    
    // 重新获取元素引用
    const betInput = document.getElementById('betAmount');
    const betBtn = document.getElementById('placeBetBtn');
    
    // 投注金额变化时更新预期收益
    betInput.addEventListener('input', updateExpectedReturn);
    
    // 确认投注
    betBtn.addEventListener('click', (e) => {
        console.log('投注按钮被点击了！');
        e.preventDefault();
        e.stopPropagation();
        
        const selectedOption = document.querySelector('.option-item.selected');
        const betAmount = parseFloat(betInput.value);
        
        console.log('选中的选项:', selectedOption);
        console.log('投注金额:', betAmount);
        
        if (!selectedOption || !betAmount || betAmount <= 0) {
            showNotification('请选择选项并输入有效的投注金额', 'warning');
            return;
        }
        
        // 检查钱包连接
        if (!window.isWalletConnected()) {
            showNotification('请先连接钱包才能参与投注', 'warning');
            return;
        }
        
        // 执行投注
        placeBet(selectedOption, betAmount);
    });
}

// 更新预期收益
function updateExpectedReturn() {
    const selectedOption = document.querySelector('.option-item.selected');
    const betAmount = parseFloat(document.getElementById('betAmount').value) || 0;
    const expectedReturnSpan = document.getElementById('expectedReturn');
    const placeBetBtn = document.getElementById('placeBetBtn');
    
    if (selectedOption && betAmount > 0) {
        const percentage = parseFloat(selectedOption.querySelector('.option-percentage').textContent);
        // 简单的赔率计算：投注金额 * (100 / 选项百分比)
        const expectedReturn = (betAmount * (100 / percentage)).toFixed(2);
        expectedReturnSpan.textContent = expectedReturn + ' 代币';
        
        // 启用投注按钮
        placeBetBtn.disabled = false;
    } else {
        expectedReturnSpan.textContent = '0 代币';
        
        // 禁用投注按钮
        placeBetBtn.disabled = true;
    }
}

// 执行投注
async function placeBet(selectedOption, betAmount) {
    const optionText = selectedOption.querySelector('.option-text').textContent;
    
    try {
        // 显示内盘阶段提示弹窗
        showWarningModal();
        
        // 重置表单
        document.getElementById('betAmount').value = '';
        document.getElementById('selectedOption').textContent = '请先选择一个选项';
        document.getElementById('expectedReturn').textContent = '0 代币';
        document.getElementById('placeBetBtn').disabled = true;
        document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
        
    } catch (error) {
        console.error('投注失败:', error);
        showNotification('投注失败，请重试', 'error');
    }
}

// 计算剩余时间
function calculateTimeRemaining(endTime) {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    if (diff <= 0) {
        return '已结束';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        return `${days}天 ${hours}小时`;
    } else if (hours > 0) {
        return `${hours}小时`;
    } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${minutes}分钟`;
    }
}

// 初始化我的预测功能
function initMyPredictions() {
    const myPredictionsLink = document.getElementById('my-predictions-link');
    
    if (myPredictionsLink) {
        myPredictionsLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 检查钱包连接状态
            if (!window.ethereum || !window.ethereum.selectedAddress) {
                showWarningModal(
                    '需要连接钱包',
                    '请先连接您的钱包',
                    '查看预测记录需要验证您的身份，请先连接MetaMask钱包后再试。'
                );
                return;
            }
            
            // 如果钱包已连接，显示我的预测页面
            showMyPredictions();
        });
    }
}

// 显示我的预测页面
function showMyPredictions() {
    // 这里可以添加显示我的预测页面的逻辑
    // 例如：切换到我的预测视图，加载用户的预测数据等
    console.log('显示我的预测页面');
    
    // 显示内盘阶段提示
    showWarningModal(
        '温馨提示',
        '内盘阶段暂时无法参与',
        '当前竞猜处于内盘阶段，我的预测功能暂时无法使用。'
    );
}

// 初始化排行榜功能
function initLeaderboard() {
    const leaderboardLink = document.getElementById('leaderboard-link');
    
    if (leaderboardLink) {
        leaderboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 显示内盘阶段提示
            showWarningModal(
                '温馨提示',
                '内盘阶段暂时无法参与',
                '当前竞猜处于内盘阶段，排行榜功能暂时无法使用。'
            );
        });
    }
}

// 聊天室功能
function initChatRoom() {
    const chatRoomBtn = document.getElementById('chat-room-btn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatModalOverlay = document.getElementById('chatModalOverlay');
    
    if (chatRoomBtn) {
        chatRoomBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 检查钱包连接状态
            if (!window.ethereum || !window.ethereum.selectedAddress) {
                console.log('钱包未连接，显示警告');
                showWarningModal(
                    '需要连接钱包',
                    '请先连接您的钱包',
                    '聊天室功能需要验证您的身份，请先连接MetaMask钱包后再试。'
                );
                return;
            }
            
            openChatRoom();
        });
    }
    
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', closeChatRoom);
    }
    
    if (chatModalOverlay) {
        chatModalOverlay.addEventListener('click', function(e) {
            if (e.target === chatModalOverlay) {
                closeChatRoom();
            }
        });
    }
}

function openChatRoom() {
    const chatModal = document.getElementById('chatModal');
    const chatModalOverlay = document.getElementById('chatModalOverlay');
    const chatLoading = document.getElementById('chatLoading');
    const chatContent = document.getElementById('chatContent');
    
    // 显示模态框
    chatModalOverlay.style.display = 'flex';
    chatModal.style.display = 'flex';
    
    // 显示加载状态
    chatLoading.style.display = 'flex';
    chatContent.style.display = 'none';
    
    // 模拟加载过程
    setTimeout(() => {
        chatLoading.style.display = 'none';
        chatContent.style.display = 'flex';
        
        // 初始化聊天室内容
        initChatContent();
    }, 2000); // 2秒加载时间
}

function closeChatRoom() {
    const chatModal = document.getElementById('chatModal');
    const chatModalOverlay = document.getElementById('chatModalOverlay');
    
    chatModalOverlay.style.display = 'none';
    chatModal.style.display = 'none';
}

function initChatContent() {
    // 初始化标签页切换
    initChatTabs();
    
    // 生成模拟用户列表
    generateUserList();
    
    // 生成模拟聊天消息
    generateChatMessages();
    
    // 初始化输入功能
    initChatInput();
    
    // 模拟在线人数更新
    updateOnlineCount();
}

function initChatTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // 更新按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 更新面板显示
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

function generateUserList() {
    const userList = document.getElementById('userList');
    const users = [
        { name: '预测大师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master', status: 'online', badge: 'admin' },
        { name: '幸运玩家', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucky', status: 'online', badge: 'vip' },
        { name: '智慧投资者', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wise', status: 'online', badge: null },
        { name: '新手小白', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newbie', status: 'online', badge: null },
        { name: '数据分析师', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=analyst', status: 'online', badge: 'vip' },
        { name: '风险控制员', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=risk', status: 'online', badge: null }
    ];
    
    userList.innerHTML = users.map(user => `
        <div class="user-item">
            <div class="user-avatar">
                <img src="${user.avatar}" alt="${user.name}">
                <div class="status-dot ${user.status}"></div>
            </div>
            <div class="user-info">
                <div class="username">${user.name}</div>
                ${user.badge ? `<span class="user-badge ${user.badge}">${user.badge}</span>` : ''}
            </div>
        </div>
    `).join('');
}

function generateChatMessages() {
    const chatMessages = document.getElementById('chatMessages');
    const messages = [
        {
            type: 'system',
            text: '欢迎来到FUNBET聊天室！'
        },
        {
            username: '预测大师',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=master',
            time: '14:30',
            text: '大家好！今天的比赛预测都准备好了吗？'
        },
        {
            username: '幸运玩家',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucky',
            time: '14:32',
            text: '我看好今晚的足球比赛，主队胜率很高！'
        },
        {
            username: '智慧投资者',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wise',
            time: '14:35',
            text: '建议大家理性投注，不要盲目跟风哦 😊'
        },
        {
            type: 'system',
            text: '新手小白 加入了聊天室'
        },
        {
            username: '新手小白',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newbie',
            time: '14:38',
            text: '请问有什么投注技巧可以分享吗？'
        },
        {
            username: '数据分析师',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=analyst',
            time: '14:40',
            text: '根据历史数据分析，这场比赛的变数比较大，建议小额投注'
        }
    ];
    
    chatMessages.innerHTML = messages.map(msg => {
        if (msg.type === 'system') {
            return `<div class="system-message">${msg.text}</div>`;
        }
        return `
            <div class="message">
                <img src="${msg.avatar}" alt="${msg.username}" class="message-avatar">
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-username">${msg.username}</span>
                        <span class="message-time">${msg.time}</span>
                    </div>
                    <div class="message-text">${msg.text}</div>
                </div>
            </div>
        `;
    }).join('');
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function initChatInput() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    
    // 发送消息
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('我', 'https://api.dicebear.com/7.x/avataaars/svg?seed=me', message);
            chatInput.value = '';
            
            // 模拟其他用户回复
            setTimeout(() => {
                const responses = [
                    '说得对！',
                    '有道理 👍',
                    '我也是这么想的',
                    '不错的观点',
                    '学到了！'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                const users = ['预测大师', '幸运玩家', '智慧投资者'];
                const randomUser = users[Math.floor(Math.random() * users.length)];
                addMessage(randomUser, `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomUser}`, randomResponse);
            }, 1000 + Math.random() * 2000);
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // 工具栏按钮功能
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            handleToolbarAction(action);
        });
    });
}

function addMessage(username, avatar, text) {
    const chatMessages = document.getElementById('chatMessages');
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const messageHTML = `
        <div class="message">
            <img src="${avatar}" alt="${username}" class="message-avatar">
            <div class="message-content">
                <div class="message-header">
                    <span class="message-username">${username}</span>
                    <span class="message-time">${time}</span>
                </div>
                <div class="message-text">${text}</div>
            </div>
        </div>
    `;
    
    chatMessages.insertAdjacentHTML('beforeend', messageHTML);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleToolbarAction(action) {
    const chatInput = document.getElementById('chatInput');
    
    switch(action) {
        case 'emoji':
            const emojis = ['😊', '😂', '👍', '❤️', '🎉', '🔥', '💰', '🚀'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            chatInput.value += randomEmoji;
            break;
        case 'image':
            alert('图片上传功能开发中...');
            break;
        case 'gif':
            alert('GIF功能开发中...');
            break;
        case 'redpack':
            alert('红包功能开发中...');
            break;
    }
    
    chatInput.focus();
}

function updateOnlineCount() {
    const onlineCountElement = document.getElementById('onlineCount');
    let count = 127; // 初始在线人数
    
    // 模拟人数变化
    setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 到 +2 的随机变化
        count = Math.max(100, Math.min(200, count + change)); // 保持在100-200之间
        onlineCountElement.textContent = count;
    }, 10000); // 每10秒更新一次
}