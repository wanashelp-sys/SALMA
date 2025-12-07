// ========================================
// Salma Math Lab - Main JavaScript
// ========================================

// Global Variables
let currentGame = null;
let score = 0;
let totalQuestions = 0;
let currentQuestion = 0;

// ========================================
// Utility Functions
// ========================================

/**
 * Scroll to games section smoothly
 */
function scrollToGames() {
    const gamesSection = document.querySelector('.games-section');
    gamesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Generate random number between min and max (inclusive)
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffle array
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Play success sound effect (using Web Audio API)
 */
function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // C5
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

/**
 * Play error sound effect
 */
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
}

/**
 * Show confetti effect
 */
function showConfetti() {
    const confettiCount = 50;
    const colors = ['#e36e6a', '#eb9662', '#f7d05b', '#e7deef', '#f4ccab'];
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.opacity = '1';
    confetti.style.zIndex = '9999';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => confetti.remove();
}

// ========================================
// Game Management
// ========================================

/**
 * Start a game based on game type
 */
function startGame(gameType) {
    currentGame = gameType;
    score = 0;
    totalQuestions = 0;
    currentQuestion = 0;
    
    const gameContainer = document.getElementById('game-container');
    const gameTitle = document.getElementById('game-title');
    const gameContent = document.getElementById('game-content');
    
    // Show game container
    gameContainer.style.display = 'block';
    gameContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Set game title and load content
    switch(gameType) {
        case 'numbers':
            gameTitle.textContent = '🔢 تعرّفي على الأرقام';
            loadNumberRecognitionGame();
            break;
        case 'place-value':
            gameTitle.textContent = '📊 القيمة المنزلية';
            loadPlaceValueGame();
            break;
        case 'operations':
            gameTitle.textContent = '➕➖ الجمع والطرح';
            loadOperationsGame();
            break;
        case 'clock':
            gameTitle.textContent = '⏰ قراءة الساعة';
            loadClockGame();
            break;
        case 'comparison':
            gameTitle.textContent = '⚖️ المقارنة بين الأعداد';
            loadComparisonGame();
            break;
        case 'counting':
            gameTitle.textContent = '🎈 عدّي معي';
            loadCountingGame();
            break;
        default:
            gameContent.innerHTML = '<p class="text-center">اللعبة قيد التطوير...</p>';
    }
}

/**
 * Close current game and return to main menu
 */
function closeGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.display = 'none';
    currentGame = null;
    
    // Scroll back to games section
    scrollToGames();
}

/**
 * Update score display
 */
function updateScoreDisplay() {
    const scoreElement = document.querySelector('.score-number');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

// ========================================
// Game 1: Number Recognition
// ========================================

function loadNumberRecognitionGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="score-display">
            <h4>النقاط</h4>
            <div class="score-number">${score}</div>
        </div>
        
        <div class="text-center mb-4">
            <p class="lead">اختاري الرقم الصحيح!</p>
        </div>
        
        <div id="question-area"></div>
    `;
    
    generateNumberQuestion();
}

function generateNumberQuestion() {
    const questionArea = document.getElementById('question-area');
    const correctNumber = getRandomNumber(1, 100);
    
    // Generate wrong options
    const options = [correctNumber];
    while (options.length < 4) {
        const wrongNumber = getRandomNumber(1, 100);
        if (!options.includes(wrongNumber)) {
            options.push(wrongNumber);
        }
    }
    
    const shuffledOptions = shuffleArray(options);
    
    questionArea.innerHTML = `
        <div class="number-display">${correctNumber}</div>
        <div class="options-grid">
            ${shuffledOptions.map(num => `
                <button class="option-btn" onclick="checkNumberAnswer(${num}, ${correctNumber})">
                    ${num}
                </button>
            `).join('')}
        </div>
    `;
}

function checkNumberAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnValue = parseInt(btn.textContent.trim());
        
        if (btnValue === correct) {
            btn.classList.add('correct');
        } else if (btnValue === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        score += 10;
        playSuccessSound();
        showConfetti();
    } else {
        playErrorSound();
    }
    
    totalQuestions++;
    updateScoreDisplay();
    
    // Next question after delay
    setTimeout(() => {
        generateNumberQuestion();
    }, 1500);
}

// ========================================
// Game 2: Place Value (Simplified)
// ========================================

function loadPlaceValueGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="score-display">
            <h4>النقاط</h4>
            <div class="score-number">${score}</div>
        </div>
        
        <div class="text-center mb-4">
            <p class="lead">ما هي قيمة الرقم في المنزلة المحددة؟</p>
        </div>
        
        <div id="question-area"></div>
    `;
    
    generatePlaceValueQuestion();
}

