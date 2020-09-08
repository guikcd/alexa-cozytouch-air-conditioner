"use strict";
var overkizApi = require("overkiz-api")

async function fetchAllHouse() {
    const api = new overkizApi.API({
        host: 'ha110-1.overkiz.com',
        user: 'XXXXXX',
        password: 'XXXXX',
        polling: {
            always: false,
            interval: 1000
        }
    });
    return api.getSetup();
}

// Execute the task
fetchAllHouse()
    .then(console.log)
    .catch(console.error);
