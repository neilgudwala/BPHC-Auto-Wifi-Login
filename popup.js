document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('saveButton');
    const loginButton = document.getElementById('loginButton');
    const message = document.getElementById('message');

    // Load existing credentials
    chrome.storage.sync.get(["bitsCreds"], (result) => {
        usernameInput.value = result.bitsCreds.username || '';
        passwordInput.value = result.bitsCreds.password || '';
    });

    saveButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        chrome.storage.sync.set({ bitsCreds: encryptCredentials({ username, password }) }, () => {
            message.textContent = 'Credentials updated successfully!';
            setTimeout(() => message.textContent = 'Made by Neil Gudwala', 4000);
        });
    });

    loginButton.addEventListener('click', () => {
        chrome.tabs.create({ url: 'http://172.16.0.30:8090/' });
    });
});


function encryptCredentials(creds) {
    // Basic encryption (replace with a more secure method in production)
    return {
      username: (creds.username),
      password: (creds.password)
    };
  }