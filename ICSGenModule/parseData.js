const ics = require('ics');

const DRUG_TITLE = 'drugName';
const DATE_FROM = 'dateFrom';
const DATE_TO = 'dateTo';

const TIME_LIST = 'timeList';

const EVENT_LEN_MINS = 30;


/**
 * Creates events for one exact drug
 * @param drugJson drug intake info
 * @returns {[]} list of .ics-formatted events for this drug
 */
function parseDrug(drugJson) {
    let drugName = drugJson[DRUG_TITLE];
    let dateFrom = new Date(drugJson[DATE_FROM]);
    let dateTo = new Date(drugJson[DATE_TO]);
    let takeTimeList = drugJson[TIME_LIST];

    let eventList = [];
    let loop = new Date(dateFrom);
    // Iterating through the days:
    while(loop <= dateTo) {
        // Iterating through take timestamps:
        for (let takeT of takeTimeList) {
            let takeTime = takeT.split('-');
            // Creating an event
            let event = {
                title: drugName,
                start: [loop.getFullYear(), loop.getMonth() + 1, loop.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1])],
                duration: { minutes: EVENT_LEN_MINS }
            };
            eventList.push(event);
        }
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }
    return eventList;
}


/**
 *
 * @param data All plan data in parsed json format
 * @returns {string} Created .ics string for this plan
 */
function parsePlan(data) {
    /* Whether the notifications are needed: */
    const notify = data['notifications'];

    /* All the drugs data array */
    const drugsArr = data['drugs'];
    /* List of events */
    let fullEventList = [];

    /* Iterating the list of events: */
    for (let dr of drugsArr) {
        fullEventList.push.apply(fullEventList, parseDrug(dr));
    }
    console.log(fullEventList);
    /* Creating ics-formatted string:  */
    const { error, value } = ics.createEvents(fullEventList);

    if (error)
        (console.error || console.log).call(console, e.stack || e);
    return value;
}

module.exports = {parsePlan};
