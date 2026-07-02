function getPoints(rank) {
  const points = {
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
  return points[rank] || 0;
}

function renderList() {
  const container = document.getElementById("list");
  container.innerHTML = "";

  completions.forEach(c => {
    const pts = getPoints(c.rank);

    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h2>#${c.rank} ${c.name}</h2>
      <p>Points: ${pts}</p>
      <p>Victors: ${c.victors.join(", ")}</p>
    `;

    container.appendChild(div);
  });
}

function buildLeaderboard() {
  const players = {};

  completions.forEach(c => {
    const pts = getPoints(c.rank);

    c.victors.forEach(p => {
      if (!players[p]) players[p] = { points: 0, count: 0 };
      players[p].points += pts;
      players[p].count += 1;
    });
  });

  const sorted = Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points);

  const container = document.getElementById("leaderboard");

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

    container.appendChild(row);
  });
}

  const sorted = Object.entries(players)
    .sort((a, b) => b[1].points - a[1].points);

  const container = document.getElementById("leaderboard");

  sorted.forEach(([name, data], i) => {
    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <span>#${i + 1}</span>
      <span>${name}</span>
      <span>${data.points.toFixed(1)}</span>
      <span>${data.count}</span>
    `;

    container.appendChild(row);
  });
}
