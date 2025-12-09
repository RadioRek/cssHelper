const board = document.querySelector('.espacioSnake');
const grid = 20;
let letters = ['S', 'N', 'A', 'K', 'E', ' '];
let currentLetterIndex = 0;
let gameLoop = null;


// posiciones de la serpiente
let snake = [
    { x: 4, y: 7 },
    { x: 3, y: 7 },
    { x: 2, y: 7 }
];

// elementos de la serpiente en el DOM
const snakeElements = [];
let foodElement = null;

// vector de dirección
let dir = { x: 1, y: 0 };

// comida
let food = { x: 5, y: 5 };

document.addEventListener('keydown', e => {
    if (e.key === 'w' && dir.y !== 1) {
        dir = { x: 0, y: -1 };
    }
    else if (e.key === 's' && dir.y !== -1) {
        dir = { x: 0, y: 1 };
    }
    else if (e.key === 'a' && dir.x !== 1) {
        dir = { x: -1, y: 0 };
    }
    else if (e.key === 'd' && dir.x !== -1) {
        dir = { x: 1, y: 0 };
    }
});


function update() {
    const head = {
        x: snake[0].x + dir.x,
        y: snake[0].y + dir.y
    };

    // colisión con paredes
    if (head.x < 0 || head.y < 0 || head.x >= grid || head.y >= grid) {
        clearInterval(gameLoop);
        loose();
        return;
    }

    // colisión con el cuerpo
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            clearInterval(gameLoop);
            loose();
            return;
        }
    }

    snake.unshift(head);

    // comer comida
    if (head.x === food.x && head.y === food.y) {
        // si come, generar nueva comida y no quitar la cola
        food = {
            x: Math.floor(Math.random() * grid),
            y: Math.floor(Math.random() * grid)
        };
    } else {
        // si no come, quitar la cola
        snake.pop();
    }

    draw();
}


function initDraw() {
    // crear segmentos iniciales
    snake.forEach(() => {
        const seg = document.createElement('div');


        let elem = document.createElement('div');
        elem.textContent = letters[currentLetterIndex];
        elem.className = 'white';
        elem.classList.add('parrafoSmallest');
        elem.classList.add('animTextoParpadear');


        currentLetterIndex = (currentLetterIndex + 1) % letters.length;
        seg.className = 'segmento';
        seg.style.display = 'flex';
        seg.style.alignItems = 'center';
        seg.style.justifyContent = 'center';
        seg.appendChild(elem);

        board.appendChild(seg);
        snakeElements.push(seg);
    });

    // crear comida
    foodElement = document.createElement('div');
    foodElement.className = 'comida';
    board.appendChild(foodElement);
}

