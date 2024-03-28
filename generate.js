const fs = require('fs');
const seedrandom = require('seedrandom');

function generate(type='normal', seed='seed') {
    // Generate survey data
    const genders = ['female', 'male', 'diverse'];
    const rngs = genders.map(gender => seedrandom(gender + seed));
    const responses = [];
    if (type === 'normal') {
        for (let i = 0; i < 100; i++) {
            const genderIndex = Math.floor(Math.random() * genders.length);
            const gender = genders[genderIndex];
            // Generate a score between 0 and 10 
            // with a slight bias towards higher scores
            const score = Math.floor(Math.pow(rngs[genderIndex](), Math.random() * 0.4) * 11); 
            responses.push({ gender, score });
        }

        fs.writeFileSync('survey.json', JSON.stringify(responses, null, 4));
    }
    else if (type === 'insufficient') {
        // Generate survey data with insufficient data 
        // (at least 1 gender with less than 3 responses)
        for (let i = 0; i < 8; i++) {
            const genderIndex = Math.floor(Math.random() * genders.length);
            const gender = genders[genderIndex];
            const score = Math.floor(rngs[genderIndex]() * 11);
            responses.push({ gender, score });
        }

        fs.writeFileSync('survey.json', JSON.stringify(responses, null, 4));
    }
}

module.exports = generate;