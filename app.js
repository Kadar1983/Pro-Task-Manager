// LOGIN
function login() {
  let u = document.getElementById("username").value;
  if (!u) {
    alert("Enter a username");
    return;
  }

  localStorage.setItem("user", u);
  window.location = "dashboard.html";
}

function logout() {
  localStorage.clear();
  window.location = "index.html";
}

// DAILY
function collectReward() {
  document.getElementById("rewardMsg").innerText = "Reward collected! +0.1 Pi";
}

// WITHDRAW
function withdraw() {
  document.getElementById("withdrawMsg").innerText = "Withdraw request submitted!";
}


// MINI GAME

let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let gameInterval;

function startGame() {
  score = 0;
  document.getElementById("score").innerText = score;
  document.getElementById("bestScore").innerText = bestScore;
  document.getElementById("gameMsg").innerText = "";
  
  clearInterval(gameInterval);

  gameInterval = setInterval(spawnCircle, 900);
}

function spawnCircle() {
  const area = document.getElementById("gameArea");
  area.innerHTML = "";

  const circle = document.createElement("div");
  circle.className = "circle";

  // random position
  circle.style.top = Math.random() * 250 + "px";
  circle.style.left = Math.random() * 300 + "px";

  circle.onclick = function() {
    score++;
    document.getElementById("score").innerText = score;
    circle.remove();
  };

  area.appendChild(circle);

  // auto-remove after 0.7 sec
  setTimeout(() => {
    if (area.contains(circle)) {
      circle.remove();
    }
  }, 700);

  // end after score 15
  if (score >= 15) {
    endGame();
  }
}

function endGame() {
  clearInterval(gameInterval);

  let reward = (score * 0.01).toFixed(2);

  document.getElementById("gameMsg").innerText =
    "Game Over! Score: " + score + " | Reward: +" + reward + " Pi";

  // update best score
  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
    document.getElementById("bestScore").innerText = bestScore;
  }
}