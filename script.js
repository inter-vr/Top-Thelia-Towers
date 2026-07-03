window.completions = window.completions || [];

// =====================
// POINT SYSTEM (TOP 40)
// =====================
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
  return window.POINTS[Number(rank)] ?? 0;
}

// =====================
// LIST RENDER (SAFE)
// =====================
function renderList(filter = "") {
  const list = document.getElementById("list");
  if (!list || !Array.isArray(window.completions)) return;

  list.innerHTML = "";

  window.completions
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.rank - b.rank)
    .forEach(c => {
      const pts = getPoints(c.rank);

      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <a href="tower.html?rank=${c.rank}" style="text-decoration:none;color:inherit;width:100%;display:flex;justify-content:space-between;">
          <div class="left">
            <div class="rank">#${c.rank}</div>
            <div>
              <div class="name">${c.name}</div>
              <div class="victors">${(c.victors || []).join(", ")}</div>
              <div class="points">+${pts} pts</div>
            </div>
          </div>
          <div class="diff">${c.difficulty}</div>
        </a>
      `;

      list.appendChild(card);
    });
}

// =====================
// LEADERBOARD (SAFE)
// =====================
function buildLeaderboard() {
  const board = document.getElementById("leaderboard");
  if (!board || !Array.isArray(window.completions)) return;

  const players = Object.create(null);

  for (const c of window.completions) {
    const pts = getPoints(c.rank);

    for (const name of (c.victors || [])) {
      if (!players[name]) players[name] = { points: 0, count: 0 };

      players[name].points += pts;
      players[name].count++;
    }
  }

  const sorted = Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points);

  board.innerHTML = "";

  for (const [name, data] of sorted) {
    const el = document.createElement("div");
    el.className = "card";

    el.innerHTML = `
      <div class="left">
        <div class="name">${name}</div>
      </div>
      <div class="diff">${data.points.toFixed(1)} pts (${data.count})</div>
    `;

    board.appendChild(el);
  }
}
