
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === 'BADGE_ACTIVE') {
        chrome.action.setBadgeText({ text: "ON", tabId: req.tabId });
        chrome.action.setBadgeBackgroundColor({ color: "#6dd638", tabId: req.tabId });
        sendResponse('badge is active');
    } else if (req.action === 'BADGE_INACTIVE') {
        chrome.action.setBadgeText({ text: "OFF", tabId: req.tabId });
        chrome.action.setBadgeBackgroundColor({ color: "#696969", tabId: req.tabId });
        sendResponse('badge is inactive');
    }
});

const toggleDarkMode = async (args) => {
    try {
        const savedPrefer = await chrome.storage.local.get([`${args.id}`]);
        const mode = savedPrefer[args.id] === 'BADGE_ACTIVE' ? "BADGE_INACTIVE" : "BADGE_ACTIVE";

        if (mode === "BADGE_ACTIVE") {
            document.querySelector('html').style.filter = "invert(1) hue-rotate(180deg)";
            const media = document.querySelectorAll("img, picture, video, svg");
            media.forEach(mediaItem => {
                mediaItem.style.filter = "invert(1) hue-rotate(180deg)";
            });
        } else {
            document.querySelector('html').style.filter = "none";
            const media = document.querySelectorAll("img, picture, video, svg");
            media.forEach(mediaItem => {
                mediaItem.style.filter = "none";
            });
        }

        chrome.runtime.sendMessage('ciignbojnphphhgmgekngfmibofehfdo', { tabId: args.id, action: mode });
        await chrome.storage.local.set({ [args.id]: mode });
    } catch (error) {
        console.error("Error:", error);
    }
}

chrome.tabs.onActivated.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.tabId },
        args: [{ id: tab.tabId }],
        func: toggleDarkMode
    });
})

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [tab],
        func: toggleDarkMode
    });
});
