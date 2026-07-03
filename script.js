window.completions = window.completions || [];

window.POINTS = {
  1: 500, 2: 455, 3: 415, 4: 380, 5: 350,
  6: 325, 7: 305, 8: 285, 9: 270, 10: 255,
  11: 240, 12: 225, 13: 212, 14: 200, 15: 188,
  16: 176, 17: 165, 18: 154, 19: 144, 20: 134,
  21: 124, 22: 114, 23: 104, 24: 95, 25: 86,
  26: 78, 27: 70, 28: 62, 29: 55, 30: 48,
  31: 42, 32: 36, 33: 30, 34: 25, 35: 20,
  36: 17, 37: 15, 38: 13, 39: 11, 40: 10
};

function getPoints(rank) {
  const r = Number(rank);
  return window.POINTS[r] ?? 0;
}

function buildLeaderboard() {
  const board = document.getElementById("leaderboard");
  if (!board) return;

  const players = {};

  for (const c of window.completions) {
    const pts = getPoints(c.rank);

    for (const p of (c.victors || [])) {
      if (!players[p]) players[p] = { points: 0, count: 0 };

      players[p].points += pts;
      players[p].count++;
    }
  }

  const sorted = Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points);

  board.innerHTML = "";

  for (const [name, data] of sorted) {
    const row = document.createElement("div");
    row.className = "card";

    row.innerHTML = `
      <div class="left">
        <div class="name">${name}</div>
      </div>
      <div class="diff">${data.points.toFixed(1)} pts (${data.count})</div>
    `;

    board.appendChild(row);
  }
}
