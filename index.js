let url =
    'https://priority-static-api.nkstatic.com/storage/static/appdocs/11/leaderboards/Race_WorkingOnForm_ki9pdqx4.json';

request(url, (err, res, body) => {
    if (err) {
        reject('req');
    }
    let data = JSON.parse(JSON.parse(body).data);
    let scores = data.scores.equal;

    let output = '';
    for (let i = 0; i < 50; i++) {
        let time = 1000000000 - scores[i].score;

        time = parsetime(time);
        let md = scores[i].metadata.split(',');
        let username = md[0];
        let row = '';
        row += addSpaces(i + 1, 2) + '|';
        row += addSpaces(username, 20);
        row += '|';
        row += time;
        row += '\n';
        output += row;
    }
    message.channel.send('```' + output + '```');
});
