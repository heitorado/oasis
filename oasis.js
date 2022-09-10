window.addEventListener("DOMContentLoaded", (event) => {
    chrome.storage.local.get("workedDaysData", ({ workedDaysData }) => {
        updateTable(workedDaysData)
    });
});

function updateTable(tableData) {
    tableData.forEach((data, idx) => {
        document.getElementById(`day-${idx+1}-header`).textContent = data.weekdayText
        document.getElementById(`day-${idx+1}-data`).textContent = data.workedHours
    });
}