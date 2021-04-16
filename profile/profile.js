function load() {
    let id = document.getElementById('input').value;
    const Http = new XMLHttpRequest();
    const url = `https://priority-static-api.nkstatic.com/storage/static/11/${id}/public-stats`;

    Http.open('GET', url);
    Http.send();
    Http.onreadystatechange = (e) => {
        let state = Http.readyState;
        console.log('yes:' + state);
        if (state == 4) {
            let body = JSON.parse(Http.responseText);
            res = `medals: ${JSON.stringify(body.raceMedals)}\n`;
            res += `ID: ${body.playerId}\n`;
            res += `name: ${body.playerName}\n`;
            res += `player rank: ${body.playerRank}\n`;
            res += `player xp: ${body.playerXp}\n`;
            res += `veteran rank: ${body.veteranRank}\n`;

            res += `veteran xp: ${body.veteranXp}\n`;
            res += `avatar: ${body.avatar}\n`;
            res += `game count: ${body.gameCount}\n`;
            res += `games won: ${body.gamesWon}\n`;

            document.getElementById('data').innerText = res;
        }
    };
}
