const img = document.querySelectorAll('img');
const form = document.querySelector('form');
const guess = document.querySelector('.guess');
const timer = document.querySelector('.timer');
const championCount = document.querySelector('.championCount');
const facile = document.querySelector('.facile');
const difficile = document.querySelector('.difficile');
const resetGame = document.querySelector('.reset');
const name = document.querySelectorAll('.name');
const imageDiv = document.querySelectorAll('.image');


let count = 159;

resetGame.disabled = true;
guess.disabled = true;
guess.style.cursor = 'not-allowed';
resetGame.style.opacity = 0.2;
resetGame.style.cursor = 'not-allowed';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    img.forEach((image) => {

        if (image.classList.contains('found')) {
            return;
        }

        //if user guess is correct then add opacity to image and count down but if user guess again the same image then alert and dont count down
        if (image.getAttribute('value') === guess.value) {
            image.style.opacity = 1;
            image.classList.add('found');
            count--;
            championCount.innerHTML = count + " Champions";
            guess.value = '';
            image.scrollIntoView({ behavior: 'smooth' });
            
        }

    });

});

function facileMode() {
    let time = "00:10";

    guess.disabled = false;
    guess.style.cursor = 'pointer';
    facile.disabled = true;
    facile.style.backgroundColor = 'grey';
    facile.style.cursor = 'not-allowed';
    difficile.disabled = true;
    difficile.style.backgroundColor = 'grey';
    difficile.style.cursor = 'not-allowed';

    img.forEach((image) => {
        image.style.opacity = 0.2;
    });

    let timerInterval = setInterval(() => {
        let minutes = time.split(":")[0];
        let seconds = time.split(":")[1];

        seconds--;

        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }

        if (minutes < 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            alert("You have found " + (159 - count) + " champions");
            time = "00:00";
            guess.disabled = true;
            facile.style.backgroundColor = 'grey';
            resetGame.disabled = false;
            resetGame.style.opacity = 1;
            resetGame.style.cursor = 'pointer';
            guess.style.cursor = 'not-allowed';
            window.scrollTo(0, 0);
        }

        time = `${minutes}:${seconds}`;
        timer.innerHTML = time;
    }, 1000);
}


function difficileMode() {
    let time = "00:10";

    guess.disabled = false;
    guess.style.cursor = 'pointer';
    difficile.disabled = true;
    difficile.style.backgroundColor = 'grey';
    difficile.style.cursor = 'not-allowed';
    facile.disabled = true;
    facile.style.backgroundColor = 'grey';
    facile.style.cursor = 'not-allowed';

    img.forEach((image) => {
        image.style.opacity = 0;
    });


    let timerInterval = setInterval(() => {
        let minutes = time.split(":")[0];
        let seconds = time.split(":")[1];

        seconds--;

        if (seconds < 0) {
            minutes--;
            seconds = 59;
        }

        if (minutes < 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            alert("You have found " + (159 - count) + " champions");
            time = "00:00";
            guess.disabled = true;
            img.forEach((image) => {
                if(!image.classList.contains('found')) {
                    image.style.opacity = 1;
                    image.style.filter = "sepia(100%)"
                }
            });
            difficile.style.backgroundColor = 'grey';
            resetGame.disabled = false;
            resetGame.style.opacity = 1;
            resetGame.style.cursor = 'pointer';
            guess.style.cursor = 'not-allowed';
        }

        time = `${minutes}:${seconds}`;
        timer.innerHTML = time;
    }, 1000);
}


function reset() {
    location.reload();
}


resetGame.addEventListener('click', reset);
difficile.addEventListener('click', difficileMode);
facile.addEventListener('click', facileMode);