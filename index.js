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
            const medallinks = [
                'https://i.imgur.com/a7BrnTJ.png',
                'https://i.imgur.com/crZyI0A.png',
                'https://i.imgur.com/fBYmsyC.png',
                'https://i.imgur.com/jrG9J9C.png',
                'https://i.imgur.com/yosel2O.png',
                'https://i.imgur.com/PBxqDJ2.png',
                'https://i.imgur.com/CrBWY7u.png',
                'https://i.imgur.com/OmyPoJA.png',
                'https://i.imgur.com/esTrQPz.png',
            ];
            for (let j = 2; j < md.length; j++) {
                if (md[j] == 0) continue;
                else {
                    medals.push({
                        name: medalnames[j - 2],
                        number: md[j],
                        img: medallinks[j - 2],
                    });
                }
            }
            if (!medals[0]) {
                medals[0] = {
                    name: 'none',
                    number: '-',
                    img:
                        'https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png',
                };
            }
            if (!medals[1]) {
                medals[1] = {
                    name: 'none',
                    number: '-',
                    img:
                        'https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png',
                };
            }
            if (!medals[2]) {
                medals[2] = {
                    name: 'none',
                    number: '-',
                    img:
                        'https://upload.wikimedia.org/wikipedia/commons/4/48/BLANK_ICON.png',
                };
            }
            console.log(medals[2]);
            cell0.innerHTML = i + 1;
            cell1.innerHTML = username;
            cell2.innerHTML = time;
            cell3.innerHTML =
                `<div class= 'medal-info-container'><div class = 'img-container'><img class = 'medal' src="${medals[0].img}" alt="${medals[0].name}"></div><p>${medals[0].number}</p>` +
                `<div class = 'img-container'><img class = 'medal' src="${medals[1].img}" alt="${medals[1].name}"></div><p>${medals[1].number}</p>` +
                `<div class = 'img-container'><img class = 'medal' src="${medals[2].img}" alt="${medals[2].name}"></div><p>${medals[2].number}</p></div>`;
            cell4.innerHTML = level;
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
