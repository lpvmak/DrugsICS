const ics = require('ics');

const DRUG_TITLE = 'drugName';
const DATE_FROM = 'dateFrom';
const DATE_TO = 'dateTo';

const TIME_LIST = 'timeList';
const ADDITIONAL_DATA = 'description';

const NOTIFY_B = 'notifications';
const REMIND_BEFORE = 'remindTime';

const EVENT_LEN_MINS = 30;

let notifyBefore = 0;


/**
 * Creates events for one exact drug
 * @param drugJson drug intake info
 * @returns {[]} list of .ics-formatted events for this drug
 */
function parseDrug(drugJson, notificationNeeded=false) {
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
            let event;
            if (notificationNeeded) {
                //Creating an event with notifications
                let alarms = [];
                alarms.push({
                    action: 'audio',
                    trigger: {minutes: notifyBefore, before:true},
                    repeat: 2,
                    attachType:'VALUE=URI',
                    attach: 'Glass'
                });
                event = {
                    title: drugName,
                    start: [loop.getFullYear(), loop.getMonth() + 1, loop.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1])],
                    duration: { minutes: EVENT_LEN_MINS },
                    description: drugJson[ADDITIONAL_DATA],
                    alarms: alarms
                };
            }
            else {
                // Creating an event without notifications
                event = {
                    title: drugName,
                    start: [loop.getFullYear(), loop.getMonth() + 1, loop.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1])],
                    duration: { minutes: EVENT_LEN_MINS },
                    description: drugJson[ADDITIONAL_DATA]
                };
            }
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
    const notify = data[NOTIFY_B];
    if (notify)
        notifyBefore = data[REMIND_BEFORE];
    /* All the drugs data array */
    const drugsArr = data['drugs'];
    /* List of events */
    let fullEventList = [];

    /* Iterating the list of events: */
    for (let dr of drugsArr) {
        fullEventList.push.apply(fullEventList, parseDrug(dr, notify));
    }
    /* Creating ics-formatted string:  */
    const { error, value } = ics.createEvents(fullEventList);

    if (error)
        (console.error || console.log).call(console, e.stack || e);
    return value;
}

module.exports = {parsePlan};