function draw() {

    // mover comida
    foodElement.style.left = food.x * grid + 'px';
    foodElement.style.top = food.y * grid + 'px';

    // si la serpiente creció, crear nuevos elementos
    while (snakeElements.length < snake.length) {

        const seg = document.createElement('div');
        seg.className = 'segmento';
        seg.style.display = 'flex';
        seg.style.alignItems = 'center';
        seg.style.justifyContent = 'center';

        let elem = document.createElement('div');
        elem.textContent = letters[currentLetterIndex];
        elem.className = 'white';
        elem.classList.add('parrafoSmallest');
        elem.classList.add('animTextoParpadear');

        currentLetterIndex = (currentLetterIndex + 1) % letters.length;
        seg.appendChild(elem);
        board.appendChild(seg);
        snakeElements.push(seg);
    }

    // actualizar posiciones
    snake.forEach((part, i) => {
        snakeElements[i].style.border = 'none';

        if (i === 0) {
            if (dir.x === 1) {
                snakeElements[i].style.borderRadius = '0 10px 10px 0';
                snakeElements[i].style.borderRight = '1px solid #F25912';
                snakeElements[i].style.borderTop = '1px solid #F25912';
                snakeElements[i].style.borderBottom = '1px solid #F25912';
                snakeElements[i].style.borderLeft = 'none';
            } else if (dir.x === -1) {
                snakeElements[i].style.borderRadius = '10px 0 0 10px';
                snakeElements[i].style.borderLeft = '1px solid #F25912';
                snakeElements[i].style.borderTop = '1px solid #F25912';
                snakeElements[i].style.borderBottom = '1px solid #F25912';
                snakeElements[i].style.borderRight = 'none';
            } else if (dir.y === 1) {
                snakeElements[i].style.borderRadius = '0 0 10px 10px';
                snakeElements[i].style.borderBottom = '1px solid #F25912';
                snakeElements[i].style.borderLeft = '1px solid #F25912';
                snakeElements[i].style.borderRight = '1px solid #F25912';
                snakeElements[i].style.borderTop = 'none';
            } else if (dir.y === -1) {
                snakeElements[i].style.borderRadius = '10px 10px 0 0';
                snakeElements[i].style.borderTop = '1px solid #F25912';
                snakeElements[i].style.borderLeft = '1px solid #F25912';
                snakeElements[i].style.borderRight = '1px solid #F25912';
                snakeElements[i].style.borderBottom = 'none';
            }
        } else {
            let prev = snake[i - 1];

            if (i + 1 >= snake.length) {
                // last segment
                if (part.x < prev.x) {
                    // moving right
                    snakeElements[i].style.borderRadius = '10px 0 0 10px';
                    snakeElements[i].style.borderLeft = '1px solid #F25912';
                    snakeElements[i].style.borderTop = '1px solid #F25912';
                    snakeElements[i].style.borderBottom = '1px solid #F25912';
                    snakeElements[i].style.borderRight = 'none';
                } else if (part.x > prev.x) {
                    // moving left
                    snakeElements[i].style.borderRadius = '0 10px 10px 0';
                    snakeElements[i].style.borderRight = '1px solid #F25912';
                    snakeElements[i].style.borderTop = '1px solid #F25912';
                    snakeElements[i].style.borderBottom = '1px solid #F25912';
                    snakeElements[i].style.borderLeft = 'none';
                } else if (part.y < prev.y) {
                    // moving down
                    snakeElements[i].style.borderRadius = '10px 10px 0 0';
                    snakeElements[i].style.borderTop = '1px solid #F25912';
                    snakeElements[i].style.borderLeft = '1px solid #F25912';
                    snakeElements[i].style.borderRight = '1px solid #F25912';
                    snakeElements[i].style.borderBottom = 'none';
                } else if (part.y > prev.y) {
                    // moving up
                    snakeElements[i].style.borderRadius = '0 0 10px 10px';
                    snakeElements[i].style.borderBottom = '1px solid #F25912';
                    snakeElements[i].style.borderLeft = '1px solid #F25912';
                    snakeElements[i].style.borderRight = '1px solid #F25912';
                    snakeElements[i].style.borderTop = 'none';
                }
            } else {
                // next segment
                let next = snake[i + 1];

                // detectar si es recto en X o en Y
                if (prev.y === part.y && next.y === part.y) {
                    snakeElements[i].style.borderRadius = '0';
                    snakeElements[i].style.borderTop = '1px solid #F25912';
                    snakeElements[i].style.borderBottom = '1px solid #F25912';
                    snakeElements[i].style.borderLeft = 'none';
                    snakeElements[i].style.borderRight = 'none';
                } else if (prev.x === part.x && next.x === part.x) {
                    snakeElements[i].style.borderRadius = '0';
                    snakeElements[i].style.borderLeft = '1px solid #F25912';
                    snakeElements[i].style.borderRight = '1px solid #F25912';
                    snakeElements[i].style.borderTop = 'none';
                    snakeElements[i].style.borderBottom = 'none';
                } else {

                    // buaaa que putisimo dolor de cabeza hacer esto, PD: los LLM tienen retrasito

                    // Prev: {x: 0, y: 10}
                    // Part: {x: 1, y: 10}
                    // Next: {x: 1, y: 11}
                    if ((part.y < next.y && part.x === next.x) && (part.x > prev.x && part.y === prev.y)) {
                        snakeElements[i].style.borderRadius = '0 10px 0 0';
                        snakeElements[i].style.borderBottom = ' none';
                        snakeElements[i].style.borderLeft = 'none';
                        snakeElements[i].style.borderRight = '1px solid #F25912';
                        snakeElements[i].style.borderTop = '1px solid #F25912';
                    }

                    // Prev: {x: 19, y: 14}
                    // Part: {x: 18, y: 14}
                    // Next: {x: 18, y: 13}
                    if ((part.x < prev.x && part.y === prev.y) && (part.x === next.x && part.y > next.y)) {
                        snakeElements[i].style.borderRadius = '0 0 0 10px';
                        snakeElements[i].style.borderLeft = '1px solid #F25912';
                        snakeElements[i].style.borderTop = 'none';
                        snakeElements[i].style.borderRight = 'none';
                        snakeElements[i].style.borderBottom = '1px solid #F25912';
                    }

                    // Prev: {x: 6, y: 19}
                    // Part: {x: 6, y: 18}
                    // Next: {x: 7, y: 18}
                    if ((part.x === prev.x && part.y < prev.y) && (part.x < next.x && part.y === next.y)) {
                        snakeElements[i].style.borderRadius = '10px 0 0 0';
                        snakeElements[i].style.borderRight = 'none';
                        snakeElements[i].style.borderBottom = 'none'
                        snakeElements[i].style.borderLeft = '1px solid #F25912';
                        snakeElements[i].style.borderTop = '1px solid #F25912';
                    }

                    // Prev: {x: 19, y: 9}
                    // Part: {x: 18, y: 9}
                    // Next: {x: 18, y: 10}
                    if ((part.x < prev.x && part.y === prev.y) && (part.x === next.x && part.y < next.y)) {
                        snakeElements[i].style.borderRadius = '10px 0 0 0';
                        snakeElements[i].style.borderLeft = '1px solid #F25912';
                        snakeElements[i].style.borderRight = 'none';
                        snakeElements[i].style.borderTop = '1px solid #F25912';
                        snakeElements[i].style.borderBottom = 'none';
                    }

                    // Prev: {x: 10, y: 19}
                    // Part: {x: 10, y: 18}
                    // Next: {x: 9, y: 18}
                    if ((part.x === prev.x && part.y < prev.y) && (part.x > next.x && part.y === next.y)) {
                        snakeElements[i].style.borderRadius = '0 10px 0 0';
                        snakeElements[i].style.borderLeft = 'none';
                        snakeElements[i].style.borderRight = '1px solid #F25912';
                        snakeElements[i].style.borderTop = '1px solid #F25912';
                        snakeElements[i].style.borderBottom = 'none';

                    }


                    // Prev: {x: 15, y: 0}
                    // Part: {x: 15, y: 1}
                    // Next: {x: 14, y: 1}
                    if ((part.x === prev.x && part.y > prev.y) && (part.x > next.x && part.y === next.y)) {
                        snakeElements[i].style.borderRadius = '0 0 10px 0';
                        snakeElements[i].style.borderTop = 'none';
                        snakeElements[i].style.borderRight = '1px solid #F25912';
                        snakeElements[i].style.borderBottom = '1px solid #F25912';
                        snakeElements[i].style.borderLeft = 'none';
                    }


                    // Prev: {x: 8, y: 0}
                    // Part: {x: 8, y: 1}
                    // Next: {x: 9, y: 1}
                    if ((part.x === prev.x && part.y > prev.y) && (part.x < next.x && part.y === next.y)) {
                        snakeElements[i].style.borderRadius = '0 0 0 10px';
                        snakeElements[i].style.borderTop = 'none';
                        snakeElements[i].style.borderRight = 'none';
                        snakeElements[i].style.borderBottom = '1px solid #F25912';
                        snakeElements[i].style.borderLeft = '1px solid #F25912';
                    }


                    // Prev: {x: 0, y: 14}
                    // Part: {x: 1, y: 14}
                    // Next: {x: 1, y: 13}
                    if ((part.x > prev.x && part.y === prev.y) && (part.x === next.x && part.y > next.y)) {
                        snakeElements[i].style.borderRadius = '0 0 10px 0';
                        snakeElements[i].style.borderBottom = '1px solid #F25912';
                        snakeElements[i].style.borderLeft = 'none';
                        snakeElements[i].style.borderTop = 'none';
                        snakeElements[i].style.borderRight = '1px solid #F25912';
                    }
                }
            }

        }


        const seg = snakeElements[i];
        seg.style.left = (part.x * grid) + 'px';
        seg.style.top = (part.y * grid) + 'px';
    });


}


