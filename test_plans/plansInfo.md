### Различные варианты сргенерированных ics-файлов

**newPlan1.1** и **newPlan2.1** - файлы, сгенерированные с помощью:
```javascript
alarms.push({
    action: 'audio',
    trigger: {minutes: notifyBefore, before:true},
});
```
**newPlan1.2** и **newPlan2.2** - файлы, сгенерированные с помощью:
```javascript
alarms.push({
    action: 'audio',
    trigger: {minutes: notifyBefore, before:true},
    repeat: 2,
    attachType:'VALUE=URI',
    attach: 'Glass'
});
```
Значение провой цифры говорит о том, был ли использован флаг 'confirmed' (1 - не был, 2 - был)
```javascript
event = {
    title: drugName,
    start: [loop.getFullYear(), loop.getMonth() + 1, loop.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1])],
    end: [loop.getFullYear(), loop.getMonth() + 1, loop.getDate(), parseInt(takeTime[0]), parseInt(takeTime[1]) + EVENT_LEN_MINS],
    description: drugJson[ADDITIONAL_DATA],
    status: 'CONFIRMED'
};
```

_Данные планы должны с быть с 21 по 30 марта, приём в 11:00, 15:00 и 19:00, напоминание за 30 минут._     
