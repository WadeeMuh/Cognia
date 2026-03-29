console.log('Happy developing ✨')

let homepageItems, startBtn;

function initGame() {
    homepageItems = document.getElementsByClassName('homepage');
    startBtn = document.getElementById('startBtn');
    console.log(startBtn)
    startBtn.addEventListener('click', startGame);
}

function startGame() {
    for (i of homepageItems) {
        i.style.display = 'none';
    }
}
initGame();