const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios').default;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
const router = express.Router();

app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});
const raceID = 'ku7sesrm';
const url = `https://priority-static-api.nkstatic.com/storage/static/appdocs/11/leaderboards/Race_${raceID}.json`;
app.get('/', async (req, res) => {
    let body = await axios.get(url);
    let data = JSON.parse(body.data.data);
    res.send(data);
    let date = new Date();
    //console.log(data);
    fs.readFile('./json.json', 'utf8', (err, dat) => {
        if (err) console.log(err);
        let json = JSON.parse(dat);
        json.push(body.data.data);
        fs.writeFile(
            `json.json`,
            JSON.stringify(json, null, 1),
            function (err) {
                if (err) throw err;
            }
        );
    });
});
app.use('/', router);
