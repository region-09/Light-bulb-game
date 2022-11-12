// Components
const playGround = document.querySelector('.edit');
// const checker = document.querySelector('#check');

const firstPart = document.querySelector("#start");
const inputName = document.querySelector("#name");
const submit = document.querySelector("#submit");
const secondPart = document.querySelector("#secondPart");
const timer = document.querySelector("#timer");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
const savedDisplay = document.querySelector("#savedGames");
const congrats = document.querySelector("#congrats");
const menu = document.querySelector('#menu');
const restart = document.querySelector('#restart');

// levels
const levelEasy = document.querySelector('#levelEasy');
const levelMedium = document.querySelector('#levelMedium');
const levelHard = document.querySelector('#levelHard');

let intervalId;

// Black tiles
const blackEasy = [['*', '*', '*','1', '*', '*','*'],
                   ['*', '0', '*','*', '*', '2','*'],
                   ['*', '*', '*','*', '*', '*','*'],
                   [' ', '*', '*',' ', '*', '*',' '],
                   ['*', '*', '*','*', '*', '*','*'],
                   ['*', ' ', '*','*', '*', '2','*'],
                   ['*', '*', '*','3', '*', '*','*']];
const blackMedium = [['*', '*', '0','*', ' ', '*','*'],
                     ['*', '*', '*','*', '*', '*','*'],
                     [' ', '*', ' ','*', '3', '*',' '],
                     ['*', '*', '*','1', ' ', '*','*'],
                     ['2', '*', ' ','*', ' ', '*',' '],
                     ['*', '*', '*','*', '*', '*','*'],
                     ['*', '*', ' ','*', '2', '*','*']];
const blackHard = [['*', ' ', '*','*', '*', '*','*', '*', '*', '*'],
                   ['*', '*', '*','*', '*', '3','*', '2', '*', ' '],
                   ['*', '0', ' ','*', '*', '*','*', ' ', '*', '*'],
                   ['*', '*', '*','*', ' ', '*','*', '*', '*', '*'],
                   ['*', '1', '*','*', ' ', '1',' ', '*', '*', '*'],
                   ['*', '*', '*',' ', ' ', ' ','*', '*', '3', '*'],
                   ['*', '*', '*','*', '*', ' ','*', '*', '*', '*'],
                   ['*', '*', '1','*', '*', '*','*', '0', ' ', '*'],
                   ['3', '*', ' ','*', '0', '*','*', '*', '*', '*'],
                   ['*', '*', '*','*', '*', '*','*', '*', '0', '*']];

const sample = [['*', ' ', '*','*', '*', '*','*', '*', '*', '*'],
                   ['*', '*', '*','*', '*', '3','*', '2', '*', ' '],
                   ['*', '0', ' ','*', '*', '*','*', ' ', '*', '*'],
                   ['*', '*', '*','*', ' ', '*','*', '*', '*', '*'],
                   ['*', '1', '*','*', ' ', '1',' ', '*', '*', '*'],
                   ['*', '*', '*',' ', ' ', ' ','*', '*', '3', '*'],
                   ['*', '*', '*','*', '*', ' ','*', '*', '*', '*'],
                   ['*', '*', '1','*', '*', '*','*', '0', ' ', '*'],
                   ['3', '*', ' ','*', '0', '*','*', '*', '*', '*'],
                   ['*', '*', '*','*', '*', '*','*', '*', '0', '*']];
const sample2 = [['*', '*', '*','1', '*', '*','*'],
                ['*', '0', '*','*', '*', '2','*'],
                ['*', '*', '*','*', '*', '*','*'],
                [' ', '*', '*',' ', '*', '*',' '],
                ['*', '*', '*','*', '*', '*','*'],
                ['*', ' ', '*','*', '*', '2','*'],
                ['*', '*', '*','3', '*', '*','*']];

// Our matrix
let grid = []
let gameType = -1;

restart.addEventListener('click', function (e) {
    location.reload();
});

// reading name input
document.addEventListener('keydown', function(e) {
  // console.log(e.key);
  if (e.target.matches('input')) {
    const specialKeys = ['Tab', 'ArrowLeft', 'ArrowRight', 'Backspace'];
    if (!isNaN(e.key) && !specialKeys.includes(e.key)) {
      e.preventDefault();
    }
  }
});

