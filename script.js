let playerData = {};

// Load data (if you use localStorage)
function loadData() {
  const saved = localStorage.getItem("playerData");
  if (saved) playerData = JSON.parse(saved);
}

// Save data
function saveData() {
  localStorage.setItem("playerData", JSON.stringify(playerData));
}

// Render leaderboard
function renderLeaderboard() {
  const lb = document.getElementById("leaderboard");
  lb.innerHTML = "";

  Object.entries(playerData)
    .sort((a, b) => b[1].points - a[1].points)
    .forEach(([name, data]) => {
      const div = document.createElement("div");
      div.className = "lb-row";
      div.dataset.player = name;

      div.innerHTML = `
        <span class="lb-name">${name}</span>
        <span class="lb-points">${data.points}</span>
      `;

      lb.appendChild(div);
    });
}

// Click handler (IMPORTANT: always works even after rerender)
document.addEventListener("click", (e) => {
  const row = e.target.closest(".lb-row");
  if (!row) return;

  const name = row.dataset.player;
  showPlayer(name);
});

// Simple popup
function showPlayer(name) {
  const data = playerData[name];
  if (!data) return;

  let text = `${name}\n\nTotal Points: ${data.points}\n\nCompletions:\n`;

  if (!data.completions || data.completions.length === 0) {
    text += "None";
  } else {
    data.completions.forEach(c => {
      text += `- ${c.name} (+${c.points})\n`;
    });
  }

  alert(text);
}

// Example: add completion
function addCompletion(player, towerName, points) {
  if (!playerData[player]) {
    playerData[player] = { points: 0, completions: [] };
  }

  playerData[player].points += points;
  playerData[player].completions.push({
    name: towerName,
    points: points
  });

  saveData();
  renderLeaderboard();
}

// init
loadData();
renderLeaderboard();
