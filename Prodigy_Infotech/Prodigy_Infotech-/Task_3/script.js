document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const resetButton = document.getElementById("reset-btn");
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const closePopup = document.getElementById("close-popup");
  let currentPlayer = "X";
  let gameActive = true;
  let board = ["", "", "", "", "", "", "", "", ""];

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (board[a] === "" || board[b] === "" || board[c] === "") {
        continue;
      }
      if (board[a] === board[b] && board[b] === board[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      popupMessage.textContent = `Player ${currentPlayer} wins!`;
      popup.classList.remove("hidden");
      gameActive = false;
    } else if (!board.includes("")) {
      popupMessage.textContent = "It's a draw!";
      popup.classList.remove("hidden");
      gameActive = false;
    }
  };

  const handleBoxClick = (e) => {
    const clickedBox = e.target;
    const clickedBoxIndex = Array.from(boxes).indexOf(clickedBox);

    if (board[clickedBoxIndex] !== "" || !gameActive) {
      return;
    }

    board[clickedBoxIndex] = currentPlayer;
    clickedBox.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const resetGame = () => {
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box) => (box.textContent = ""));
    popup.classList.add("hidden");
  };

  boxes.forEach((box) => box.addEventListener("click", handleBoxClick));
  resetButton.addEventListener("click", resetGame);
  closePopup.addEventListener("click", () => popup.classList.add("hidden"));
});
