const RenderTeam = () => {
  const DOM = document.querySelector("#main");
  const teamDOM = DOM.querySelector("#team");
  const playersDOM = DOM.querySelector("#cards");

  const teams = JSON.parse(localStorage.getItem("teams-list"));
  const players = JSON.parse(localStorage.getItem("players-list"));

  console.log(teams);

  const team = teams.filter(
    (team) => team.shortName === location.search.split("=")[1]
  )[0];
  const teamPlayers = players.filter(
    (player) => player.from === team.shortName
  );

  document.title = `IPLT20 | ${team.name}`;
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = team.logo;


  RenderTeamDetails(
    {
      ...team,
      count: teamPlayers.length,
      topBatsman: teamPlayers.sort((a, b) => b.runs - a.runs)[0],
      topBowler: teamPlayers.sort((a, b) => b.wickets - a.wickets)[0],
    },
    teamDOM
  );

  RenderPlayers(teamPlayers, playersDOM);
};

const RenderTeamDetails = (team, teamDOM) => {
  const teamDOMFragment = document.createDocumentFragment();
  const teamDOMElement = document.createElement("div");
  teamDOMElement.classList.add("team");
  teamDOMElement.innerHTML = `
        <div class="team__name">
            <h1>${team.name.toUpperCase()}</h1>
        </div>
        <div class="team__details">
        <div class="team__details__logo">
            <img src="${team.logo}" alt="${
    team.name
  }" id="team__details__logo_img" />
        </div>
        <div class="team__details__stats">
        <div class="team__short-name">
            <h2>${team.shortName}</h2>
        </div>
        <div class="team__count">
            <h3>Players: ${team.count}</h3>
        </div>
        <div class="team__top-batsman">
            <h3>Top Batsman: ${team.topBatsman?.playerName || '-'}</h3>
        </div>
        <div class="team__top-bowler">
            <h3>Top Bowler: ${team.topBowler?.playerName || '-'}</h3>
        </div>
        <div class="championships">
            <h3>Championships: ${team.championships}</h3>
        </div>
        </div>
        </div>
        `;

  teamDOMFragment.appendChild(teamDOMElement);
  teamDOM.appendChild(teamDOMFragment);
};

const RenderPlayers = (players, playersDOM) => {
  const playersDOMFragment = document.createDocumentFragment();
  players.forEach((player) => {
    const playerDOMElement = document.createElement("div");
    playerDOMElement.classList.add("card");
    playerDOMElement.innerHTML = `
        <div class="card__name">
            <h1>${player.playerName}</h1>
        </div>
        <div class="card__details">
        <div class="card__logo">
            <img src="${player.photo}" alt="${player.playerName}" id="card__logo__img" />
        </div>
        <div>
        <div class="card__stats">
        <div class="player__team">
            <h2>${player.from}</h2>
        </div>
        <div class="player__price">
            <h3>Price: ${player.price}</h3>
        </div>
        <div class="player__description">
            <h3>${player.description}</h3>
        </div>
        <div class="player__playing">
            <h3>Playing Status: ${player.isPlaying ? 'Playing' : 'On-bench' }</h3>
        </div>
        </div>
        </div>
        `;
    playersDOMFragment.appendChild(playerDOMElement);
    playerDOMElement.addEventListener("click", () => {
      document.location.href = `player.html?player=${player.playerName}`;
    });
  });
  playersDOM.appendChild(playersDOMFragment);
};

document.onload = RenderTeam();
