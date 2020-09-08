const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');

car.classList.add('car');


const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3
};

start.addEventListener('click' , () => {
    start.classList.add('hide');
    setting.start = true;
    requestAnimationFrame(playGame); //анимация  - отрисовка в следующем фрейме

    gameArea.appendChild(car);
});

document.addEventListener('keydown', (event) => {
    event.preventDefault(); //отмена стандартных настроек на клавиши в браузере
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    event.preventDefault(); //отмена стандартных настроек на клавиши в браузере
    keys[event.key] = false;
});


function playGame() {
    console.log('play game');
    if(setting.start){
        requestAnimationFrame(playGame);//рекурсия
    }
}