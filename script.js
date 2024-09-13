let startTime;
let timeout;
let isClickable = false;
let bestTime = null; // Variable to store best result

const message = document.getElementById('message');
const result = document.getElementById('result');
const factElement = document.getElementById('fact');
const tryAgainButton = document.getElementById('try-again-button');
const startButton = document.getElementById('start-button');

// Reaction time facts
const facts = [
    "The average human reaction time is around 250 milliseconds.",
    "Reaction times tend to slow down after the age of 24.",
    "Athletes can have reaction times as fast as 150 milliseconds.",
    "Caffeine can boost your reaction speed.",
    "Tiredness can slow down reaction time by 10-30%.",
    "Men tend to have faster reaction times than women.",
    "Your reaction time is quicker in the morning than in the evening.",
    "Reaction times improve with practice!",
    "Distractions, such as background noise, can worsen your reaction time.",
    "People under stress tend to have slower reactions.",
    "Usain Bolt, the world record holder in the 100m sprint, has one of the fastest reaction times — around 150 milliseconds.",
    "The fastest recorded reaction time was just 101 milliseconds.",
    "There is a limit to human reaction time: even under perfect conditions, the brain needs at least 100 milliseconds to process a visual stimulus.",
    "Reaction times vary during the day, with the peak occurring in the middle of the afternoon.",
    "Some animals, like flies, have ultra-fast reaction times that allow them to dodge threats almost instantly.",
    "Reaction time decreases with age, slowing by 1-2 milliseconds per year after the age of 24.",
    "Playing video games that require fast reflexes can improve your reaction time by up to 10%.",
    "Jet fighter pilots often have reaction times under 200 milliseconds due to intense training.",
    "Hand reactions are typically 20-30 milliseconds faster than foot reactions.",
    "Samurai warriors were said to have uniquely fast reaction times, helping them excel in combat."
];

// Check if there's a stored best time in localStorage
if (localStorage.getItem('bestTime')) {
    bestTime = parseInt(localStorage.getItem('bestTime'));
    document.getElementById('best-result').textContent = `Best result: ${bestTime} ms`;
}

// Function to start a new round
// Function to start a new round
function startNewRound() {
    result.textContent = "";
    message.textContent = "Wait until the button turns green...";
    startButton.classList.remove('green'); // Убираем класс green перед новым раундом
    startButton.textContent = "Start"; // Восстанавливаем текст кнопки на "Start"
    tryAgainButton.style.display = "none";

    const randomDelay = Math.random() * 3000 + 2000; // Delay of 2-5 seconds

    timeout = setTimeout(function() {
        console.log("The button is now green");
        message.textContent = "Click the button!";
        startButton.classList.add('green'); // Добавляем класс green для кнопки
        startButton.textContent = "Click!"; // Изменяем текст кнопки на "Click!"
        startTime = new Date().getTime(); // Record the time
        isClickable = true; // Now the button can be clicked
    }, randomDelay);
}


// Event listener for the start button
startButton.addEventListener('click', function() {
    if (isClickable) {
        const reactionTime = new Date().getTime() - startTime;
        result.textContent = `Your reaction time: ${reactionTime} ms`;

        // Update best time if the current one is better
        if (bestTime === null || reactionTime < bestTime) {
            bestTime = reactionTime;
            document.getElementById('best-result').textContent = `Best result: ${bestTime} ms`;

            // Save best time to localStorage
            localStorage.setItem('bestTime', bestTime);
        }

        resetGame();
    } else if (!isClickable && message.textContent !== "Wait until the button turns green...") {
        clearTimeout(timeout); // Stop the timer
        result.textContent = "You clicked too early!";
        resetGame();
    }
});

// Reset game after a click
function resetGame() {
    isClickable = false; // Disable clicks until the next round
    startButton.classList.remove('green');
    tryAgainButton.style.display = "block";

    // Show a random fact
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factElement.textContent = randomFact;
}

// Event listener for the try again button
tryAgainButton.addEventListener('click', startNewRound);

// Start the first round
startNewRound();
