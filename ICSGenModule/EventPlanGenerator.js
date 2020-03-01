const fs = require('fs');
const ics = require('ics');

const { parsePlan } = require('./parseData');


let EventPlanGenerator  = {
    eventList: []
};

EventPlanGenerator.createNewPlan = function(jsonFilename) {
    try {
        /* Parsing JSON file */
        let jsonString = fs.readFileSync(jsonFilename);
        let data = JSON.parse(jsonString);
        /* Get ics-formatted string */
        this.eventList = parsePlan(data);
    } catch (e) {
        (console.error || console.log).call(console, e.stack || e);
    }
};


EventPlanGenerator.savePlanToFile = function(icsFilename) {
    try {
        fs.writeFile(icsFilename, this.eventList, (err) => {
            if (err) throw err;
        });
    } catch (e) {
        (console.error || console.log).call(console, e.stack || e);
    }

};


/* Example: */
EventPlanGenerator.createNewPlan('data.json');
EventPlanGenerator.savePlanToFile('newPlan.ics');