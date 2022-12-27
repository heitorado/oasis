window.addEventListener("DOMContentLoaded", (event) => {
    chrome.storage.local.get("workedDaysData", ({workedDaysData}) => {
        updateTable(workedDaysData)
    });
});

function updateTable(tableData) {
    const hoursWrapper = document.getElementById("today-hours-worked-info")
    const loadingWrapper = document.getElementById("loading-state")
    const tbodyElement = document.getElementById("oasis__table__body")
    const todayBoxElement = document.getElementById("today__box")
    const todayWorkedElement = document.getElementById("today__worked")
    const todayRemainingElement = document.getElementById("today__remaining")

    if (tableData.length) {
        hoursWrapper.classList.toggle("d-none")
        loadingWrapper.classList.toggle("d-none")
    }

    tableData.reverse().forEach(({hoursWorked, hoursRemaining, date, weeklyHour}, idx) => {
        const rowElement = document.createElement("tr")
        const remainingRowElement = document.createElement("td")
        const dateRowElement = document.createElement("td")
        const workedRowElement = document.createElement("td")

        dateRowElement.append(date.weekDay + " - " + date.date)
        workedRowElement.append(hoursWorked)
        remainingRowElement.append(hoursRemaining)

        rowElement.appendChild(dateRowElement)
        rowElement.appendChild(workedRowElement)
        rowElement.appendChild(remainingRowElement)
        tbodyElement.appendChild(rowElement)

        if (date.isToday) {
            todayWorkedElement.append(hoursWorked)
            todayRemainingElement.append(hoursRemaining)
        }


    });


}