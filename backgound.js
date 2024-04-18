chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'toggleDarkMode') {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'toggleDarkMode', enabled: message.enabled });
      });
    }
  });
  