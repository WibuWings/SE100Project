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

function getTimeFromTimeString(timeString) {
    var date = new Date();
        var dateString =
            date.getUTCFullYear() +
            " " +
            (date.getUTCMonth() + 1) +
            " " +
            date.getUTCDate() +
            " " +
            timeString;
        return Date(dateString);
}
function dateEquals(dateClient, dateServer) {
    if (dateClient.getFullYear() == dateServer.getFullYear() && dateClient.getMonth() == dateServer.getMonth()
    && dateClient.getDate() == dateServer.getDate()) {
        return true;
    } else {
        return false;
    }
}

module.exports = { getCurrentDateTimeString, getDayInWeek, getTimeFromTimeString, dateEquals};
