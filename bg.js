const body = document.querySelector("body");

const IMG_NUMBER = 5;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function getRandom(params) {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init(params) {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();