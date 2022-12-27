window.addEventListener("DOMContentLoaded", (event) => {
    chrome.storage.local.get("workedDaysData", ({workedDaysData}) => {
        updateTable(workedDaysData)
    });
});

function updateTable(tableData) {
    const wrapper = document.getElementById("today-hours-worked-info")
    const loadingWrapper = document.getElementById("loading-state")
    const tbody = document.getElementById("oasis__table__body")
    if (tableData.length) {
        wrapper.classList.toggle("d-none")
        loadingWrapper.classList.toggle("d-none")
    }
    tableData.forEach(({hoursWorked, hoursRemaining, date}, idx) => {
        const row = document.createElement("tr")
        const remaining = document.createElement("td")
        const today = document.createElement("td")
        const worked = document.createElement("td")

        today.append(date.weekDay + " - " + date.date)
        worked.append(hoursWorked)
        remaining.append(hoursRemaining)


        row.appendChild(today)
        row.appendChild(worked)
        row.appendChild(remaining)
        tbody.appendChild(row)


    });


}