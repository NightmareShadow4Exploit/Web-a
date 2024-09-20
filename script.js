// Replace 'your_new_token_here' with your actual GitHub token. Keep it private.
const token = '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'// IMPORTANT: Store this securely and never expose it publicly

function fetchFilesFromGitHub(folder) {
    const repoOwner = 'NightmareShadow4Exploit'; // Your GitHub username
    const repoName = 'web-a'; // Your GitHub repository name

    // URL encode folder names to handle spaces and special characters
    const encodedFolder = encodeURIComponent(folder);
    const apiURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${encodedFolder}`;

    const fileDisplay = document.getElementById("fileDisplay");
    fileDisplay.innerHTML = `<p>Fetching files from <strong>${folder}</strong>...</p>`;

    // Headers with authorization token to bypass GitHub API rate limits
    const headers = {
        Authorization: `token ${token}`
    };

    // Fetch the list of files from the GitHub API
    fetch(apiURL, { headers })
        .then(response => response.json())
        .then(files => {
            if (Array.isArray(files)) {
                if (files.length === 0) {
                    fileDisplay.innerHTML = `<p>No files found in <strong>${folder}</strong>.</p>`;
                } else {
                    // Generate a list of links to the files
                    const fileLinks = files.map(file => {
                        return `<li><a href="${file.download_url}" target="_blank">${file.name}</a></li>`;
                    }).join('');
                    fileDisplay.innerHTML = `<ul>${fileLinks}</ul>`;
                }
            } else {
                fileDisplay.innerHTML = `<p>Error fetching files from <strong>${folder}</strong>.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching files:', error);
            fileDisplay.innerHTML = `<p>Error fetching files from <strong>${folder}</strong>.</p>`;
        });

    }
    
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded username and password (for demo purposes)
    const validUsername = 'seccomm110';
    const validPassword = 'Sec.Comm110';

    if (username === validUsername && password === validPassword) {
        // Store a flag in localStorage to indicate the user is logged in
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to the main content page
        window.location.href = 'main.html';
    } else {
        // Show error message
        document.getElementById('error-message').innerText = 'Invalid username or password.';
    }
}
