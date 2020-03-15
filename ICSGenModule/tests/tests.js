const {EventPlanGenerator} = require('./EventPlanGenerator.js');
const {parsePlan, parseDrug} = require('./parseData.js');
const {data} = require('./dataJS.js');
const fs = require('fs');

let tests = {};

//Test of generate .ics file
tests.testOne = function(){
    console.log("Test One:");
    EventPlanGenerator.createNewPlan(data);
    EventPlanGenerator.savePlanToFile('./newPlan.ics');
    console.log("If 'null' overhand than check file 'newPlan.ics' in directory\n");
};

//Test of parse plan from .json format
tests.testTwo = function(){
    console.log("Test Two:");
    console.log("String from .ics file: \n" + parsePlan(data));
};

//Test of parse of drug list from .json file
tests.testThree = function(){
    console.log("Test Three:");
    let parsData = parseDrug(data['drugs']);
    console.log("If we have '[]' in console than all right\n", parsData);
};

module.exports = {tests};


