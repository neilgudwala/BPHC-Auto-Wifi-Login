// Listen for messages from content scripts or other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);
  
    // Ensure sender is defined
    if (sender && sender.tab) {
      console.log('Message sent from tab:', sender.tab.url);
    } else {
      console.log('Message sent from extension context');
    }
  
    // Perform action based on message
    if (message.action === 'triggerLogin') {
      chrome.scripting.executeScript({
        target: { tabId: sender.tab.id },
        func: (selector) => {
          const element = document.getElementById(selector);
          if (element) element.click();
        },
        args: [message.selector],
        world: 'MAIN'
      });
    }
  
    // Respond to the sender
    sendResponse({ status: 'success' });
  
    // Return true to indicate asynchronous response
    return true;
  });
  