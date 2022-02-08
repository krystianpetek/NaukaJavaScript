document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector("#start-button");
    const width = 10;

    // the tetrominoes
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
    let random = Math.floor(Math.random()*theTetrominoes.length);  
    let current = theTetrominoes[random][currentRotation];

    // draw the first rotation in the first tetromino
    function draw()
    {
        current.forEach(index => {
            squares[currentPosition+index].classList.add('tetromino');
        });
    }
    
    function undraw(){
        current.forEach(index => {
            squares[currentPosition+index].classList.remove('tetromino');
        });
    }  

    // move down tetromino every seconds
    timerId = setInterval(moveDown, 1000);
    function moveDown()
    {
        undraw();
        currentPosition+=width;
        draw();
        freeze();
    };

    // freeze function
    function freeze(){
        if(current.some(item => squares[currentPosition + item + width].classList.contains('taken'))){
            current.forEach(item => squares[currentPosition+item].classList.add('taken'));
            random = Math.floor(Math.random()*theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;
        }
    };
});

// https://youtu.be/rAUn1Lom6dw?list=PLWKjhJtqVAbleDe3_ZA8h3AO2rXar-q2V&t=3091