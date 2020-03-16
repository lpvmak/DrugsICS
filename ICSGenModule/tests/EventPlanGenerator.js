const fs = require('fs');

const { parsePlan } = require('./parseData');


let EventPlanGenerator  = {
    eventList: []
};


/**
 * Creates an .ics formatted string and saves it
 * @param jsonData name of JSON file of required format
 */
EventPlanGenerator.createNewPlan = function(jsonData) {
    try {
        /* Get ics-formatted string */
        this.eventList = parsePlan(jsonData);
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

module.exports = {EventPlanGenerator};
