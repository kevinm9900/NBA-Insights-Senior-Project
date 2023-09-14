const button = document.querySelector("button");
const searchFirst = document.querySelector("#searchFirst");
const searchLast = document.querySelector("#searchLast");
const results = document.querySelector("#results");

const searchPlayers = async(searchQuery) => {
    const searchResults = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${searchQuery}&per_page=100`);
    return searchResults.data.data;
};

const fetchStats = async(id) => {
    const fullStats = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`);
    return fullStats.data.data[0];
};

button.addEventListener("click", async event => {
    event.preventDefault();
    results.innerHTML = "";
    let playerCount = 0;
    const playerList = await searchPlayers((searchFirst.value.trim() + " " + searchLast.value.trim()).trim());
    for (let player of playerList) {
        const stats = await fetchStats(player.id);
        if (stats) {
            playerCount++;
            const playerName = document.createElement("h2");
            playerName.append(`${player.first_name} ${player.last_name} (${player.position})`);
            const playerTeam = document.createElement("h3");
            playerTeam.append(player.team.full_name)
            const playerPoints = document.createElement("li");
            playerPoints.append(`PPG: ${stats.pts}`);
            const playerAssists = document.createElement("li");
            playerAssists.append(`APG: ${stats.ast}`);
            const playerRebounds = document.createElement("li");
            playerRebounds.append(`RPG: ${stats.reb}`);
            const playerSteals = document.createElement("li");
            playerSteals.append(`SPG: ${stats.stl}`);
            const playerBlocks = document.createElement("li");
            playerBlocks.append(`BPG: ${stats.blk}`);
            const playerStats = document.createElement("ul");
            playerStats.append(playerPoints, playerAssists, playerRebounds, playerSteals, playerBlocks)
            const playerProfile = document.createElement("div");
            playerProfile.append(playerName, playerTeam, playerStats);
            results.append(playerProfile);
        }
    }
    if (playerCount === 0) {
        const noResults = document.createElement("p");
        noResults.append("Oops, looks like we couldn't find the player you were looking for... Make sure that the name you entered is spelled correctly and try again!");
        results.append(noResults);
    }
});