function generatePlaceValueQuestion() {
    const questionArea = document.getElementById('question-area');
    const number = getRandomNumber(10, 999);
    const numberStr = number.toString();
    const positions = ['آحاد', 'عشرات', 'مئات'];
    const positionIndex = getRandomNumber(0, numberStr.length - 1);
    const position = positions[positionIndex];
    const correctDigit = parseInt(numberStr[numberStr.length - 1 - positionIndex]);
    
    // Generate options
    const options = [correctDigit];
    while (options.length < 4) {
        const wrongDigit = getRandomNumber(0, 9);
        if (!options.includes(wrongDigit)) {
            options.push(wrongDigit);
        }
    }
    
    const shuffledOptions = shuffleArray(options);
    
    questionArea.innerHTML = `
        <div class="text-center mb-4">
            <div class="number-display" style="font-size: 6rem;">${number}</div>
            <h4 class="mb-4">ما قيمة منزلة <span style="color: var(--color-primary);">${position}</span>؟</h4>
        </div>
        <div class="options-grid">
            ${shuffledOptions.map(digit => `
                <button class="option-btn" onclick="checkPlaceValueAnswer(${digit}, ${correctDigit})">
                    ${digit}
                </button>
            `).join('')}
        </div>
    `;
}

function checkPlaceValueAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnValue = parseInt(btn.textContent.trim());
        
        if (btnValue === correct) {
            btn.classList.add('correct');
        } else if (btnValue === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        score += 15;
        playSuccessSound();
        showConfetti();
    } else {
        playErrorSound();
    }
    
    totalQuestions++;
    updateScoreDisplay();
    
    setTimeout(() => {
        generatePlaceValueQuestion();
    }, 1500);
}

// ========================================
// Game 3: Addition & Subtraction
// ========================================

function loadOperationsGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="score-display">
            <h4>النقاط</h4>
            <div class="score-number">${score}</div>
        </div>
        
        <div class="text-center mb-4">
            <p class="lead">احسبي الناتج الصحيح!</p>
        </div>
        
        <div id="question-area"></div>
    `;
    
    generateOperationsQuestion();
}

function generateOperationsQuestion() {
    const questionArea = document.getElementById('question-area');
    const operation = Math.random() > 0.5 ? '+' : '-';
    
    let num1, num2, correctAnswer;
    
    if (operation === '+') {
        num1 = getRandomNumber(1, 50);
        num2 = getRandomNumber(1, 50);
        correctAnswer = num1 + num2;
    } else {
        num1 = getRandomNumber(10, 50);
        num2 = getRandomNumber(1, num1);
        correctAnswer = num1 - num2;
    }
    
    // Generate options
    const options = [correctAnswer];
    while (options.length < 4) {
        const offset = getRandomNumber(-10, 10);
        const wrongAnswer = correctAnswer + offset;
        if (wrongAnswer > 0 && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    
    const shuffledOptions = shuffleArray(options);
    
    questionArea.innerHTML = `
        <div class="text-center mb-5">
            <div class="number-display" style="font-size: 5rem;">
                ${num1} ${operation} ${num2} = ؟
            </div>
        </div>
        <div class="options-grid">
            ${shuffledOptions.map(num => `
                <button class="option-btn" onclick="checkOperationsAnswer(${num}, ${correctAnswer})">
                    ${num}
                </button>
            `).join('')}
        </div>
    `;
}

function checkOperationsAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnValue = parseInt(btn.textContent.trim());
        
        if (btnValue === correct) {
            btn.classList.add('correct');
        } else if (btnValue === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        score += 10;
        playSuccessSound();
        showConfetti();
    } else {
        playErrorSound();
    }
    
    totalQuestions++;
    updateScoreDisplay();
    
    setTimeout(() => {
        generateOperationsQuestion();
    }, 1500);
}

// ========================================
// Game 4: Clock Reading (Simplified)
// ========================================

function loadClockGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="text-center p-5">
            <h3 class="mb-4">🎯 قريباً</h3>
            <p class="lead">لعبة قراءة الساعة قيد التطوير...</p>
            <p>سنضيف ساعة تفاعلية لتعلم قراءة الوقت!</p>
        </div>
    `;
}