document.addEventListener('click', function (e) {
    if (e.target.id === 'levelEasy') {
        playGround.removeAttribute('hidden');
        secondPart.setAttribute('hidden', true);
        const s = JSON.parse(JSON.parse(localStorage.getItem('easy'))[0]);
        const sec = JSON.parse(localStorage.getItem('easy'))[2];
        let min = parseInt(sec.substring(0, 2)) * 60 + parseInt(sec.substring(3, 5));
        grid = s;
        gameType = 1;
        genTable(grid);
        clearInterval(intervalId);
        startTimer(min, timer);
    }if (e.target.id === 'levelMedium') {
        playGround.removeAttribute('hidden');
        secondPart.setAttribute('hidden', true);
        const s = JSON.parse(JSON.parse(localStorage.getItem('medium'))[0]);
        const sec = JSON.parse(localStorage.getItem('medium'))[2];
        let min = parseInt(sec.substring(0, 2)) * 60 + parseInt(sec.substring(3, 5));
        grid = s;
        gameType = 2;
        genTable(grid);
        clearInterval(intervalId);
        startTimer(min, timer);
    }if (e.target.id === 'levelHard') {
        playGround.removeAttribute('hidden');
        secondPart.setAttribute('hidden', true);
        const s = JSON.parse(JSON.parse(localStorage.getItem('hard'))[0]);
        const sec = JSON.parse(localStorage.getItem('hard'))[2];
        let min = parseInt(sec.substring(0, 2)) * 60 + parseInt(sec.substring(3, 5));
        grid = s;
        gameType = 3;
        genTable(grid);
        clearInterval(intervalId);
        startTimer(min, timer);
    }
});

menu.addEventListener('click', function(e) {
    if (inputName.value != '') {       
        congrats.setAttribute('hidden', true);
        updater();
        secondPart.removeAttribute('hidden');
        playGround.setAttribute('hidden', true);
        clearInterval(intervalId);
    }
});

submit.addEventListener("click", function (e) {
    updater();
    timer.textContent = "Player:" + inputName.value;
});

easy.addEventListener("click", function (e) {
    gameType = 1;
    getCopy(gameType);
    console.log("grid", grid);
    console.log(blackEasy);
    genTable(grid);
    playGround.removeAttribute('hidden');
    secondPart.setAttribute('hidden', true);
    clearInterval(intervalId)
    startTimer(0, timer);
});
medium.addEventListener("click", function(e) {
    playGround.removeAttribute('hidden');
    secondPart.setAttribute('hidden', true);
    gameType = 2;
    getCopy(gameType);
    genTable(grid);
    clearInterval(intervalId)
    startTimer(0, timer);
});
hard.addEventListener("click", function (e) {
    playGround.removeAttribute('hidden');
    secondPart.setAttribute('hidden', true);
    gameType = 3;
    getCopy(gameType);
    genTable(grid);
    clearInterval(intervalId)
    startTimer(0, timer);
});

// Event Handlers
playGround.addEventListener('click', function (e) {
    console.log(blackEasy);
    if (e.target.matches('td')) {
        // read
        const {x, y} = xyCoordinate(e.target);
        // console.log(hasLamp(grid, x, y));
        if (grid[y][x] === '*' || grid[y][x] === '#') {
            grid[y][x] = '^';
            lightRow(grid, y, x);
        }else if (grid[y][x] === '^') {
            grid[y][x] = '*';
            lightRow(grid, y, x);
        }else if (grid[y][x] === '@') {
            grid[y][x] = '#';
            lightRow(grid, y, x);
        }
        genTable(grid);
        if (win()) {
            congrats.removeAttribute('hidden');
            clearInterval(intervalId);
            if (gameType == 1) {
                localStorage.removeItem('easy');
            }else if (gameType == 2) {
                localStorage.removeItem('medium');
            }else {
                localStorage.removeItem('hard');
            }
            playGround.setAttribute('hidden', true);
        }
    }
})

// Timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    intervalId = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = "Player name:" + inputName.value + ', Timer:' + minutes + ":" + seconds;
      timer++;
      if (gameType == 1) {
        localStorage.setItem('easy', JSON.stringify([JSON.stringify(grid), inputName.value, minutes + ':' + seconds]));
      }
      if (gameType == 2) {
        localStorage.setItem('medium', JSON.stringify([JSON.stringify(grid), inputName.value, minutes + ':' + seconds]));
      }
      if (gameType == 3) {
        localStorage.setItem('hard', JSON.stringify([JSON.stringify(grid), inputName.value, minutes + ':' + seconds]));
      }
    }, 1000);
}

// Helper
function xyCoordinate(td) {
    const x = td.cellIndex;
    const tr = td.parentNode;
    const y = tr.sectionRowIndex;
    return {x, y};
}

// HTML generator
function genTable(grid) {
    let s = '';
    for (let i = 0; i < grid.length; i++) {
        s += '<tr>';
        for (let j = 0; j < grid[i].length; j++) {
            switch (grid[i][j]) {
                case '*':
                    s += '<td></td>';
                    break;
                case ' ':
                    s += `<td style="background-color:black">${grid[i][j]}</td>`;
                    break;
                case '^':
                    s += `<td style="background-color: #FFFF66; background-image: url('light.png')"></td>`;
                    break;
                case '#':
                    s += `<td style="background-color: #FFFF66;"></td>`;
                    break;
                case '@':
                    s += `<td style="background-color: red;  background-image: url('light.png')"></td>`;
                    break;
                default:
                    let cn = 0;
                    if (i - 1 >= 0 && grid[i - 1][j] == '^') {
                        cn++;
                    }if (i + 1 < grid.length && grid[i + 1][j] == '^') {
                        cn++;
                    }if (j - 1 >= 0 && grid[i][j - 1] == '^') {
                        cn++;
                    }if (j + 1 < grid.length && grid[i][j + 1] == '^') {
                        cn++;
                    }
                    if (cn === parseInt(grid[i][j])) {
                        s += `<td style="background-color:black; color: green">${grid[i][j]}</td>`;
                    }else {
                        s += `<td style="background-color:black; color: white">${grid[i][j]}</td>`;
                    }
                    break;
            }
        }
        s += '</tr>';
    }
    playGround.innerHTML = s;
}

function lightRow(grid) {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (!hasLamp(grid, j, i) && grid[i][j] === '#') {
                grid[i][j] = '*';
            }
            if (hasLamp(grid, j, i) && grid[i][j] === '^' || grid[i][j] === '@') {
                grid[i][j] = '@';
            }
            if (!hasLamp(grid, j, i) && grid[i][j] === '@') {
                grid[i][j] = '^';
            }
            // lightenings
            if (grid[j][i] === '^' || grid[j][i] === '@') {
                for (let ii = i + 1; ii < grid.length; ii++) {
                    if (grid[j][ii] !== '*' && grid[j][ii] !== '#' ) {
                        break;
                    }
                    grid[j][ii] = '#';
                }
                for (let ii = i - 1; ii >= 0; ii--) {
                    if (grid[j][ii] !== '*' && grid[j][ii] !== '#') {
                        break;
                    }
                    grid[j][ii] = '#';
                }
                // col up, down
                for (let jj = j + 1; jj < grid.length; jj++) {
                    if (grid[jj][i] !== '*' && grid[jj][i] !== '#') {
                        break;
                    }
                    grid[jj][i] = '#'
                }
                for (let jj = j - 1; jj >= 0; jj--) {
                    if (grid[jj][i] !== '*' && grid[jj][i] !== '#') {
                        break;
                    }
                    grid[jj][i] = '#'
                }
            }
        }
    }
}

