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
const raceID = 'Bloons_Of_The_Corn';
const url = `https://priority-static-api.nkstatic.com/storage/static/appdocs/11/leaderboards/Race_${raceID}.json`;
app.get('/', async (req, res) => {
    let body = await axios.get(url);
    let data = JSON.parse(body.data.data);
    res.send(data);
    let date = new Date();
    fs.writeFile(
        `Race_${raceID}_${date
            .toISOString()
            .substr(0, 19)
            .replace(/:/g, '-')}.json`,
        JSON.stringify(data, null, 1),
        function (err) {
            if (err) throw err;
        }
    );
    fs.file;
});
app.use('/', router);