// ========================================
// Game 5: Number Comparison
// ========================================

function loadComparisonGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="score-display">
            <h4>النقاط</h4>
            <div class="score-number">${score}</div>
        </div>
        
        <div class="text-center mb-4">
            <p class="lead">اختاري الإشارة الصحيحة!</p>
        </div>
        
        <div id="question-area"></div>
    `;
    
    generateComparisonQuestion();
}

function generateComparisonQuestion() {
    const questionArea = document.getElementById('question-area');
    const num1 = getRandomNumber(1, 100);
    const num2 = getRandomNumber(1, 100);
    
    let correctSymbol;
    if (num1 > num2) {
        correctSymbol = '>';
    } else if (num1 < num2) {
        correctSymbol = '<';
    } else {
        correctSymbol = '=';
    }
    
    const symbols = ['>', '<', '='];
    
    questionArea.innerHTML = `
        <div class="text-center mb-5">
            <div class="number-display" style="font-size: 4rem;">
                ${num1} __ ${num2}
            </div>
        </div>
        <div class="options-grid">
            ${symbols.map(symbol => `
                <button class="option-btn" onclick="checkComparisonAnswer('${symbol}', '${correctSymbol}')">
                    ${symbol}
                </button>
            `).join('')}
        </div>
    `;
}

function checkComparisonAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnValue = btn.textContent.trim();
        
        if (btnValue === correct) {
            btn.classList.add('correct');
        } else if (btnValue === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        score += 10;
        playSuccessSound();
        showConfetti();
    } else {
        playErrorSound();
    }
    
    totalQuestions++;
    updateScoreDisplay();
    
    setTimeout(() => {
        generateComparisonQuestion();
    }, 1500);
}

// ========================================
// Game 6: Counting
// ========================================

function loadCountingGame() {
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="score-display">
            <h4>النقاط</h4>
            <div class="score-number">${score}</div>
        </div>
        
        <div class="text-center mb-4">
            <p class="lead">كم عدد البالونات؟ 🎈</p>
        </div>
        
        <div id="question-area"></div>
    `;
    
    generateCountingQuestion();
}

function generateCountingQuestion() {
    const questionArea = document.getElementById('question-area');
    const correctCount = getRandomNumber(3, 12);
    
    // Generate balloon emojis
    const balloons = '🎈'.repeat(correctCount);
    
    // Generate options
    const options = [correctCount];
    while (options.length < 4) {
        const wrongCount = getRandomNumber(3, 12);
        if (!options.includes(wrongCount)) {
            options.push(wrongCount);
        }
    }
    
    const shuffledOptions = shuffleArray(options);
    
    questionArea.innerHTML = `
        <div class="text-center mb-4">
            <div style="font-size: 3rem; line-height: 1.5; letter-spacing: 0.5rem;">
                ${balloons}
            </div>
        </div>
        <div class="options-grid">
            ${shuffledOptions.map(num => `
                <button class="option-btn" onclick="checkCountingAnswer(${num}, ${correctCount})">
                    ${num}
                </button>
            `).join('')}
        </div>
    `;
}

function checkCountingAnswer(selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    
    buttons.forEach(btn => {
        btn.disabled = true;
        const btnValue = parseInt(btn.textContent.trim());
        
        if (btnValue === correct) {
            btn.classList.add('correct');
        } else if (btnValue === selected && selected !== correct) {
            btn.classList.add('wrong');
        }
    });
    
    if (selected === correct) {
        score += 10;
        playSuccessSound();
        showConfetti();
    } else {
        playErrorSound();
    }
    
    totalQuestions++;
    updateScoreDisplay();
    
    setTimeout(() => {
        generateCountingQuestion();
    }, 1500);
}

// ========================================
// Initialize
// ========================================

console.log('🎯 معمل سلمى للرياضيات - جاهز للعمل!');
