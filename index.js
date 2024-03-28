const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
var morgan = require('morgan');



const app = express();
app.use(morgan('dev'))
dotenv.config();


app.get('/scores', (_, res) => {
    try {
        let data = JSON.parse(fs.readFileSync('survey.json', 'utf8'));
        let scores = { "femaleScore": 0, "maleScore": 0, "diverseScore": 0 };
        let counts = { "female": 0, "male": 0, "diverse": 0 };
    
        data.forEach(response => {
            if (!response.gender || typeof response.score !== 'number') {
                return res.status(500).send('Internal server error');
            }
            if (response.gender in counts) {
                counts[response.gender]++;
                scores[response.gender + "Score"] += response.score;
            }
        });
    
        if (Object.values(counts).some(count => count < 3)) {
            scores = { "femaleScore": 0, "maleScore": 0, "diverseScore": 0 };
        } else {
            for (let gender in counts) {
                scores[gender + "Score"] /= counts[gender];
                scores[gender + "Score"] = parseFloat(scores[gender + "Score"].toFixed(1));
            }
        }
    
        return res.status(200).json(scores);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal server error');
    }
});


const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})

module.exports = server;