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
    speed: 3, 
    traffic: 3
};

function getQuantityElements( heightElement ){
    return document.documentElement.clientHeight / heightElement + 1; 
}

start.addEventListener('click' , () => {
    start.classList.add('hide');
    for(let i=0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * 100) + 'px';
        line.y = i * 100;// для движения полос 
        gameArea.appendChild(line);
    }

    for( let i=0; i < getQuantityElements(100 * setting.traffic); i++){
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.top = enemy.y +'px';
        enemy.style.left = (Math.floor(Math.random() * (gameArea.offsetWidth - 50))) + 'px';
        enemy.style.background = 'transparent url("/image/enemy2.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
    }
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame); //анимация  - отрисовка в следующем фрейме
});

document.addEventListener('keydown', (event) => {
    event.preventDefault(); //отмена стандартных настроек на клавиши в браузере
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    event.preventDefault(); //отмена стандартных настроек на клавиши в браузере
    keys[event.key] = false;
});

function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach((line) => {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if(line.y >= document.documentElement.clientHeight){
            line.y = -80;
        }
    });
}

function moveEnemy() { 
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item) => {
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });

 
 }


function playGame() {
    if(setting.start){
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x+= setting.speed;
        }
        if(keys.ArrowUp && setting.y > 0){
            setting.y -= setting.speed;
        }

        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);//рекурсия
    }
}