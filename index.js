/*FOR THOSE PEOPLE UPDATING LB*/
const CURRENTRACEID = 'Pondering_Pat_ktnvfjkz';

// this function is the "main" function
async function requestShit(raceID) {
    const url = `https://priority-static-api.nkstatic.com/storage/static/appdocs/11/leaderboards/Race_${raceID}.json`;
    let body = await axios.get(url);
    return body;
}
async function loadLB() {
    let raceID = document.getElementById('input').value;

    let body = await requestShit(raceID);
    main(body);
}
function parseTime(ms) {
    let milliseconds = ms % 1000;
    let seconds = Math.floor((ms / 1000) % 60);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;
    return minutes + ':' + seconds + '.' + milliseconds;
}

function main(body) {
    let table = document.getElementById('tayble');
    let data = JSON.parse(body.data.data); // Ninja Kiwi is really weird, putting json data in a string in a json data
    console.log(JSON.stringify(data, null, 1));
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
        let time = 1000000000 - person.score; // also how ninja kiwi works

        time = parseTime(time);

        let md = person.metadata.split(',');
        if (person.metadata.includes('timestamp')) {
            let r = person.metadata.split(';');
            md = r[0].split(',');
        }

        let username = md[0];
        if (!md[0]) username = '???';
        let level = md[1];
        if (!md[1]) level = '???';
        let medalstr = '???';
        if (md) medalstr = formatMedals(md);
        let timestamp = '-';
        if (person.metadata.includes('timestamp')) {
            let newMetadata = person.metadata.split(',');
            timestamp = new Date(parseInt(newMetadata[11])).toISOString();
        }

        cell0.innerHTML = i + 1; // position
        cell1.innerHTML = username; // username
        cell2.innerHTML = time;
        // oh god
        cell3.innerHTML = medalstr;
        cell4.innerHTML = level;
        if (level === '155') {
            cell4.style.color = '#0bc30b';
        }
        cell5.innerHTML = person.userID;
        cell6.innerHTML = timestamp;
    }
}
function loadCurrentLB() {
    requestShit(CURRENTRACEID);
}
function formatMedals(md) {
    let res;
    if (md.length < 11)
        res = [
            `① : ${md[2]}`,
            `② : ${md[3]}`,
            `③ : ${md[4]}`,
            `⓵ : ${md[5]}`,
            `⓾ : ${md[6]}`,
            `㉕ : ${md[7]}`,
            `㊿ : ${md[8]}`,
            `㉎ : ${md[9]}`,
        ];
    else
        res = [
            `① : ${md[2]}`,
            `② : ${md[3]}`,
            `③ : ${md[4]}`,
            `㊿ : ${md[5]}`,
            `⓵ : ${md[6]}`,
            `⓾ : ${md[7]}`,
            `㉕ : ${md[8]}`,
            `㊿ : ${md[9]}`,
            `㉎ : ${md[10]}`,
        ];
    return res.join(' | ');
}
