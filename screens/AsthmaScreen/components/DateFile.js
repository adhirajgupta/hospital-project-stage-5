
function cal(x) {

    const today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate() + x)
    let newDate = tomorrow.toString().split(' ')
    return {
        shortDate: newDate[1] + " " + newDate[2],
        longDate: newDate[1] + " " + newDate[2] + " "+newDate[3] + " - "+newDate[0]

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

function completeDay(day){
    switch(day){
        case "Mon":
        case "Sun":
        case "Fri":
            return day.toLowerCase()+"day"
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



export {shortDates,firebaseDate,completeDay}