  //      Welcome in AVB (Avada Vouch Bot)     \\
 //           Here its the data file            \\
//            Made with <3 by Avada              \\

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

function readData() {
    if (fs.existsSync(dataPath)) {
        const rawData = fs.readFileSync(dataPath);
        try {
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return { vouches: {}, leaderboard: {} };
        }
    }
    return { vouches: {}, leaderboard: {} };
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = {
    readData,
    writeData
};