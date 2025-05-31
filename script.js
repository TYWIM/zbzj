document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const startScreen = document.getElementById('start-screen');
    const loadingScreen = document.getElementById('loading-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const wastedTimeSpan = document.getElementById('wasted-time');
    const loadingText = document.getElementById('loading-text');
    const progressFill = document.querySelector('.progress-fill');
    const particles = document.querySelectorAll('.particle');
    const shareButtons = document.querySelectorAll('.share-buttons i');
    
    // 加载文本数组
    const loadingTexts = [
        "正在初始化资本系统",
        "正在连接全球资本市场",
        "正在分析用户行为模式",
        "正在计算最优剥削方案",
        "正在部署资本陷阱",
        "正在激活资本收割机制",
        "正在准备最终做局",
        "正在调用华尔街算法",
        "正在加载金融衍生品",
        "正在构建资本迷宫",
        "正在实施财富转移",
        "正在收割韭菜"
    ];
    
    // 初始化粒子动画
    function initParticles() {
        particles.forEach(particle => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }
    
    // 初始化分享按钮
    function initShareButtons() {
        shareButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('分享功能即将上线，敬请期待！');
            });
        });
    }
    
    // 初始化
    initParticles();
    initShareButtons();
    
    let startTime;
    let loadingInterval;
    let currentTextIndex = 0;
    
    // 添加按钮悬停音效
    function addButtonSoundEffects(button) {
        button.addEventListener('mouseenter', function() {
            playSound('hover');
        });
        
        button.addEventListener('click', function() {
            playSound('click');
        });
    }
    
    // 简单的音效系统
    function playSound(type) {
        // 这里可以实现真实的音效，但为了简化，我们只做一个空函数
        // 如果需要真实音效，可以使用 Audio API
        console.log(`播放${type}音效`);
    }
    
    // 为按钮添加音效
    addButtonSoundEffects(startBtn);
    addButtonSoundEffects(restartBtn);
    
    // 开始按钮点击事件
    startBtn.addEventListener('click', function() {
        startTime = new Date().getTime();
        startScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.classList.remove('hidden');
            
            // 重置进度条
            progressFill.style.animation = 'none';
            progressFill.offsetHeight; // 触发重绘
            progressFill.style.animation = 'progress 5s forwards cubic-bezier(0.1, 0.5, 0.2, 1)';
            
            // 更新加载文本
            loadingInterval = setInterval(function() {
                currentTextIndex = (currentTextIndex + 1) % loadingTexts.length;
                loadingText.textContent = loadingTexts[currentTextIndex];
            }, 1200);
            
            // 随机设置加载时间（6-12秒）
            const loadingTime = Math.floor(Math.random() * 6000) + 6000;
            
            setTimeout(function() {
                clearInterval(loadingInterval);
                showResult();
            }, loadingTime);
        }, 300); // 添加短暂延迟以实现平滑过渡
    });
    
    // 显示结果
    function showResult() {
        const endTime = new Date().getTime();
        const wastedSeconds = Math.floor((endTime - startTime) / 1000);
        
        loadingScreen.classList.add('hidden');
        
        // 添加短暂延迟以实现平滑过渡
        setTimeout(() => {
            resultScreen.classList.remove('hidden');
            
            // 数字增长动画
            animateNumber(0, wastedSeconds, 1500, function(value) {
                wastedTimeSpan.textContent = Math.floor(value);
            });
        }, 300);
    }
    
    // 数字增长动画函数
    function animateNumber(start, end, duration, callback) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const value = start + (end - start) * easeOutExpo(progress);
            
            callback(value);
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        function easeOutExpo(x) {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // 重新开始按钮点击事件
    restartBtn.addEventListener('click', function() {
        resultScreen.classList.add('hidden');
        
        // 添加短暂延迟以实现平滑过渡
        setTimeout(() => {
            startScreen.classList.remove('hidden');
            currentTextIndex = 0;
            loadingText.textContent = loadingTexts[0];
            
            // 重新初始化粒子
            initParticles();
        }, 300);
    });
    
    // 添加键盘快捷键
    document.addEventListener('keydown', function(event) {
        // 按下空格键或回车键开始
        if ((event.code === 'Space' || event.code === 'Enter') && !startScreen.classList.contains('hidden')) {
            startBtn.click();
        }
        // 按下R键重新开始
        else if (event.code === 'KeyR' && !resultScreen.classList.contains('hidden')) {
            restartBtn.click();
        }
    });
});