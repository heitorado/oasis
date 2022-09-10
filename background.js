let workedDaysData = []

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ workedDaysData });
    console.log("Initialized workedDaysData");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    chrome.storage.local.set({ workedDaysData: message.data });
})