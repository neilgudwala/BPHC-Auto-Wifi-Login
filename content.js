// content.js - BITS Hyderabad Auto-Login
const LOGIN_URL = 'http://172.16.0.30:8090';
const SUCCESS_URL = 'http://172.16.100.117/';
const ELEMENTS = {
  USERNAME: 'username',
  PASSWORD: 'password',
  SUBMIT_BUTTON: 'loginbutton'
};
if (isSuccessPage());

// Main login function
function autoLogin() {

  if (!isLoginPage()) return;

  const checkElements = setInterval(() => {
    const usernameField = document.getElementById(ELEMENTS.USERNAME);
    const passwordField = document.getElementById(ELEMENTS.PASSWORD);
    const submitDiv = document.getElementById(ELEMENTS.SUBMIT_BUTTON);

    if (usernameField && passwordField && submitDiv) {
      clearInterval(checkElements);
      chrome.storage.sync.get(['bitsCreds'], (result) => {
        if (result.bitsCreds) {
          fillCredentials(result.bitsCreds);
          triggerLogin();
        }
      });
    }
  }, 100);
}

// Helper functions
function isLoginPage() {
  return window.location.href.startsWith(LOGIN_URL);
}

function isSuccessPage() {
    console.log("1")
    console.log(window.location.href.startsWith(SUCCESS_URL))
    if(window.location.href.startsWith(SUCCESS_URL)){
        window.close()
        return true
    }
    else{
        return true;
    }
  }


function fillCredentials(creds) {
    document.getElementById(ELEMENTS.USERNAME).value = creds.username;
    document.getElementById(ELEMENTS.PASSWORD).value = creds.password;
}

function triggerLogin() {
    chrome.runtime.sendMessage(
      {
        action: 'triggerLogin',
        selector: 'loginbutton'
      },
      (response) => {
        console.log('Response from background script:', response);
      }
    );
  }

// Initial execution
document.addEventListener('DOMContentLoaded', autoLogin);
window.addEventListener('load', autoLogin);