function loose() {
    let loosingScreen = document.getElementById('loosingScreenSnake');
    let finalScore = document.getElementById('finalScoreSnake');
    let resetButton = document.getElementById('resetButtonSnake');
    let loosingMessage = document.getElementById('loosingMessageSnake');

    let lang = document.documentElement.getAttribute('lang');

    if (lang === 'en') {
        loosingMessage.textContent = 'You lost!';
        finalScore.textContent = `Your final score is: ${snake.length}`;
        resetButton.textContent = 'Play Again!';
    } else {
        loosingMessage.textContent = '¡Perdiste!';
        finalScore.textContent = `Tu puntaje final es: ${snake.length}`;
        resetButton.textContent = '¡Jugar de nuevo!';
    }

    loosingScreen.style.display = 'flex';
}


function resetGame() {
    snake = [
        { x: 4, y: 7 },
        { x: 3, y: 7 },
        { x: 2, y: 7 }
    ];
    dir = { x: 1, y: 0 };
    food = { x: 5, y: 5 };
    currentLetterIndex = 0;

    // limpiar segmentos existan o no
    snakeElements.forEach(seg => {
        if (board.contains(seg)) board.removeChild(seg);
    });
    snakeElements.length = 0;

    // limpiar comida si existe
    if (foodElement && board.contains(foodElement)) {
        board.removeChild(foodElement);
    }
    foodElement = null;

    initDraw();
    draw();
    gameLoop = setInterval(update, 100);

    document.getElementById('loosingScreenSnake').style.display = 'none';
}



