// track game board data and player scores
const gameBoard = (function(){

    let board = ['','','','','','','','',''];

    const createBoard = () => {
        let gameBoardContainer = document.getElementById('gameBoardContainer');

        // clear the gameBoardContainer div of any current squares
        while(gameBoardContainer.firstChild){
            gameBoardContainer.removeChild(gameBoardContainer.firstChild);
        }

        // clear board variable for tracking board
        board = ['','','','','','','','',''];
        displayController.resetDisplay();


        // create a new board of 9 squares
        for(let i=0;i<board.length;i++){
            // add a square to each index for the game board
            let newSquare = document.createElement('div');
            newSquare.classList.add('squares');
            newSquare.id = 'number'+i;
            newSquare.textContent=board[i];

            // add event listener to track score after each click
            newSquare.addEventListener('click', function(e){
                if(player1.turn==true && newSquare.textContent==''){

                    // add an 'X' to the corresponding div, to board array, and player 1 score
                    document.getElementById(e.target.getAttribute('id')).textContent='X';
                    board[e.target.getAttribute('id').charAt(6)]='X';
                    player1.addXToScore(e.target.getAttribute('id').charAt(6));

                    // check for a win or tie, then switch turns
                    displayController.updateRound(player1);
                } else if(player2.turn==true && newSquare.textContent==''){

                    // add a 'O' to the corresponding div, to board array, and player 2 score
                    document.getElementById(e.target.getAttribute('id')).textContent='O';
                    board[e.target.getAttribute('id').charAt(6)]='O';
                    player2.addOToScore(e.target.getAttribute('id').charAt(6));

                    // check for a win or tie, then switch turns
                    displayController.updateRound(player2);
                }
            });

            gameBoardContainer.appendChild(newSquare);
        }
    }

    // check if the entire board has been filled for a tie
    const checkForTie = () => {
        let tieGame=false;
        let count=0;

        for(let i=0;i<board.length;i++){
            if(board[i]!=''){
                count++;
            }
        }
        if(count==9){
            tieGame=true;
        }

        return tieGame;
    }

    let restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', function(){
        player1.resetScore();
        player2.resetScore();
        gameBoard.createBoard();
    });

    return {createBoard,checkForTie};
})();

// control each round for the players as they play until someone wins
const displayController = (function(){

    let gameDisplay = document.createElement('p');
    gameDisplay.textContent='Player 1, your move.';
    document.getElementById('commentaryDisplay').appendChild(gameDisplay);

    const switchTurns = () => {
        if(player1.turn==true){
            player1.turn=false;
            player2.turn=true;
            gameDisplay.textContent='Player 2, your move.';
        } else if(player2.turn==true){
            player1.turn=true;
            player2.turn=false;
            gameDisplay.textContent='Player 1, your move.';
        }
    }
    
    const updateRound = (player) => {

        if(player.checkForWin()==true){
            gameDisplay.textContent=player.name+' wins!';
        } else if(gameBoard.checkForTie()==true){
            gameDisplay.textContent='Its a tie!';
        } else {displayController.switchTurns();}

    }

    // reset game commentary
    const resetDisplay = () => {
        gameDisplay.textContent='Player 1, your move.';
    }

    return {switchTurns,updateRound,resetDisplay};

})();

const Player = (name, turn, score) => {

    // clear player's score on the board
    const resetScore = () => {
        score=['','','','','','','','',''];
    }

    // check score to see if player has winning combination
    const checkForWin = () => {
        let wonGame=false

        if(score[0]!='' && score[1]!='' && score[2]!=''){ // row 1
            wonGame=true;
        } else if(score[3]!='' && score[4]!='' && score[5]!=''){ // row 2
            wonGame=true;
        } else if(score[6]!='' && score[7]!='' && score[8]!=''){ // row 3
            wonGame=true;
        } else if(score[0]!='' && score[3]!='' && score[6]!=''){ // column 1
            wonGame=true;
        } else if(score[1]!='' && score[4]!='' && score[7]!=''){ // column 2
            wonGame=true;
        } else if(score[2]!='' && score[5]!='' && score[8]!=''){ // column 3
            wonGame=true;
        } else if(score[0]!='' && score[4]!='' && score[8]!=''){ // diagonal 1
            wonGame=true;
        } else if(score[2]!='' && score[4]!='' && score[6]!=''){ // diagonal 2
            wonGame=true;
        }
        return wonGame;
    }

    const addXToScore = index => {
            score[index]='X';
    }

    const addOToScore = index => {
        score[index]='O';
    }

    return {name,turn,addXToScore,addOToScore,checkForWin,resetScore};
}

const player1 = Player('Player 1',true,['','','','','','','','','']);
const player2 = Player('Player 2',false,['','','','','','','','','']);

gameBoard.createBoard();


