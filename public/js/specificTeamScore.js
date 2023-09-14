async function getMatches(){
    var today = new Date();
    today.setDate(today.getDate());
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() -7);
    var dd = String(weekAgo.getDate()).padStart(2, '0');
    var mm = String(weekAgo.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = weekAgo.getFullYear();
    weekAgo= yyyy + '-' + mm + '-' + dd;
    let dates = [weekAgo, today]

    // get the current games
    const results = await axios({
        method: 'get',
        url: 'https://www.balldontlie.io/api/v1/games',
        params: {
            'start_date':weekAgo,
            'end_date': today,
            'per_page': 500
        }
    });
    // add results to div
    const matchups = results.data.data;
    var name = window.location.hash;
    name = name.replace(/%20/g, " ");
    name = name.substr(1);
    if (name == "Los Angeles Clippers") name = "LA Clippers";
    matchups.forEach((matchup) => {
            if(matchup.period == 4 && matchup.home_team.full_name == name || matchup.visitor_team.full_name == name){
                if (matchup.visitor_team_score > 0) {
                    // $('#scoreFeed').append(`<div class="card scoreCards"><i class="icon-check text-info mr-2"></i> <span>` +
                    // matchup.home_team.full_name +
                    //     ` vs. ` + matchup.visitor_team.full_name +`<br>`
                    //         + matchup.status + ": " + matchup.time +
                    //         + matchup.home_team_score+  `--` + matchup.visitor_team_score +
                    //     `</span></div>`);
                    let t1 = "NBA_Logos-master/" + matchup.home_team.city.toLowerCase() + ".png";
                    let t2 = "NBA_Logos-master/" + matchup.visitor_team.city.toLowerCase() + ".png";

                    $('#scoreFeed').append(`<div class="card-content scoreCards" style="text-align: center">
                    <img src="${t1}" alt="Avatar" class="md-avatar rounded-circle">
                    <span>
                        ${matchup.home_team.full_name} vs. ${matchup.visitor_team.full_name}</span>
                    <img src="${t2}" alt="Avatar" class="md-avatar rounded-circle">
                        <span style="font-size: 16px; text-transform: uppercase"> <br />
                        ${matchup.status}: ${matchup.time}
                        ${matchup.home_team_score} - ${matchup.visitor_team_score} <br />
                        ${new Date(matchup.date)}
                        </span>
                    </div>`);
                    }
                }
                window.onhashchange = function() {
                    window.location.reload(1);
                }
          
    });

}

$(document).ready(() => {

    getMatches();
});
