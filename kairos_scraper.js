
window.onload = function scrape(params) 
{
    setTimeout( function() { 
        function subTimeStrings(startTime, endTime) {
            let [startTimeHours, startTimeMinutes] = startTime.split(":")
            let [endTimeHours, endTimeMinutes] = endTime.split(":")

            endTimeMinutes = parseInt(endTimeMinutes)
            startTimeMinutes = parseInt(startTimeMinutes)

            resMinutes = endTimeMinutes - startTimeMinutes
            resHours = parseInt(endTimeHours) - parseInt(startTimeHours)

            if(endTimeMinutes < startTimeMinutes) {
                // Here we know that resMinutes is negative, hence the addition.
                resMinutes = 60 + resMinutes
            }


            return `${resHours}:${resMinutes}`
        }

        function addTimeStrings(startTime, endTime) {
            let [startTimeHours, startTimeMinutes] = startTime.split(":")
            let [endTimeHours, endTimeMinutes] = endTime.split(":")

            resMinutes = parseInt(endTimeMinutes) + parseInt(startTimeMinutes)
            resHours = parseInt(endTimeHours) + parseInt(startTimeHours)

            hoursFromMinutes = Math.floor(resMinutes/60.0)

            return `${resHours + hoursFromMinutes}:${resMinutes % 60}`
        }

        const dayColumnIds = ["ApontID0", "ApontID1", "ApontID2", "ApontID3", "ApontID4", "ApontID5", "ApontID6"]
        let scrapedData = []

        for(const dayColumnId of dayColumnIds) {
            let dayOfWeekRow = document.getElementById(`${dayColumnId}`)

            let filledSlots = dayOfWeekRow.getElementsByClassName("FilledSlot")
            let inTimes = []
            let outTimes = []
    
            for(const el of filledSlots) {
                let inTime = el.getElementsByClassName("TimeIN")
                let outTime = el.getElementsByClassName("TimeOUT")

                if(inTime.length == 0 && outTime.length == 0) {
                    inTime = el.getElementsByClassName("TimeINVisualizacao")
                    outTime = el.getElementsByClassName("TimeOUTVisualizacao")
                }

                if(inTime.length > 0) {
                    inTimes.push(inTime[0].innerHTML)
                }
    
                if(outTime.length > 0){
                    outTimes.push(outTime[0].innerHTML)
                }
            }
    
            let totalWorkedHours = "00:00"
    
            inTimes.forEach( (inTime, idx) => {
                let outTime = outTimes[idx]

                if(outTime == undefined) {
                    // Means we are still working, so we use the current time
                    // as the outTime:
                    let today = new Date();
                    outTime = `${today.getHours()}:${today.getMinutes()}`
                } 

                totalWorkedHours = addTimeStrings(
                                        totalWorkedHours,
                                        subTimeStrings(inTime, outTime)
                                    )
            })

            let weekDayTextEls = dayOfWeekRow.getElementsByClassName("weekDayTextSize")
            let weekdayText = ""

            Array.prototype.forEach.call(weekDayTextEls, (el) => {
                weekdayText += ` ${el.innerText} `
            })
            
            // console.log(`Horas Trabalhadas em ${weekdayText}: [${totalWorkedHours}]`)
            scrapedData.push({ weekdayText: weekdayText, workedHours: totalWorkedHours })
        }

        chrome.runtime.sendMessage({ data: scrapedData })

    }, 2000);
    
}