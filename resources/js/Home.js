    // //Teams and Players have some initial data the next 2 details are for dummy data
    const teamsLocal = JSON.parse(JSON.stringify(Teams));
    localStorage.setItem('teams-list', JSON.stringify(teamsLocal));
    const playersLocal = JSON.parse(JSON.stringify(Players));
    localStorage.setItem('players-list', JSON.stringify(playersLocal));

const RenderHome = () => {
    const DOM = document.querySelector('#main');
    const teamsDOM = DOM.querySelector('#cards');

    teamsDOM.innerHTML = '';

    const teams = JSON.parse(localStorage.getItem('teams-list'));
    const players = JSON.parse(localStorage.getItem('players-list'));

    const teamsDOMFragment = document.createDocumentFragment();

    teams.forEach(team => {
        const teamPlayers = players.filter(player => player.from === team.shortName);
        teamsDOMFragment.appendChild(createTeamCard({
            ...team,
            count: teamPlayers.length,
            topBatsman: [...teamPlayers].sort((a, b) => b.runs - a.runs)[0],
            topBowler: [...teamPlayers].sort((a, b) => b.wickets - a.wickets)[0],
        }));
    }
    );

    teamsDOM.appendChild(teamsDOMFragment);
}

const createTeamCard = (team) => {
    const teamDOM = document.createElement('div');
    teamDOM.classList.add('card');

    teamDOM.innerHTML = `
        <div class="card__name">${team.name}</div>
        <div class="card__logo"> <img src="${team.logo}" alt="${team.name} logo" id="card__logo__img"> </div>
        <div class="card__count">Player Count: ${team.count}</div>
        <div class="top__batsman">Top Batsman: ${team.topBatsman?.playerName || '-'}</div>
        <div class="top__bowler">Top Bowler: ${team.topBowler?.playerName || '-'}</div>
        <div class="championships">Championships Won: ${team.championships}</div>
        `;
    
    teamDOM.addEventListener('click', () => {
        document.location.href = `team.html?team=${team.shortName}`;
    });
        return teamDOM;
}

document.onload = RenderHome();

document.onload = function () {

document.querySelector('.navbar__search__box__searchTerm').addEventListener('blur', (e) => {
    const teamShortName = e.target.value;
    const DOM = document.querySelector('#main');
    const teamsDOM = DOM.querySelector('#cards');

    const teams = JSON.parse(localStorage.getItem('teams-list'));
    const players = JSON.parse(localStorage.getItem('players-list'));

    const selectedTeamPlayers = players.filter(player => player.from === teamShortName.toUpperCase());
    
    const teamsDOMFragment = document.createDocumentFragment();
    teamShortName === '' ? RenderHome() : RenderPlayers(selectedTeamPlayers, teamsDOM);

});

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
    playersDOM.innerHTML = "";
    playersDOM.appendChild(playersDOMFragment);
    if (players.length === 0) {
      playersDOM.innerHTML = `<h1 class="no__players">No Players Found</h1>`;
    }
  };
}();

document.onload = function () {
    document.querySelector('#player-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const playerName = e.target.elements[0].value;
        const playerPhoto = e.target.elements[1].value;
        const playerFrom = e.target.elements[2].value;
        const playerPrice = e.target.elements[3].value;
        const playerIsPlaying = e.target.elements[4].value;
        const playerDescription = e.target.elements[5].value;
        const playerRuns = e.target.elements[6].value;
        const playerWickets = e.target.elements[7].value;
        
        const players = JSON.parse(localStorage.getItem('players-list'));
        
        const newPlayer = {
            playerName,
            price: playerPrice,
            description: playerDescription,
            photo: playerPhoto,
            from: playerFrom,
            isPlaying: !!(playerIsPlaying === 'true'),
            runs: playerRuns,
            wickets: playerWickets,
            id: players.length + 1,
        };

        players.push(newPlayer);
        localStorage.setItem('players-list', JSON.stringify(players));
    });

    document.querySelector('#team-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const teamName = e.target.elements[0].value;
            const teamLogo = e.target.elements[1].value;
            const teamShortName = e.target.elements[2].value;
            const teamChampionships = parseInt(e.target.elements[3].value);

            const teams = JSON.parse(localStorage.getItem('teams-list'));

            const newTeam = {
                id: teams.length + 1,
                name: teamName,
                shortName: teamShortName,
                logo: teamLogo,
                championships: teamChampionships,
            };

            teams.push(newTeam);

            localStorage.setItem('teams-list', JSON.stringify(teams));
    });
}();