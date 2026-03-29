let homepageItems, uploadItems, startBtn;

function initGame() {
    homepageItems = document.getElementsByClassName('homepage');
    uploadItems = document.getElementsByClassName('upload');
    startBtn = document.getElementById('startBtn');
    backBtn = document.getElementById('backBtn');

    startHome();
    startBtn.addEventListener('click', startUpload);
    backBtn.addEventListener('click', startHome);
}

function startHome() {
    console.log("starting home")
    for (i of homepageItems) {
        i.style.display = '';
    }
    for (i of uploadItems) {
        i.style.display = '';
    }
}

function startUpload() {
    for (i of homepageItems) {
        i.style.display = 'none';
    }
    for (i of uploadItems) {
        i.style.display = 'flex';
    }
}
initGame();