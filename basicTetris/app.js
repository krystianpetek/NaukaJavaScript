document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector("#start-button");
    const width = 10;
    let nextRandom = 0;
    let timerId;
    // the tetrominoes1
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ];
    const zTetromino = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1]
    ];
    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];
    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];
    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];
    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;
    // randomly select a tetromino and its first rotation
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

    let color;
    // draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino', color);
        });
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino', color);
        });
    }

    // // move down tetromino every seconds
    // timerId = setInterval(moveDown, 300);

    // assign functions to keyCode
    function control(e) {
        if (e.keyCode === 37)
            moveLeft();
        else if (e.keyCode === 38)
            rotate();
        else if (e.keyCode === 39)
            moveRight();
        else if (e.keyCode === 40)
            moveDown();
    }
    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    };

    // freeze function
    function freeze() {
        if (current.some(item => squares[currentPosition + item + width].classList.contains('taken'))) {
            current.forEach(item => squares[currentPosition + item].classList.add('taken'));
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
            displayShape();
        }
    };

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if (!isAtLeftEdge)
            currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken')))
            currentPosition += 1;
        draw();
    }
    function moveRight() {
        undraw();
        const isTheRightEdge = current.some(index => (currentPosition + index) % width === width-1)

        if (!isTheRightEdge)
            currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken')))
            currentPosition -= 1;
        draw();
    }


    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length)
            currentRotation = currentRotation % current.length;
        current = theTetrominoes[random][currentRotation];

        // const isPossibleToRotate = current.some(index => (currentPosition + index) % width === 0)
        // if (isPossibleToRotate)
        //     currentPosition += 1;

        draw();
    }



    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;
    const upNextTetrominoes = [
        [1,displayWidth+1,displayWidth*2+1,2], // l
        [0,displayWidth,displayWidth+1,displayWidth*2+1], // z
        [1,displayWidth, displayWidth+1, displayWidth+2], // t
        [0,1,displayWidth,displayWidth+1], // o
        [1,displayWidth+1, displayWidth*2+1, displayWidth*3+1] // i
    ];
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        });
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
        });
    }

    //start button
    startBtn.addEventListener('click',() =>{
        if(timerId){
            clearInterval(timerId);
            timerId = null;
        }
        else{
            draw();
            timerId = setInterval(moveDown,1000);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            displayShape();
        }
    });
    
});