function hasLamp(grid, x, y) {
    // row right, left
    for (let i = x + 1; i < grid.length; i++) {
        if (grid[y][i] !== '*' && grid[y][i] !== '#' && grid[y][i] !== '^'  && grid[y][i] !== '@') {
            break;
        }
        if (grid[y][i] === '^' || grid[y][i] === '@') {
            return true;
        }
    }
    for (let i = x - 1; i >= 0; i--) {
        if (grid[y][i] !== '*' && grid[y][i] !== '#' && grid[y][i] !== '^'  && grid[y][i] !== '@') {
            break;
        }
        if (grid[y][i] === '^' || grid[y][i] === '@') {
            return true;
        }
    }
    // col up, down
    for (let i = y + 1; i < grid.length; i++) {
        if (grid[i][x] !== '*' && grid[i][x] !== '#' && grid[i][x] !== '^'  && grid[i][x] !== '@') {
            break;
        }
        if (grid[i][x] === '^' || grid[i][x] === '@') {
            return true;
        }
    }
    for (let i = y - 1; i >= 0; i--) {
        if (grid[i][x] !== '*' && grid[i][x] !== '#' && grid[i][x] !== '^'  && grid[i][x] !== '@') {
            break;
        }
        if (grid[i][x] === '^' || grid[i][x] === '@') {
            return true;
        }
    }
    return false;
}

function win() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid[i][j] == '@' || grid[i][j] == '*') {
                return false;
            }
            if (grid[i][j] == '1' || grid[i][j] == '2' || grid[i][j] == '3'
            || grid[i][j] == '4' || grid[i][j] == '0') {
                let cnt = 0;
                if (i - 1 >= 0 && grid[i - 1][j] == '^') {
                    cnt++;
                }
                if (i + 1 < grid.length && grid[i + 1][j] == '^') {
                    cnt++;
                }
                if (j + 1 < grid.length && grid[i][j + 1] == '^') {
                    cnt++;
                }
                if (j - 1 >= 0 && grid[i][j - 1] == '^') {
                    cnt++;
                }
                if (cnt != parseInt(grid[i][j])) {
                    return false;
                }
            }
        }
    }
    return true;
}

// Add somethings to menu, restart
function updater() {
    if (inputName.value !== '') {
        secondPart.removeAttribute('hidden');
        firstPart.setAttribute('hidden', true);
    }
    if (localStorage.getItem('easy') != null || localStorage.getItem('medium') != null ||
    localStorage.getItem('hard') != null) {
        savedDisplay.removeAttribute('hidden');
        if (localStorage.getItem('easy') != null) {
            gameType = 1;
            levelEasy.removeAttribute('hidden');
            let t = JSON.parse(localStorage.getItem('easy'));
            console.log("t", t);
            levelEasy.textContent = "Name: " + t[1] + ', level: easy, ' + "time elapsed:" + t[2];
        }else {
            levelEasy.setAttribute('hidden', true);
        }
        if (localStorage.getItem('medium') != null) {
            gameType = 2;
            levelMedium.removeAttribute('hidden');
            let t = JSON.parse(localStorage.getItem('medium'));
            levelMedium.textContent = "Name: " + t[1] + ', level: medium, ' + "time elapsed:" + t[2];
        }else {
            levelMedium.setAttribute('hidden', true);
        }
        if (localStorage.getItem('hard') != null) {
            gameType = 3;
            levelHard.removeAttribute('hidden');
            let t = JSON.parse(localStorage.getItem('hard'));
            levelHard.textContent = "Name: " + t[1] + ', level: hard, ' + "time elapsed:" + t[2];
        }else {
            levelHard.setAttribute('hidden', true);
        }
    }else {
        levelEasy.setAttribute('hidden', true);
        levelMedium.setAttribute('hidden', true);
        levelHard.setAttribute('hidden', true);
    }
}

function getCopy(gameType) {
    grid = sample2;
    if (gameType == 1) {
        for (let i = 0; i < blackEasy.length; i++) {
            for (let j = 0; j < blackEasy.length; j++) {
                grid[i][j] = blackEasy[i][j].slice();
            }
        }
    }else if (gameType == 2) {
        for (let i = 0; i < blackMedium.length; i++) {
            for (let j = 0; j < blackMedium.length; j++) {
                grid[i][j] = blackMedium[i][j].slice();
            }
        }
    }else {
        grid = sample;
        for (let i = 0; i < blackHard.length; i++) {
            for (let j = 0; j < blackHard.length; j++) {
                grid[i][j] = blackHard[i][j].slice();
            }
        }
    }
}