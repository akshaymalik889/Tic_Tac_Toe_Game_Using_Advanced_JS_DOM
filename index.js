const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// can be X or O
let currentPlayer;

// to track game finished or not
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function to initialise the game
function initGame() 
{
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    //For Make Grid empty on UI
    boxes.forEach((box, index) => {
        box.innerText = "";

        // make cursor pointer
        boxes[index].style.pointerEvents = "all";
 
        //initialise box with css properties again
        // (to remove green color if new game start)
        box.classList = `box box${index+1}`;
    });

    // to hide new Game button in starting
    newGameBtn.classList.remove("active");

    // set current player -X on UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() 
{
    if(currentPlayer === "X")
    currentPlayer = "O";
    
    else
    currentPlayer = "X";
    
    //UI Update to show which player turn
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() 
{
    let answer = "";

    winningPositions.forEach((position) => {

        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) 
        {
            //check if winner is X
            if(gameGrid[position[0]] === "X") 
            answer = "X";
            
            else
            answer = "O";
            
            
            //disable pointer events (if we get our winner so make unclickable)
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner so make green them
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner 
    // (i) show winner on UI
    //(ii) enable newGame button
    if(answer !== "" ) 
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");

        //if one of them already win then simply return
        return; 
    }

    //We know, NO Winner Found, now check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
        fillCount++;
    });

    //board is Filled, so game is TIE
    if(fillCount === 9) 
    {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }

}


// used to fill value X or O
function handleClick(index) 
{
    // check empty box first then fill
    if(gameGrid[index] === "" ) 
    {
        // fill value on UI
        boxes[index].innerText = currentPlayer;

        //change in our grid array
        gameGrid[index] = currentPlayer;

        //when we fill value then cursor not show pointer on that box
        boxes[index].style.pointerEvents = "none";

        //TO swap turn now
        swapTurn();
        
        //check win or not
        checkGameOver();
    }
}

// Event Listner on 9 Boxes when we Click
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

//Event listner on new Game button to make initial values
newGameBtn.addEventListener("click", initGame);