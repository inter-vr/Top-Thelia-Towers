window.POINTS = new Map([
  [1, 500],
  [2, 455],
  [3, 415],
  [4, 380],
  [5, 350],
  [6, 325],
  [7, 305],
  [8, 285],
  [9, 270],
  [10, 255],
  [11, 240],
  [12, 225],
  [13, 212],
  [14, 200],
  [15, 188],
  [16, 176],
  [17, 165],
  [18, 154],
  [19, 144],
  [20, 134],
  [21, 124],
  [22, 114],
  [23, 104],
  [24, 95],
  [25, 86],
  [26, 78],
  [27, 70],
  [28, 62],
  [29, 55],
  [30, 48],
  [31, 42],
  [32, 36],
  [33, 30],
  [34, 25],
  [35, 20],
  [36, 17],
  [37, 15],
  [38, 13],
  [39, 11],
  [40, 10]
]);

window.getPoints = function(rank) {
  return window.POINTS.get(Number(rank)) ?? 0;
};

function renderList(filter = "") {
  const list = document.getElementById("list");
  if (!list || !Array.isArray(window.completions)) return;

  list.innerHTML = "";

  window.completions
    .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
    .sort((a, b) => a.rank - b.rank)
    .forEach(c => {
      const pts = getPoints(c.rank);

      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <a href="tower.html?rank=${c.rank}">
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
  if (!board || !window.completions) return;

  const players = {};

  window.completions.forEach(c => {
    const pts = getPoints(c.rank);

    (c.victors || []).forEach(p => {
      if (!players[p]) players[p] = { points: 0, count: 0, list: [] };

      players[p].points += pts;
      players[p].count += 1;

      players[p].list.push(c);
    });
  });

  const sorted = Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points);

  board.innerHTML = "";

  sorted.forEach(([name, data], i) => {
    const row = document.createElement("div");
    row.className = "card";

    row.style.cursor = "pointer";

    row.onclick = () => {
      window.location.href = `player.html?name=${encodeURIComponent(name)}`;
    };

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
