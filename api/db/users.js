const fs = require('fs');

global.readUsers = function() {
    try {
        return JSON.parse(fs.readFileSync('users.json').toString());
    } catch (e) {
        saveUsers([])
    }
}

global.saveUsers = function(_) {
    if (typeof _ === 'undefined')
        _ = [];

    fs.writeFileSync('users.json', JSON.stringify(_));
}