const startBtn = document.querySelector("#startBtn");
const boardGame = document.querySelector(".boardGame");
const cells = Array.from(document.querySelectorAll(".cell"));
const gameInfo = document.querySelector("#gameInfo");
const playAgain = document.getElementById("playAgain");
let playerMark = "X";
const gameStartSound = new Audio("audio/gameStart.mp3");
const clickSound = new Audio("audio/click.mp3");
const winSound = new Audio("audio/win.mp3");
const tieSound = new Audio("audio/tie.mp3");

startBtn.addEventListener("click", showGameBoard);

function showGameBoard(e) {
  gameStartSound.play();
  boardGame.style.display = "grid";
  startBtn.style.display = "none";
  gameInfo.style.display = "block";
}

cells.forEach((cell) => {
  cell.addEventListener("click", gameStart);
});

function gameStart(e) {
  clickSound.currentTime = 0;
  clickSound.play();
  let clickedCell = e.target;
  clickedCell.textContent = playerMark;
  clickedCell.removeEventListener("click", gameStart);
  if (checkWin()) {
    winSound.play();
    gameInfo.textContent = `Player ${playerMark} has won`;
    playAgain.style.display = "block";
    disabledClick();
  } else if (checkTie()) {
    tieSound.play();
    gameInfo.textContent = `Its a Tie!`;
    boardGame.classList.add("tie");
    playAgain.style.display = "block";
    disabledClick();
  } else {
    changeTurn();
    gameInfo.textContent = `Turn for ${playerMark}`;
  }
}

function changeTurn() {
  playerMark = playerMark == "X" ? "O" : "X";
}

function checkWin() {
  const winningSequence = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const sequence of winningSequence) {
    const [a, b, c] = sequence;
    if (
      cells[a].textContent !== "" &&
      cells[a].textContent == cells[b].textContent &&
      cells[b].textContent == cells[c].textContent
    ) {
      cells[a].style.cssText = `background-color: #65a30d;`;
      cells[b].style.cssText = `background-color: #65a30d;`;
      cells[c].style.cssText = `background-color: #65a30d;`;
      return true;
    }
  }
  return false;
}

function disabledClick() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", gameStart);
    cell.style.cursor = "not-allowed";
  });
}

function checkTie() {
  if (checkWin()) {
    return false;
  }
  return cells.every((cell) => cell.textContent !== "");
}

playAgain.addEventListener("click", () => {
  gameStartSound.play();
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.cssText = `background-color: '';cursor:pointer;`;
    cell.addEventListener("click", gameStart);
  });
  playAgain.style.display = "none";
  playerMark = "X";
  gameInfo.textContent = `Turn for ${playerMark}`;
  boardGame.classList.remove("tie");
});
