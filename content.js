chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'toggleDarkMode') {
      if (message.enabled) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    }
  });
  