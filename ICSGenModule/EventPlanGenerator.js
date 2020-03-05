const fs = require('fs');
const ics = require('ics');

const { parsePlan } = require('./parseData');


let EventPlanGenerator  = {
    eventList: []
};


/**
 * Creates an .ics formatted string and saves it
 * @param jsonFilename name of JSON file of required format
 */
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


/**
 * Saves generated data to file
 * @param icsFilename name of file to save .ics formatted data
 */
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