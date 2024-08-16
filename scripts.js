document.addEventListener('DOMContentLoaded', () => {
    let randomNumber;
    let attempts = 0;
    const maxAttempts = 3;
    let score = 0;
    const scores = [];
    const maxNumber = 100;

    const guessInput = document.getElementById('guess-input');
    const submitButton = document.getElementById('submit-button');
    const message = document.getElementById('message');
    const hintMessage = document.getElementById('hint-message');
    const attemptsLeft = document.getElementById('attempts-left');
    const scoreElement = document.getElementById('score');
    const leaderboard = document.getElementById('leaderboard');
    const restartButton = document.getElementById('restart-button');
    const showHelpButton = document.getElementById('show-help');
    const instructions = document.getElementById('instructions');
    const instructionsMaxNumber = document.getElementById('instructions-max-number');

    const startGame = () => {
        randomNumber = Math.floor(Math.random() * maxNumber) + 1;
        attempts = 0;
        message.textContent = '';
        hintMessage.textContent = '';
        guessInput.disabled = false;
        submitButton.disabled = false;
        restartButton.style.display = 'none';
        attemptsLeft.textContent = `Cəhdlər: ${maxAttempts}`;
        scoreElement.textContent = `Xal: ${score}`;
    };

    const giveHint = (guess) => {
        if (guess < randomNumber) {
            hintMessage.textContent = 'Bu çox azdır.';
        } else if (guess > randomNumber) {
            hintMessage.textContent = 'Bu lap çox oldu.';
        } else {
            hintMessage.textContent = 'Təbriklər siz düz tapdınız!';
        }

        if (randomNumber % 2 === 0) {
            hintMessage.textContent += ' Verilən say cütdür';
        } else {
            hintMessage.textContent += ' Verilən say təkdir.';
        }
    };

    const updateLeaderboard = () => {
        leaderboard.innerHTML = '';
        scores.sort((a, b) => a - b);
        scores.forEach(score => {
            const li = document.createElement('li');
            li.textContent = `Xal: ${score}`;
            leaderboard.appendChild(li);
        });
    };

    submitButton.addEventListener('click', () => {
        const guess = parseInt(guessInput.value, 10);
        if (isNaN(guess) || guess < 1 || guess > maxNumber) {
            message.textContent = '1-dən 100-ə qədər say yazın.';
            return;
        }

        attempts++;
        if (guess === randomNumber) {
            message.textContent = 'Təbriklər! Siz sayı düzgün taparaq qazandınız!';
            score++;
            scoreElement.textContent = `Xal: ${score}`;
            scores.push(score);
            updateLeaderboard();
            guessInput.disabled = true;
            submitButton.disabled = true;
            restartButton.style.display = 'block';
        } else if (attempts >= maxAttempts) {
            message.textContent = `Cavab yalnışdır. Verilən say: ${randomNumber}. Yenidən cəhd edin!`;
            guessInput.disabled = true;
            submitButton.disabled = true;
            restartButton.style.display = 'block';
        } else {
            giveHint(guess);
            attemptsLeft.textContent = `Cəhdlər: ${maxAttempts - attempts}`;
        }
    });

    restartButton.addEventListener('click', startGame);

    showHelpButton.addEventListener('click', () => {
        instructions.style.display = instructions.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    document.getElementById('share-results').addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('Link uğurla kopyalandı');
        }, () => {
            alert('Yenidən cəhd edin');
        });
    });

    startGame(); // Инициализировать игру при загрузке страницы
});

