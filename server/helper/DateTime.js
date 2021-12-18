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
    var splitedHourAndType = timeString.split(" ");
    var splitedHourAndMinute = splitedHourAndType[0].split(":");

    var difference = splitedHourAndType[1] === "AM" ? 0 : 12;

    var date = new Date();

    var returnDate = new Date(date.getFullYear(),date.getMonth(),date.getDate(),parseInt(splitedHourAndMinute[0]) + difference,parseInt(splitedHourAndMinute[1]), 0);
    return returnDate;
}
function dateEquals(dateClient, dateServer) {
    if (dateClient.getFullYear() == dateServer.getFullYear() && dateClient.getMonth() == dateServer.getMonth()
        && dateClient.getDate() == dateServer.getDate()) {
        return true;
    } else {
        return false;
    }
}

module.exports = { getCurrentDateTimeString, getDayInWeek, getTimeFromTimeString, dateEquals };
