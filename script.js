 
let isConnected = false;

 
document.addEventListener('DOMContentLoaded', function() {
     
    initLanguage();
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
         
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
         
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

 
function initAnimations() {
     
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
    
     
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .view-all-btn, .pagination-btn');
    buttons.forEach(button => {
        button.classList.add('btn-hover-effect');
    });
    
     
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
    
     
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
    
     
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('pulse-effect');
            setTimeout(() => {
                themeToggle.classList.remove('pulse-effect');
            }, 1000);
        });
    }
    
     
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

     
    setInterval(nextSlide, 4000);

     
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

     
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

     
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalPages = Math.ceil(gamesData.length / itemsPerPage);

    const gamesGrid = document.getElementById('gamesGrid');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

     
    totalPagesSpan.textContent = totalPages;

    function createGameCard(game, index) {
         
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
        
         
        const gameCategories = {
            'BLISTERINO': { en: 'Cryptocurrency', zh: '加密货币' },
            'ZOMBIE HUNTER': { en: 'Esports', zh: '电竞游戏' },
            'LAVA BALLS': { en: 'Natural Phenomena', zh: '自然现象' },
            'BIG BASS BONANZA': { en: 'Stock Market', zh: '股票市场' },
            'BEAT THE DEVIL': { en: 'Gaming', zh: '游戏娱乐' },
            'CRUSHER': { en: 'Blockchain', zh: '区块链' },
            'SOLARWINDS': { en: 'New Energy', zh: '新能源' },
            'REACTOONZ': { en: 'Entertainment', zh: '影视娱乐' }
        };
        
         
        const participants = Math.floor(Math.random() * 500 + 50);
        const prizePool = (Math.random() * 20000 + 5000).toFixed(0);
        const timeLeft = 0;  
        
         
        let statusClass = 'ended';
        
         
        const currentLanguage = localStorage.getItem('language') || 'en';
        const translations = getTranslations();
        const currentTranslations = translations[currentLanguage];
        
        const gameImage = gameImages[game.name] || `https://via.placeholder.com/400x300/${game.color.substring(1)}/ffffff?text=${encodeURIComponent(game.name)}`;
        const categoryText = gameCategories[game.name] ? gameCategories[game.name][currentLanguage] : (currentTranslations['game-category-default'] || 'Prediction');
        
        return `
            <div class="game-card" onclick="openGameDetail('${game.name}', ${index})">
                <div class="game-image">
                    <img src="${gameImage}" alt="${game.name}" loading="lazy">
                    <div class="game-overlay">
                        <div class="game-status">
                            <span class="status-badge ${statusClass}">${currentTranslations['game-status-ended'] || 'Ended'}</span>
                            <span class="participants-count">
                                <i class="fas fa-users"></i>
                                ${participants}
                            </span>
                        </div>
                        <div class="game-prize">
                            <span class="prize-label">${currentTranslations['game-prize-pool'] || 'Prize Pool'}</span>
                            <span class="prize-amount">${prizePool} FUNBET</span>
                        </div>
                    </div>
                </div>
                <div class="game-content">
                    <h3 class="game-title">${game.name}</h3>
                    <p class="game-description">${generateGameDescription(game.name)}</p>
                    <div class="game-meta">
                        <span class="game-category">${categoryText}</span>
                        <span class="game-time">
                            <i class="fas fa-clock"></i>
                            ${currentTranslations['game-status-ended'] || 'Ended'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    function displayGames(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentGames = gamesData.slice(startIndex, endIndex);
        
        const gamesHTML = currentGames.map((game, index) => createGameCard(game, startIndex + index)).join('');

        gamesGrid.innerHTML = gamesHTML;

         
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

         
        currentPageSpan.textContent = page;

         
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === totalPages;

         
        bindGameCardEvents();
    }

    function bindGameCardEvents() {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                const gameName = card.querySelector('.game-title').textContent;
                console.log('游戏卡片被点击:', gameName);
                
                 
                openGameDetail(gameName, index);
            });
        });
    }

     
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

     
    displayGames(currentPage);

     
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
             
            categoryBtns.forEach(b => b.classList.remove('active'));
             
            this.classList.add('active');
            
             
            console.log('选择分类:', this.textContent);
        });
    });

     
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase();
                console.log('搜索:', searchTerm);
                 
            }
        });
    }

     
    const heroBtnPrimary = document.querySelector('.hero-btn-primary');
    if (heroBtnPrimary) {
        heroBtnPrimary.addEventListener('click', () => {
             
            if (!window.isWalletConnected()) {
                showNotification(getNotificationText('wallet-connect-required-publish'), 'warning');
                return;
            }
            
             
            const modal = document.getElementById('publishModal');
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    }

     
    initGameDetailModal()
});

 

 
function generateGameDescription(gameName) {
  
    const currentLanguage = localStorage.getItem('language') || 'en';
    
    const descriptions = {
        'BLISTERINO': {
            en: 'Will BTC break new highs this week?',
            zh: '预测BTC是否会在本周突破新高？'
        },
        'ZOMBIE HUNTER': {
            en: 'Which team will win the next esports match?',
            zh: '哪支战队将赢得下一场电竞比赛？'
        },
        'LAVA BALLS': {
            en: 'Will volcanic eruptions affect global climate?',
            zh: '火山爆发会影响全球气候吗？'
        },
        'BIG BASS BONANZA': {
            en: 'Which stock will have the biggest gain next month?',
            zh: '下个月哪只股票涨幅最大？'
        },
        'BEAT THE DEVIL': {
            en: 'Will the new game launch be successful?',
            zh: '新游戏发布会成功吗？'
        },
        'CRUSHER': {
            en: 'How will the cryptocurrency market trend?',
            zh: '加密货币市场走向如何？'
        },
        'SOLARWINDS': {
            en: 'Will solar energy stocks continue to rise?',
            zh: '太阳能股票会继续上涨吗？'
        },
        'REACTOONZ': {
            en: 'Can the new movie break 1 billion at box office?',
            zh: '新电影票房能破10亿吗？'
        }
    };
    
    const gameDesc = descriptions[gameName];
    if (gameDesc && gameDesc[currentLanguage]) {
        return gameDesc[currentLanguage];
    }
    
     
    return currentLanguage === 'en' 
        ? `${gameName} related prediction betting`
        : `${gameName}相关预测竞猜`;
}

function showWarningModal(titleKey = 'warning-title', messageKey = 'warning-message', descKey = 'warning-desc') {
    const warningModal = document.getElementById('warningModal');
    const currentLanguage = localStorage.getItem('language') || 'en';
    const translations = getTranslations();
    
     
    const title = translations[currentLanguage][titleKey] || translations['en'][titleKey] || 'Notice';
    const message = translations[currentLanguage][messageKey] || translations['en'][messageKey] || 'Currently unavailable during internal phase';
    const description = translations[currentLanguage][descKey] || translations['en'][descKey] || 'The current betting is in the internal phase and cannot accept bets temporarily.';
    const confirmText = translations[currentLanguage]['warning-confirm'] || translations['en']['warning-confirm'] || 'Got it';
    
     
    const titleElement = warningModal.querySelector('.warning-header h3');
    const messageElement = warningModal.querySelector('.warning-body p:first-child');
    const descElement = warningModal.querySelector('.warning-desc');
    const confirmBtn = document.getElementById('warningConfirmBtn');
    
    if (titleElement) titleElement.textContent = title;
    if (messageElement) messageElement.textContent = message;
    if (descElement) descElement.textContent = description;
    if (confirmBtn) confirmBtn.textContent = confirmText;
    
     
    warningModal.classList.add('show');
    
     
    confirmBtn.onclick = function() {
        warningModal.classList.remove('show');
    };
    
     
    warningModal.onclick = function(e) {
        if (e.target === warningModal) {
            warningModal.classList.remove('show');
        }
    };
    
     
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && warningModal.classList.contains('show')) {
            warningModal.classList.remove('show');
        }
    });
}


 
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
     
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

 
 
function initWalletConnection() {
    const walletBtn = document.querySelector('.wallet-btn');
    let userAccount = null;

     
    checkWalletConnection();

    walletBtn.addEventListener('click', async () => {
        if (isConnected) {
            disconnectWallet();
        } else {
            await connectWallet();
        }
    });

     
    async function connectWallet() {
        try {
             
            if (typeof window.ethereum !== 'undefined') {
                 
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                if (accounts.length > 0) {
                    userAccount = accounts[0];
                    isConnected = true;
                    updateWalletButton();
                    
                     
                    window.ethereum.on('accountsChanged', handleAccountsChanged);
                    window.ethereum.on('chainChanged', handleChainChanged);
                    
                    console.log('钱包连接成功:', userAccount);
                    showNotification(getNotificationText('wallet-connect-success'), 'success');
                } else {
                    showNotification(getNotificationText('wallet-authorize-required'), 'warning');
                }
            } else {
                 
                showNotification(getNotificationText('wallet-install-metamask'), 'error');
                 
                window.open('https://metamask.io/download/', '_blank');
            }
        } catch (error) {
            console.error('连接钱包失败:', error);
            if (error.code === 4001) {
                showNotification(getNotificationText('wallet-connection-rejected'), 'warning');
            } else {
                showNotification(getNotificationText('wallet-connection-failed'), 'error');
            }
        }
    }

     
    function disconnectWallet() {
        isConnected = false;
        userAccount = null;
        updateWalletButton();
        
         
        if (window.ethereum) {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
        
        console.log('钱包已断开连接');
        showNotification(getNotificationText('wallet-disconnected'), 'info');
    }

     
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
                    
                     
                    window.ethereum.on('accountsChanged', handleAccountsChanged);
                    window.ethereum.on('chainChanged', handleChainChanged);
                }
            }
        } catch (error) {
            console.error('检查钱包连接状态失败:', error);
        }
    }

     
    function handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            disconnectWallet();
        } else {
            userAccount = accounts[0];
            updateWalletButton();
            showNotification(getNotificationText('wallet-account-switched'), 'info');
        }
    }

     
    function handleChainChanged(chainId) {
        console.log('网络已切换:', chainId);
        showNotification(getNotificationText('wallet-network-switched'), 'info');
         
    }

     
    function updateWalletButton() {
        const walletTextSpan = walletBtn.querySelector('.wallet-text');
        if (isConnected && userAccount) {
            const shortAddress = `${userAccount.slice(0, 6)}...${userAccount.slice(-4)}`;
            if (walletTextSpan) {
                walletTextSpan.textContent = shortAddress;
            } else {
                walletBtn.textContent = shortAddress;
            }
            walletBtn.classList.add('connected');
        } else {
            if (walletTextSpan) {
                 
                const currentLanguage = localStorage.getItem('language') || 'zh';
                const translations = getTranslations();
                walletTextSpan.textContent = translations[currentLanguage]['connect-wallet'];
            } else {
                walletBtn.textContent = translations[currentLanguage]['connect-wallet'] || 'Connect Wallet';
            }
            walletBtn.classList.remove('connected');
        }
    }

     


     
    function getNotificationText(key) {
        const currentLanguage = localStorage.getItem('language') || 'zh';
        const translations = getTranslations();
        return translations[currentLanguage][key] || key;
    }

     
    window.getCurrentAccount = function() {
        return isConnected ? userAccount : null;
    };

     
    window.isWalletConnected = function() {
        return isConnected;
    };
}

 
function initPublishModal() {
    const publishBtn = document.querySelector('.publish-btn');
    const modal = document.getElementById('publishModal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const publishForm = document.getElementById('publishForm');
    const addOptionBtn = document.querySelector('.add-option-btn');
    const optionsContainer = document.querySelector('.options-container');
    
    console.log('初始化发布预测弹窗');
    console.log('发布按钮:', publishBtn);
    console.log('弹窗元素:', modal);
    
    if (!publishBtn) {
        console.error('找不到发布预测按钮');
        return;
    }
    
    if (!modal) {
        console.error('找不到发布预测弹窗');
        return;
    }
    
     
    const imageInput = document.getElementById('predictionImage');
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');
    const removeImageBtn = document.getElementById('removeImageBtn');
    
    let uploadedImage = null;

     
    function initImageUpload() {
         
        imageUploadArea.addEventListener('click', (e) => {
            if (e.target !== removeImageBtn && !e.target.closest('.remove-image-btn')) {
                imageInput.click();
            }
        });

         
        imageInput.addEventListener('change', handleImageUpload);

         
        removeImageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage();
        });

         
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

     
    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            handleImageFile(file);
        }
    }

     
    function handleImageFile(file) {
         
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            showNotification(getNotificationText('image-format-error'), 'error');
            return;
        }

         
        if (file.size > 102400) {
            showNotification(getNotificationText('image-size-error'), 'error');
            return;
        }

         
        const img = new Image();
        img.onload = function() {
            const aspectRatio = this.width / this.height;
            
             
            if (aspectRatio < 0.9 || aspectRatio > 1.1) {
                showNotification(getNotificationText('image-ratio-error'), 'error');
                return;
            }

             
            uploadedImage = file;
            showImagePreview(file);
            showNotification(getNotificationText('image-upload-success'), 'success');
        };

        img.onerror = function() {
            showNotification(getNotificationText('image-format-invalid'), 'error');
        };

        img.src = URL.createObjectURL(file);
    }

     
    function showImagePreview(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            document.querySelector('.upload-placeholder').style.display = 'none';
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

     
    function removeImage() {
        uploadedImage = null;
        imageInput.value = '';
        previewImg.src = '';
        document.querySelector('.upload-placeholder').style.display = 'block';
        imagePreview.style.display = 'none';
        showNotification(getNotificationText('image-deleted'), 'info');
    }

     
    publishBtn.addEventListener('click', () => {
        console.log('发布预测按钮被点击');
        console.log('钱包连接状态:', window.isWalletConnected());
        
         
        if (!window.isWalletConnected()) {
            console.log('钱包未连接，显示提示');
            showNotification(getNotificationText('wallet-connect-required-publish'), 'warning');
            return;
        }
        
        console.log('打开发布预测弹窗');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';  
    });

     
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        publishForm.reset();  
        resetOptions();  
        removeImage();  
    }

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

     
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

     
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

     
    let optionCount = 2;
    addOptionBtn.addEventListener('click', () => {
        if (optionCount >= 6) {
            showNotification(getNotificationText('max-options-error'), 'warning');
            return;
        }
        
        optionCount++;
        const newOption = document.createElement('input');
        newOption.type = 'text';
        newOption.className = 'option-input';
        newOption.placeholder = `选项${optionCount}`;
        newOption.required = true;
        
         
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

     
    function resetOptions() {
        const optionWrappers = optionsContainer.querySelectorAll('.option-wrapper');
        optionWrappers.forEach(wrapper => {
            optionsContainer.removeChild(wrapper);
        });
        optionCount = 2;
    }

     
    publishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
         
        if (!window.isWalletConnected()) {
            showNotification(getNotificationText('wallet-connect-required'), 'error');
            return;
        }

         
        const formData = new FormData(publishForm);
        const options = [];
        
         
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
            showNotification(getNotificationText('min-options-error'), 'warning');
            return;
        }

        const predictionData = {
            title: formData.get('predictionTitle'),
            image: uploadedImage,  
            options: options,
            endTime: formData.get('endTime'),
            commissionRate: parseFloat(formData.get('commissionRate')),
            type: formData.get('predictionType'),
            verificationMethod: formData.get('verificationMethod'),
            fee: 1000,  
            deposit: parseFloat(formData.get('deposit')) || 0,
            creator: window.getCurrentAccount(),
            createdAt: new Date().toISOString()
        };

        try {
             
            console.log('发布预测数据:', predictionData);
            
             
            showNotification(getNotificationText('publishing-prediction'), 'info');
            
             
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification(getNotificationText('publish-success'), 'success');
            closeModal();
            
             
            
        } catch (error) {
            console.error('发布预测失败:', error);
            showNotification(getNotificationText('publish-failed'), 'error');
        }
    });

     
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

     
    initImageUpload();
}

 
function initGameDetailModal() {
    const detailModal = document.getElementById('detailModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const modalOverlay = detailModal.querySelector('.modal-overlay');
    
     
    function closeDetailModal() {
        detailModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
     
    closeDetailBtn.addEventListener('click', closeDetailModal);
    modalOverlay.addEventListener('click', closeDetailModal);
    
     
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal.classList.contains('show')) {
            closeDetailModal();
        }
    });
}

 
function openGameDetail(gameName, gameIndex) {
    const detailModal = document.getElementById('detailModal');
    
    if (!detailModal) {
        console.error('detailModal not found!');
        return;
    }
    
     
    const gameDetail = generateGameDetail(gameName, gameIndex);
    
     
    const gameTitle = document.getElementById('detailTitle');
    if (gameTitle) {
        gameTitle.dataset.gameName = gameName;
        gameTitle.dataset.gameIndex = gameIndex;
    }
    
     
    populateGameDetail(gameDetail);
    
     
    detailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

 
function generateGameDetail(gameName, gameIndex) {
     
    const currentLanguage = localStorage.getItem('language') || 'zh';
    
    const options = [
        { 
            text: currentLanguage === 'en' ? 'Yes' : '是', 
            percentage: 65, 
            amount: 8125 
        },
        { 
            text: currentLanguage === 'en' ? 'No' : '否', 
            percentage: 35, 
            amount: 4375 
        }
    ];
    
    const creators = [
        '0x1234...5678', '0xabcd...ef01', '0x9876...5432', 
        '0xfedc...ba98', '0x1111...2222'
    ];
    
    const endDates = [
        '2023-12-15 18:00', '2023-12-20 12:30', '2023-12-25 09:15',
        '2023-12-28 16:45', '2023-12-30 14:20'
    ];
    

     
    const detailImages = {
        'BLISTERINO': 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop&crop=center',  
        'ZOMBIE HUNTER': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop&crop=center',  
        'LAVA BALLS': 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&crop=center',  
        'BIG BASS BONANZA': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop&crop=center',  
        'BEAT THE DEVIL': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center',  
        'CRUSHER': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&crop=center',  
        'SOLARWINDS': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&crop=center',  
        'REACTOONZ': 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=600&fit=crop&crop=center'  
    };
    
    const detailImage = detailImages[gameName] || `https://via.placeholder.com/800x600/00ff88/ffffff?text=${encodeURIComponent(gameName)}`;
    
     
    const title = generateGameDescription(gameName);
    
    return {
        title: title,
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

 
function populateGameDetail(gameDetail) {
     
    const currentLanguage = localStorage.getItem('language') || 'zh';
    const tokenText = currentLanguage === 'en' ? ' Tokens' : ' 代币';
    
     
    document.getElementById('detailTitle').textContent = gameDetail.title;
    document.getElementById('detailImage').src = gameDetail.image;
    document.getElementById('detailCreator').textContent = gameDetail.creator;
    document.getElementById('detailEndTime').textContent = gameDetail.endTime;
    document.getElementById('detailCommission').textContent = gameDetail.commission + '%';
    document.getElementById('detailPrizePool').textContent = Number(gameDetail.prizePool).toLocaleString() + tokenText;
    
     
    const bettingOptions = document.getElementById('bettingOptions');
    bettingOptions.innerHTML = gameDetail.options.map((option, index) => `
        <div class="option-item" data-option="${index}">
            <div class="option-text">${option.text}</div>
            <div class="option-stats">
                <div class="option-percentage">${option.percentage}%</div>
                <div class="option-amount">${option.amount.toLocaleString()}${tokenText}</div>
            </div>
        </div>
    `).join('');
    
     
    document.getElementById('totalParticipants').textContent = gameDetail.stats.participants;
    document.getElementById('totalBets').textContent = gameDetail.stats.totalBets.toLocaleString();
    document.getElementById('averageBet').textContent = gameDetail.stats.averageBet;
    document.getElementById('timeRemaining').textContent = gameDetail.stats.timeRemaining;
    
     
    bindOptionEvents();
    
     
    bindBettingEvents();
}

 
function bindOptionEvents() {
    const optionItems = document.querySelectorAll('.option-item');
    const selectedOptionSpan = document.getElementById('selectedOption');
    const placeBetBtn = document.getElementById('placeBetBtn');
    
    optionItems.forEach(item => {
        item.addEventListener('click', () => {
             
            optionItems.forEach(opt => opt.classList.remove('selected'));
            
             
            item.classList.add('selected');
            
             
            const optionText = item.querySelector('.option-text').textContent;
            selectedOptionSpan.textContent = optionText;
            
             
            placeBetBtn.disabled = false;
            
             
            updateExpectedReturn();
        });
    });
}

 
function bindBettingEvents() {
    const betAmountInput = document.getElementById('betAmount');
    const placeBetBtn = document.getElementById('placeBetBtn');
    
     
    const newBetAmountInput = betAmountInput.cloneNode(true);
    betAmountInput.parentNode.replaceChild(newBetAmountInput, betAmountInput);
    
    const newPlaceBetBtn = placeBetBtn.cloneNode(true);
    placeBetBtn.parentNode.replaceChild(newPlaceBetBtn, placeBetBtn);
    
     
    const betInput = document.getElementById('betAmount');
    const betBtn = document.getElementById('placeBetBtn');
    
     
    betInput.addEventListener('input', updateExpectedReturn);
    
     
    betBtn.addEventListener('click', (e) => {
        console.log('投注按钮被点击了！');
        e.preventDefault();
        e.stopPropagation();
        
        const selectedOption = document.querySelector('.option-item.selected');
        const betAmount = parseFloat(betInput.value);
        
        console.log('选中的选项:', selectedOption);
        console.log('投注金额:', betAmount);
        
        if (!selectedOption || !betAmount || betAmount <= 0) {
            showNotification(getNotificationText('betting-validation-error'), 'warning');
            return;
        }
        
         
        if (!window.isWalletConnected()) {
            showNotification(getNotificationText('wallet-connect-required-bet'), 'warning');
            return;
        }
        
         
        placeBet(selectedOption, betAmount);
    });
}

 
function updateExpectedReturn() {
    const selectedOption = document.querySelector('.option-item.selected');
    const betAmount = parseFloat(document.getElementById('betAmount').value) || 0;
    const expectedReturnSpan = document.getElementById('expectedReturn');
    const placeBetBtn = document.getElementById('placeBetBtn');
    
    if (selectedOption && betAmount > 0) {
        const percentage = parseFloat(selectedOption.querySelector('.option-percentage').textContent);
         
        const expectedReturn = (betAmount * (100 / percentage)).toFixed(2);
        const tokensSuffix = getNotificationText('tokens-suffix');
        expectedReturnSpan.textContent = expectedReturn + tokensSuffix;
        
         
        placeBetBtn.disabled = false;
    } else {
        expectedReturnSpan.textContent = getNotificationText('zero-tokens');
        
         
        placeBetBtn.disabled = true;
    }
}

 
async function placeBet(selectedOption, betAmount) {
    const optionText = selectedOption.querySelector('.option-text').textContent;
    
    try {
         
        showWarningModal();
        
         
        document.getElementById('betAmount').value = '';
        document.getElementById('selectedOption').textContent = getNotificationText('please-select-option');
        document.getElementById('expectedReturn').textContent = getNotificationText('zero-tokens');
        document.getElementById('placeBetBtn').disabled = true;
        document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
        
    } catch (error) {
        console.error('投注失败:', error);
        showNotification(getNotificationText('betting-failed'), 'error');
    }
}

 
function calculateTimeRemaining(endTime) {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    
    const currentLanguage = localStorage.getItem('language') || 'en';
    const currentTranslations = getTranslations()[currentLanguage] || getTranslations()['en'];
    
    if (diff <= 0) {
        return currentTranslations['game-status-ended'] || 'Ended';
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
        return `${days}${currentTranslations['time-unit-day'] || 'd'} ${hours}${currentTranslations['time-unit-hour'] || 'h'}`;
    } else if (hours > 0) {
        return `${hours}${currentTranslations['time-unit-hour'] || 'h'}`;
    } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${minutes}${currentTranslations['time-unit-minute'] || 'm'}`;
    }
}

 
function initMyPredictions() {
    const myPredictionsLink = document.getElementById('my-predictions-link');
    
    if (myPredictionsLink) {
        myPredictionsLink.addEventListener('click', (e) => {
            e.preventDefault();
            
             
            if (!window.ethereum || !window.ethereum.selectedAddress) {
                showWarningModal(
                    '需要连接钱包',
                    '请先连接您的钱包',
                    '查看预测记录需要验证您的身份，请先连接MetaMask钱包后再试。'
                );
                return;
            }
            
             
            showMyPredictions();
        });
    }
}

 
function showMyPredictions() {
     
     
    console.log('显示我的预测页面');
    
     
    showWarningModal(
        'warning-title',
        'warning-message',
        'my-predictions-warning-desc'
    );
}

 
function initLeaderboard() {
    const leaderboardLink = document.getElementById('leaderboard-link');
    
    if (leaderboardLink) {
        leaderboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            
             
            showWarningModal(
                'warning-title',
                'warning-message',
                'leaderboard-warning-desc'
            );
        });
    }
}

 
function initChatRoom() {
    const chatRoomBtn = document.getElementById('chat-room-btn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatModalOverlay = document.getElementById('chatModalOverlay');
    
    if (chatRoomBtn) {
        chatRoomBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
             
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
    
     
    chatModalOverlay.style.display = 'flex';
    chatModal.style.display = 'flex';
    
     
    chatLoading.style.display = 'flex';
    chatContent.style.display = 'none';
    
     
    setTimeout(() => {
        chatLoading.style.display = 'none';
        chatContent.style.display = 'flex';
        
         
        initChatContent();
    }, 2000);  
}

function closeChatRoom() {
    const chatModal = document.getElementById('chatModal');
    const chatModalOverlay = document.getElementById('chatModalOverlay');
    
    chatModalOverlay.style.display = 'none';
    chatModal.style.display = 'none';
}

function initChatContent() {
     
    initChatTabs();
    
     
    generateUserList();
    
     
    generateChatMessages();
    
     
    initChatInput();
    
     
    updateOnlineCount();
}

function initChatTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
             
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
             
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
    
     
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function initChatInput() {
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendBtn');
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    
     
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage('我', 'https://api.dicebear.com/7.x/avataaars/svg?seed=me', message);
            chatInput.value = '';
            
             
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
            alert(getNotificationText('chat-image-dev'));
            break;
        case 'gif':
            alert(getNotificationText('chat-gif-dev'));
            break;
        case 'redpack':
            alert(getNotificationText('chat-redpack-dev'));
            break;
    }
    
    chatInput.focus();
}

function updateOnlineCount() {
    const onlineCountElement = document.getElementById('onlineCount');
    let count = 127;  
    
     
    setInterval(() => {
        const change = Math.floor(Math.random() * 5) - 2;  
        count = Math.max(100, Math.min(200, count + change));  
        onlineCountElement.textContent = count;
    }, 10000);  
}

 
function initLanguage() {
    const languageToggle = document.querySelector('.language-toggle');
    const langText = document.querySelector('.lang-text');
    
     
    let currentLanguage = localStorage.getItem('language') || 'en';
    
     
    applyLanguage(currentLanguage);
    updateLanguageButton(currentLanguage, langText);
    
     
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'zh' : 'en';
            applyLanguage(currentLanguage);
            updateLanguageButton(currentLanguage, langText);
            localStorage.setItem('language', currentLanguage);
        });
    }
}

function updateLanguageButton(language, langTextElement) {
    if (langTextElement) {
        langTextElement.textContent = language === 'en' ? '中文' : 'EN';
    }
}

function applyLanguage(language) {
    const translations = getTranslations();
    
     
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[language] && translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });
    
     
    document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });
    
     
    document.querySelectorAll('[data-lang-alt]').forEach(element => {
        const key = element.getAttribute('data-lang-alt');
        if (translations[language] && translations[language][key]) {
            element.alt = translations[language][key];
        }
    });
    
     
    updatePageMeta(language);
    
     
    if (typeof renderCurrentPage === 'function') {
        renderCurrentPage();
    }
    
     
    const detailModal = document.getElementById('detailModal');
    if (detailModal && detailModal.classList.contains('show')) {
         
        const gameTitle = document.getElementById('detailTitle');
        if (gameTitle && gameTitle.dataset.gameName && gameTitle.dataset.gameIndex) {
            const gameName = gameTitle.dataset.gameName;
            const gameIndex = parseInt(gameTitle.dataset.gameIndex);
            const gameDetail = generateGameDetail(gameName, gameIndex);
            populateGameDetail(gameDetail);
        }
    }
}

 
function updatePageMeta(language) {
    const metaData = {
        en: {
            title: 'FunBet - BSC-based Decentralized Prediction Platform',
            description: 'FUNBET - BSC-based decentralized prediction platform, experience sports, cryptocurrency, esports and other diversified prediction games',
            keywords: 'prediction platform,BSC,DeFi,blockchain,sports prediction,cryptocurrency,esports',
            ogTitle: 'FunBet - Fun Prediction Platform',
            ogDescription: 'BSC-based decentralized prediction platform for faster and cheaper prediction experience'
        },
        zh: {
            title: 'FunBet - 基于BSC的去中心化预测平台',
            description: 'FUNBET - 基于BSC的去中心化预测平台，体验体育、加密货币、电竞等多元化预测游戏',
            keywords: '预测平台,BSC,DeFi,区块链,体育预测,加密货币,电竞',
            ogTitle: 'FunBet - 趣味预测平台',
            ogDescription: '基于BSC的去中心化预测平台，更快更省钱的预测体验'
        }
    };
    
    const data = metaData[language];
    if (data) {
         
        const titleElement = document.getElementById('page-title');
        if (titleElement) titleElement.textContent = data.title;
        
         
        const descElement = document.getElementById('meta-description');
        if (descElement) descElement.setAttribute('content', data.description);
        
         
        const keywordsElement = document.getElementById('meta-keywords');
        if (keywordsElement) keywordsElement.setAttribute('content', data.keywords);
        
         
        const ogTitleElement = document.getElementById('og-title');
        if (ogTitleElement) ogTitleElement.setAttribute('content', data.ogTitle);
        
         
        const ogDescElement = document.getElementById('og-description');
        if (ogDescElement) ogDescElement.setAttribute('content', data.ogDescription);
        
         
        const twitterTitleElement = document.getElementById('twitter-title');
        if (twitterTitleElement) twitterTitleElement.setAttribute('content', data.ogTitle);
        
         
        const twitterDescElement = document.getElementById('twitter-description');
        if (twitterDescElement) twitterDescElement.setAttribute('content', data.ogDescription);
    }
}

function getTranslations() {
    return {
        en: {
             
            'prediction-market': 'Prediction Market',
            'leaderboard': 'Leaderboard',
            'my-predictions': 'My Predictions',
            'publish': 'Publish Prediction',
            'connect-wallet': 'Connect Wallet',
            
             
            'hero-subtitle': 'Smart Prediction Platform',
            'hero-title': 'FunBet\nPredict Everything',
            'hero-description': 'Blockchain-based decentralized prediction platform, participate in global hot events betting, experience transparent and fair pool + commission model',
            'start-prediction': 'Start Prediction',
            'chat-room': 'Chat Room',
            
             
            'search-placeholder': 'Search prediction markets...',
            'category-all': 'All',
            'category-sports': 'Sports',
            'category-finance': 'Finance & Blockchain',
            'category-gaming': 'Gaming & Esports',
            'category-social': 'Social Trends',
            'category-entertainment': 'Random Entertainment',
            'category-knowledge': 'Knowledge & Prediction',
            'category-other': 'Other',
            
             
            'banner-title-1': '🎯 Social Entertainment Center',
            'banner-desc-1': 'FunBet is not just a DApp. It\'s a social entertainment center.',
            'banner-title-2': '💎 Predict What You Know & Love',
            'banner-desc-2': 'Predict what you know and love: Sports, Crypto, Esports, Pop Culture!',
            'banner-title-3': '🚀 Faster & Cheaper',
            'banner-desc-3': 'Tired of high fees? FunBet is built on BSC for faster and cheaper predictions.',
            
             
            'hot-predictions-title': '🎮 Hot Predictions',
            'hot-predictions-subtitle': 'Discover the latest and hottest predictions, participate to win rich rewards',
            'view-all-btn': 'View All',
            
             
            'copyright-text': '© 2025 Funbet All Rights Reserved',
            
             
            'chat-connecting': 'Connecting to chat room...',
            
             
            'warning-title': 'Notice',
            'warning-message': 'Currently unavailable during internal phase',
            'warning-desc': 'The current betting is in the internal phase and cannot accept bets temporarily.',
            'warning-confirm': 'Got it',
            
             
            'my-predictions-warning-desc': 'The My Predictions feature is temporarily unavailable during the internal phase.',
            
             
            'leaderboard-warning-desc': 'The Leaderboard feature is temporarily unavailable during the internal phase.',
            
             
            'wallet-required-title': 'Wallet Connection Required',
            'wallet-required-message': 'Please connect your wallet first',
            'wallet-required-predictions-desc': 'Viewing prediction records requires identity verification. Please connect your MetaMask wallet first.',
            'wallet-required-chat-desc': 'The chat room feature requires identity verification. Please connect your MetaMask wallet first.',
            
             
            'zero-tokens': '0 Tokens',
            'tokens-suffix': ' Tokens',
            
             
            'chat-room-title': 'FUNBET Chat Room',
            'online': 'Online',
            'chat-input-placeholder': 'Type a message... Press Enter to send',
            'chat-users-tab': 'Users',
            'chat-channels-tab': 'Channels',
            'chat-room-lobby': 'Lobby',
            'chat-room-football': 'Football Prediction',
            'chat-room-basketball': 'Basketball Prediction',
            'chat-room-stock': 'Stock Prediction',
            
             
            'game-status-ended': 'Ended',
            'game-prize-pool': 'Prize Pool',
            'game-category-default': 'Prediction',
            
             
            'prev-page': 'Previous',
            'next-page': 'Next',
            
             
            'publish-prediction-title': 'Publish Prediction',
            'upload-image-label': 'Upload Image',
            'click-upload-image': 'Click to upload image',
            'upload-image-hint': 'Support JPG, PNG formats, 1:1 ratio, max 100KB',
            'prediction-title-label': 'Prediction Title',
            'prediction-title-placeholder': 'e.g.: Will BNB break $1200 by tomorrow 12 PM?',
            'options-setting-label': 'Options Setting',
            'option-1-placeholder': 'Option 1: Yes',
            'option-2-placeholder': 'Option 2: No',
            'add-option-btn': '+ Add Option',
            'end-time-label': 'End Time',
            'commission-rate-label': 'Commission Rate (%)',
            'commission-rate-placeholder': '0-5%',
            'prediction-type-label': 'Prediction Type',
            'please-select': 'Please select',
            'objective-event': 'Objective Event',
            'subjective-event': 'Subjective Event',
            'verification-method-label': 'Event Verification Method',
            'auto-verification': 'Auto Verification',
            'vote-verification': 'Vote Verification',
            'deposit-label': 'Deposit (Optional)',
            'deposit-placeholder': 'To incentivize honest behavior',
            'prediction-fee-notice': 'Prediction fee requires 1000 tokens',
            'cancel-btn': 'Cancel',
            'publish-prediction-btn': 'Publish Prediction',
            
             
            'prediction-details-title': 'Prediction Details',
            'creator-label': 'Creator:',
            'total-prize-pool-label': 'Total Prize Pool:',
            'participate-prediction-title': 'Participate in Prediction',
            'my-bet-title': 'My Bet',
            'selected-option-label': 'Selected Option: ',
            'please-select-option': 'Please select an option first',
            'bet-amount-label': 'Bet Amount:',
            'bet-amount-placeholder': 'Enter bet amount',
            'tokens': 'Tokens',
            'expected-return-label': 'Expected Return: ',
            'confirm-bet-btn': 'Confirm Bet',
            'prediction-stats-title': 'Prediction Statistics',
            'participants-count-label': 'Participants',
            'total-bets-label': 'Total Bets',
            'average-bet-label': 'Average Bet',
            'time-remaining-label': 'Time Remaining',
            
             
            'time-unit-day': ' day',
            'time-unit-hour': ' hour',
            'time-unit-minute': ' minute',
            
             
            'prediction-image-alt': 'Prediction Image',
            
             
            'image-format-error': 'Please upload JPG, PNG, GIF or WebP format images',
            'image-size-error': 'Image size cannot exceed 100KB',
            'image-ratio-error': 'Please upload images with aspect ratio close to 1:1',
            'image-upload-success': 'Image uploaded successfully',
            'image-format-invalid': 'Invalid image format, please select again',
            'image-deleted': 'Image deleted',
            
             
            'chat-image-dev': '图片上传功能开发中...',
            'chat-gif-dev': 'GIF功能开发中...',
            'chat-redpack-dev': '红包功能开发中...',
            
             
            'max-options-error': '最多只能添加6个选项',
            'min-options-error': '至少需要2个选项',
            'publishing-prediction': '正在发布预测...',
            'publish-success': '预测发布成功！',
            'publish-failed': '发布失败，请重试',
            
             
            'betting-validation-error': '请选择选项并输入有效的投注金额',
            'betting-failed': '投注失败，请重试',
            
             
            'wallet-connect-required-publish': 'Please connect wallet to publish prediction',
            'wallet-connect-success': 'Wallet connected successfully!',
            'wallet-authorize-required': 'Please authorize connection in wallet',
            'wallet-install-metamask': 'Please install MetaMask wallet first',
            'wallet-connection-rejected': 'User rejected connection request',
            'wallet-connection-failed': 'Wallet connection failed, please try again',
            'wallet-disconnected': 'Wallet disconnected',
            'wallet-account-switched': 'Account switched',
            'wallet-network-switched': 'Network switched',
            'wallet-connect-required': 'Please connect wallet first',
            'wallet-connect-required-bet': 'Please connect wallet to participate in betting'
        },
        zh: {
             
            'prediction-market': '预测市场',
            'leaderboard': '排行榜',
            'my-predictions': '我的预测',
            'publish': '发布预测',
            'connect-wallet': '连接钱包',
            
             
            'hero-subtitle': '智能预测平台',
            'hero-title': 'FunBet\n万物皆可预测',
            'hero-description': '基于区块链的去中心化预测平台，参与全球热点事件竞猜，体验透明公正的彩池+佣金模式',
            'start-prediction': '开始预测',
            'chat-room': '聊天室',
            
             
            'search-placeholder': '搜索预测市场...',
            'category-all': '全部',
            'category-sports': '体育类',
            'category-finance': '金融与区块链',
            'category-gaming': '游戏与电竞类',
            'category-social': '社交热点类',
            'category-entertainment': '随机娱乐类',
            'category-knowledge': '知识与预测类',
            'category-other': '其他',
            
             
            'banner-title-1': '🎯 社交娱乐中心',
            'banner-desc-1': 'FunBet不只是一个DApp。它是一个社交娱乐中心。',
            'banner-title-2': '💎 预测您所知所爱',
            'banner-desc-2': '预测您所知所爱： 体育、加密货币、电竞、流行文化！',
            'banner-title-3': '🚀 更快更省钱',
            'banner-desc-3': '厌倦高费用？FunBet基于BSC，预测更快更省钱。',
            
             
            'hot-predictions-title': '🎮 热门预测',
            'hot-predictions-subtitle': '发现最新最热门的预测，参与其中赢取丰厚奖励',
            'view-all-btn': '查看全部',
            
             
            'copyright-text': '© 2025 Funbet 版权所有',
            
             
            'chat-connecting': '正在连接聊天室...',
            
             
            'warning-title': '温馨提示',
            'warning-message': '内盘阶段暂时无法参与',
            'warning-desc': '当前竞猜处于内盘阶段，暂时无法接受投注。',
            'warning-confirm': '我知道了',
            
             
            'my-predictions-warning-desc': '当前竞猜处于内盘阶段，我的预测功能暂时无法使用。',
            
             
            'leaderboard-warning-desc': '当前竞猜处于内盘阶段，排行榜功能暂时无法使用。',
            
             
            'wallet-required-title': '需要连接钱包',
            'wallet-required-message': '请先连接您的钱包',
            'wallet-required-predictions-desc': '查看预测记录需要验证您的身份，请先连接MetaMask钱包后再试。',
            'wallet-required-chat-desc': '聊天室功能需要验证您的身份，请先连接MetaMask钱包后再试。',
            
             
            'zero-tokens': '0 代币',
            'tokens-suffix': ' 代币',
            
             
            'chat-room-title': 'FUNBET 聊天室',
            'online': '在线',
            'chat-input-placeholder': '输入消息...按回车发送',
            'chat-users-tab': '用户',
            'chat-channels-tab': '频道',
            'chat-room-lobby': '大厅',
            'chat-room-football': '足球预测',
            'chat-room-basketball': '篮球预测',
            'chat-room-stock': '股市预测',
            
             
            'game-status-ended': '已结束',
            'game-prize-pool': '总奖池',
            'game-category-default': '预测',
            
             
            'prev-page': '上一页',
            'next-page': '下一页',
            
             
            'publish-prediction-title': '发布预测',
            'upload-image-label': '上传图片',
            'click-upload-image': '点击上传图片',
            'upload-image-hint': '支持 JPG、PNG 等格式，比例1:1，不超过100KB',
            'prediction-title-label': '竞猜标题',
            'prediction-title-placeholder': '例如：BNB是否在明晚12点突破1200美金？',
            'options-setting-label': '选项设置',
            'option-1-placeholder': '选项1：是',
            'option-2-placeholder': '选项2：否',
            'add-option-btn': '+ 添加选项',
            'end-time-label': '截止时间',
            'commission-rate-label': '佣金率 (%)',
            'commission-rate-placeholder': '0-5%',
            'prediction-type-label': '预测类型',
            'please-select': '请选择',
            'objective-event': '客观事件',
            'subjective-event': '主观事件',
            'verification-method-label': '事件验证方式',
            'auto-verification': '自动验证',
            'vote-verification': '投票验证',
            'deposit-label': '保证金 (可选)',
            'deposit-placeholder': '用于激励庄家诚信',
            'prediction-fee-notice': '预测手续费需支付1000代币',
            'cancel-btn': '取消',
            'publish-prediction-btn': '发布预测',
            
             
            'prediction-details-title': '竞猜详情',
            'creator-label': '创建者:',
            'total-prize-pool-label': '总奖池:',
            'participate-prediction-title': '参与竞猜',
            'my-bet-title': '我的投注',
            'selected-option-label': '选择的选项: ',
            'please-select-option': '请先选择一个选项',
            'bet-amount-label': '投注金额:',
            'bet-amount-placeholder': '输入投注金额',
            'tokens': '代币',
            'expected-return-label': '预期收益: ',
            'confirm-bet-btn': '确认投注',
            'prediction-stats-title': '竞猜统计',
            'participants-count-label': '参与人数',
            'total-bets-label': '总投注次数',
            'average-bet-label': '平均投注额',
            'time-remaining-label': '剩余时间',
            
             
            'time-unit-day': '天',
            'time-unit-hour': '小时',
            'time-unit-minute': '分钟',
            
             
            'prediction-image-alt': '竞猜图片',
            
             
            'image-format-error': '请上传 JPG、PNG、GIF 或 WebP 格式的图片',
            'image-size-error': '图片大小不能超过 100KB',
            'image-ratio-error': '请上传比例接近 1:1 的图片',
            'image-upload-success': '图片上传成功',
            'image-format-invalid': '图片格式错误，请重新选择',
            'image-deleted': '图片已删除',
            
             
            'chat-image-dev': 'Image upload feature is under development...',
            'chat-gif-dev': 'GIF feature is under development...',
            'chat-redpack-dev': 'Red packet feature is under development...',
            
             
            'max-options-error': 'Maximum 6 options allowed',
            'min-options-error': 'At least 2 options required',
            'publishing-prediction': 'Publishing prediction...',
            'publish-success': 'Prediction published successfully!',
            'publish-failed': 'Publishing failed, please try again',
            
             
            'betting-validation-error': 'Please select an option and enter a valid bet amount',
            'betting-failed': 'Betting failed, please try again',
            
             
            'wallet-connect-required-publish': '请先连接钱包才能发布预测',
            'wallet-connect-success': '钱包连接成功!',
            'wallet-authorize-required': '请在钱包中授权连接',
            'wallet-install-metamask': '请先安装MetaMask钱包',
            'wallet-connection-rejected': '用户拒绝了连接请求',
            'wallet-connection-failed': '连接钱包失败，请重试',
            'wallet-disconnected': '钱包已断开连接',
            'wallet-account-switched': '账户已切换',
            'wallet-network-switched': '网络已切换',
            'wallet-connect-required': '请先连接钱包',
            'wallet-connect-required-bet': '请先连接钱包才能参与投注'
        }
    };
}
