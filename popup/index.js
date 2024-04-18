async function toggleDarkMode() {
    const [tab] = await chrome.tabs.query({ active: true })
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            document.querySelector('html').style.filter = "invert(1) hue-rotate(180deg)";
            document.querySelectorAll("img").style.filter = "invert(1) hue-rotate(0deg)";
            document.querySelectorAll("picture").style.filter = "invert(1) hue-rotate(0deg)";
            document.querySelectorAll("video").style.filter = "invert(1) hue-rotate(0deg)";
        }
    })
}

document.getElementById('dark_mode_button').addEventListener('click', toggleDarkMode)
