function getCurrentDateTimeString() {
    var currentdate = new Date();
    var datetime =
        currentdate.getMonth() +
        1 +
        "/" +
        currentdate.getDay() +
        "/" +
        currentdate.getFullYear() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();
    return datetime;
}

function getDayInWeek(date) {
    const d = new Date(date);

    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[d.getDay()];
}

module.exports = { getCurrentDateTimeString };
