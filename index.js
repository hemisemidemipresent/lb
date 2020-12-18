function requestShit(raceID) {
    const Http = new XMLHttpRequest();
    const url = `https://priority-static-api.nkstatic.com/storage/static/appdocs/11/leaderboards/Race_${raceID}.json`;
    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = (e) => {
        let table = document.getElementById('tayble');
        let body = Http.responseText;
        console.log(body);
        let data = JSON.parse(JSON.parse(body).data);
        let scores = data.scores.equal;

        for (let i = 0; i < 100; i++) {
            let row = table.insertRow();

            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);
            let cell5 = row.insertCell(5);
            let cell6 = row.insertCell(6);

            let person = scores[i];
            let time = 1000000000 - person.score;

            time = parsetime(time);
            let md = person.metadata.split(',');
            let username = md[0];
            let level = md[1];
            let medals = [];

            const medalnames = [
                '1st',
                '2nd',
                '3rd',
                't50',
                't1%',
                't10%',
                't25%',
                't50%',
                't75%',
            ];
            for (let j = 2; j < md.length; j++) {
                if (md[j] == 0) continue;
                else {
                    medals.push([medalnames[j], [md[j]]]);
                }
            }
            let medal0;
            let medal1;
            let medal2;
            if (!medals[0]) medal0 = '-';
            else medal0 = medals[0].join(' ');
            if (!medals[1]) medal1 = '-';
            else medal1 = medals[1].join(' ');
            if (!medals[2]) medal2 = '-';
            else medal2 = medals[2].join(' ');
            cell0.innerHTML = i + 1;
            cell1.innerHTML = username;
            cell2.innerHTML = time;
            cell3.innerHTML = medal0;
            cell4.innerHTML = medal1;
            cell5.innerHTML = medal2;
            cell6.innerHTML = level;
        }
    };
}
function loadLB() {
    let raceID = document.getElementById('input').value;

    requestShit(raceID);
}
function parsetime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
    return minutes + ':' + seconds + '.' + milliseconds;
}
