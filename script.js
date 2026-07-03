function getPoints(rank) {
  const POINTS = {
    1: 500, 2: 455, 3: 415, 4: 380, 5: 350,
    6: 325, 7: 305, 8: 285, 9: 270, 10: 255,
    11: 240, 12: 225, 13: 212, 14: 200, 15: 188,
    16: 176, 17: 165, 18: 154, 19: 144, 20: 134,
    21: 124, 22: 114, 23: 104, 24: 95, 25: 86,
    26: 78, 27: 70, 28: 62, 29: 55, 30: 48,
    31: 42, 32: 36, 33: 30, 34: 25, 35: 20,
    36: 17, 37: 15, 38: 13, 39: 11, 40: 10
  };

  return POINTS[Number(rank)] ?? 0;
}

function renderList(filter = "") {
  const list = document.getElementById("list");
  if (!list) return;

  list.innerHTML = "";

  window.completions
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(c => {
      const pts = getPoints(c.rank);

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <a href="tower.html?rank=${c.rank}" style="color:inherit;text-decoration:none;width:100%;display:flex;justify-content:space-between;">
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

      list.appendChild(div);
    });
}

function buildLeaderboard() {
  const board = document.getElementById("leaderboard");
  if (!board) return;

  const players = {};

  for (const c of window.completions) {
    const pts = getPoints(c.rank);

    for (const p of (c.victors || [])) {
      if (!players[p]) {
        players[p] = {
          points: 0,
          count: 0,
          breakdown: []
        };
      }

      players[p].points += pts;
      players[p].count++;

      players[p].breakdown.push({
        name: c.name,
        rank: c.rank,
        points: pts
      });
    }
  }

  board.innerHTML = "";

  Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points)
    .forEach(([name, data]) => {
      const row = document.createElement("div");
      row.className = "card";
      row.setAttribute("data-player", name);

      row.innerHTML = `
        <div class="left">
          <div class="name">${name}</div>
        </div>
        <div class="diff">${data.points} pts (${data.count})</div>
      `;

      board.appendChild(row);
    });

  window._leaderboardCache = players;
}

/* CLICK HANDLER */
document.addEventListener("click", (e) => {
  const row = e.target.closest(".card[data-player]");
  if (!row) return;

  const name = row.getAttribute("data-player");
  const data = window._leaderboardCache?.[name];
  if (!data) return;

  openPlayerPanel(name, data);
});

function openPlayerPanel(name, data) {
  const panel = document.getElementById("playerPanel");
  const title = document.getElementById("panelName");
  const points = document.getElementById("panelPoints");
  const list = document.getElementById("panelList");

  panel.classList.remove("hidden");

  title.textContent = name;
  points.textContent = `${data.points} pts`;

  list.innerHTML = "";

  for (const c of data.breakdown) {
    const div = document.createElement("div");
    div.className = "panel-item";
    div.textContent = `#${c.rank} ${c.name} (+${c.points})`;
    list.appendChild(div);
  }
}

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "closePanel") {
    document.getElementById("playerPanel").classList.add("hidden");
  }
});
});
