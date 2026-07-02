const POINTS = {
  1: 500,
  2: 445,
  3: 400,
  4: 365,
  5: 335,
  6: 310,
  7: 287.5,
  8: 267.5,
  9: 250,
  10: 232.5,
  11: 215,
  12: 197.5,
  13: 180,
  14: 162.5,
  15: 145,
  16: 127.5,
  17: 110,
  18: 92.5,
  19: 75,
  20: 60,
  21: 47.5,
  22: 35,
  23: 25,
  24: 15,
  25: 7.5
};

function getPoints(rank) {
  return POINTS[rank] || 0;
}

function renderList(filter = "") {
  const list = document.getElementById("list");
  if (!list || !Array.isArray(window.completions)) return;

  list.innerHTML = "";

  completions
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(c => {
      const card = document.createElement("div");
      card.className = "card";

      const victors = (c.victors || []).join(", ");
      const pts = getPoints(c.rank);

      card.innerHTML = `
        <a href="tower.html?rank=${c.rank}" 
           style="text-decoration:none;color:inherit;width:100%;display:flex;justify-content:space-between;align-items:center;">

          <div class="left">
            <div class="rank">#${c.rank}</div>
            <div>
              <div class="name">${c.name}</div>
              <div class="victors">Victors: ${victors}</div>
              <div class="points">+${pts} pts</div>
            </div>
          </div>

          <div class="diff">${c.difficulty ?? ""}</div>

        </a>
      `;

      list.appendChild(card);
    });
}

function buildLeaderboard() {
  const board = document.getElementById("leaderboard");
  if (!board || !window.completions) return;

  const players = {};

  completions.forEach(c => {
    const pts = getPoints(c.rank);

    (c.victors || []).forEach(p => {
      if (!players[p]) {
        players[p] = { points: 0, count: 0 };
      }

      players[p].points += pts;
      players[p].count += 1;
    });
  });

  const sorted = Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points);

  board.innerHTML = "";

  sorted.forEach(([name, data], i) => {
    const row = document.createElement("div");
    row.className = "card";

    row.innerHTML = `
      <div class="left">
        <div class="rank">#${i + 1}</div>
        <div class="name">${name}</div>
      </div>
      <div class="diff">${data.points.toFixed(1)} pts (${data.count})</div>
    `;

    board.appendChild(row);
  });
}
