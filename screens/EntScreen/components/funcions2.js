function getDays(x, y) {
    switch (x) {
        case 1:
            return 31
        case 2:
            if (y % 4 == 0) return 29
            else if (y % 4 != 0) {
                return 28
            }
        case 3:
            return 31
        case 4:
            return 30
        case 5:
            return 31
        case 6:
            return 30
        case 7:
            return 31
        case 8:
            return 31
        case 9:
            return 30
        case 10:
            return 31
        case 11:
            return 30
        case 12:
            return 31
    }
}

function getFirebaseDisabledState(x) {
    const dt = new Date("Sep 1")
    const d = dt.getDate()
    const m = dt.getMonth() + 1
    return x.map(el => {
        let dt2 = new Date(el.date)
        let d2 = dt2.getDate()
        console.log(d, d2,)

        switch (m) {
            case dt2.getMonth() + 1:
                if (d < d2 && d + 7 > d2) {
                    return "disabled1"
                }
                if (d + 7 < d2 && d + 14 >= d2) {
                    return "disabled2"
                }
                if (d + 14 < d2 && d + 21 >= d2) {
                    return "disabled3"
                }
                if (d + 21 < d2 && d + 28 >= d2) {
                    return "disabled4"
                }

            default:
                let z = getDays(m,dt.getFullYear())
                console.log(z)
                

        }
    })
}

console.log(getFirebaseDisabledState([{ date: "Sep 29" }]))

