let data = {
    "notifications": true,
    "remindTime": 30,
    "drugs": [
        {
            "drugName": "Vitamin D",
            "dateFrom": "2020-01-03",
            "dateTo": "2020-01-30",
            "timeList": ["11:00", "18:00"],
            "description": "Only with food"
        },
        {
            "drugName": "Multivitamins",
            "dateFrom": "2020-01-05",
            "dateTo": "2020-01-25",
            "timeList": ["10:00"],
            "description": "Before breakfast"
        }
    ]
};

module.exports.data = data;