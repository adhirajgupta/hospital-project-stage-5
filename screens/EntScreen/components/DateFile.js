
function cal(x) {

    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + x)
    let newDate = tomorrow.toString().split(' ')
    return {
        shortDate: newDate[1] + " " + newDate[2],
        longDate: newDate[1] + " " + newDate[2] + " " + newDate[3] + " - " + newDate[0],
        newDate: newDate
    }
}


function numToDay(x) {
    switch (x) {
        case 1:
        case 8:
            return "monday"
        case 2:
        case 9:
            return "tuesday"
        case 3:
        case 10:
            return "wednesday"
        case 4:
        case 11:
            return "thursday"
        case 5:
        case 12:
            return "friday"
        case 6:
        case 13:
            return "saturday"
        case 7:
        case 0:
            return "sunday"
    }
}

let shortDates = {
    monday: cal(1).shortDate,
    tuesday: cal(2).shortDate,
    wednesday: cal(3).shortDate,
    thursday: cal(4).shortDate,
    friday: cal(5).shortDate,
    saturday: cal(6).shortDate,
    sunday: cal(7).shortDate,
}

let firebaseDate = {
    monday: cal(1).longDate,
    tuesday: cal(2).longDate,
    wednesday: cal(3).longDate,
    thursday: cal(4).longDate,
    friday: cal(5).longDate,
    saturday: cal(6).longDate,
    sunday: cal(7).longDate,
}

function completeDay(day) {
    switch (day) {
        case "Mon":
        case "Sun":
        case "Fri":
            return day.toLowerCase() + "day"
        case "Tue":
            return "tuesday"
        case "Thu":
            return "thursday"
        case "Wed":
            return "wednesday"
        case "Sat":
            return "saturday"
    }
}


export { shortDates, firebaseDate, completeDay, numToDay }