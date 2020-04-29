const ics = require('ics');

const DRUG_TITLE = 'drugName';
const DATE_FROM = 'dateFrom';
const DATE_TO = 'dateTo';

const TIME_LIST = 'timeList';
const ADDITIONAL_DATA = 'description';

const NOTIFY_B = 'notifications';
const REMIND_BEFORE = 'remindTime';

const RRULE = 'FREQ=DAILY;INTERVAL=1;COUNT='
const EVENT_LEN_MINS = 60;



/**
 * Creates events for one exact drug
 * @param drugJson drug intake info
 * @returns {[]} list of .ics-formatted events for this drug
 */
function parseDrug(drugJson) {
    let drugName = drugJson[DRUG_TITLE];
    let dateFrom = new Date(drugJson[DATE_FROM]);
    let dateTo = new Date(drugJson[DATE_TO]);

    let diffTime = Math.abs(dateFrom - dateTo);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    let takeTimeList = drugJson[TIME_LIST];
    let notificationNeeded = drugJson[NOTIFY_B];
    let notifyBefore = 0;
    /* Whether the notifications are needed: */
    if (notificationNeeded) {
        notifyBefore = drugJson[REMIND_BEFORE];
    }

    let eventList = [];
    // Iterating through take timestamps:
    for (let takeT of takeTimeList) {
        let takeTime = takeT.split(':');

        let intakeFullDate = new Date(dateFrom);
        intakeFullDate.setHours(parseInt(takeTime[0]));
        intakeFullDate.setMinutes(parseInt(takeTime[1]));
        let endFullDate = new Date(intakeFullDate);
        endFullDate.setMinutes(parseInt(takeTime[1]) + EVENT_LEN_MINS);

        let event;
        if (notificationNeeded) {
            //Creating an event with notifications
            let alarms = [];
            alarms.push({
                action: 'audio',
                trigger: {minutes: notifyBefore, before:true}
            });
            event = {
                title: drugName,
                start: [dateFrom.getFullYear(), dateFrom.getMonth() + 1, dateFrom.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1])],
                end: [endFullDate.getFullYear(), endFullDate.getMonth() + 1, endFullDate.getDate(), endFullDate.getHours(), endFullDate.getMinutes()],
                description: drugJson[ADDITIONAL_DATA],
                status: 'CONFIRMED',
                recurrenceRule: RRULE + String(diffDays),
                alarms: alarms
            };
        }
        else {
            // Creating an event without notifications
            event = {
                title: drugName,
                start: [dateFrom.getFullYear(), dateFrom.getMonth() + 1, dateFrom.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1])],
                end: [endFullDate.getFullYear(), endFullDate.getMonth() + 1, endFullDate.getDate(), endFullDate.getHours(), endFullDate.getMinutes()],
                description: drugJson[ADDITIONAL_DATA],
                recurrenceRule: RRULE + String(diffDays),
                status: 'CONFIRMED'
            };
        }
        eventList.push(event);
    }
    return eventList;
}


/**
 *
 * @param data All plan data in parsed json format
 * @returns {string} Created .ics string for this plan
 */
function parsePlan(data) {
    /* All the drugs data array */
    const drugsArr = data['drugs'];
    /* List of events */
    let fullEventList = [];

    /* Iterating the list of events: */
    for (let dr of drugsArr) {
        fullEventList.push.apply(fullEventList, parseDrug(dr));
    }
    /* Creating ics-formatted string:  */
    const { error, value } = ics.createEvents(fullEventList);
    if (error)
        (console.error || console.log).call(console, error.stack || error);
    return value;
}

module.exports = {parsePlan};