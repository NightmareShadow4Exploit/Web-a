function fetchFilesFromGitHub(folder) {
    const repoOwner = 'NightmareShadow4Exploit'; // Your GitHub username
    const repoName = 'web-a'; // Your repo name
    const apiURL = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folder}`;
    
    const fileDisplay = document.getElementById("fileDisplay");
    fileDisplay.innerHTML = `<p>Fetching files from <strong>${folder}</strong>...</p>`;

    // Fetch the list of files from the GitHub API
    fetch(apiURL)
        .then(response => response.json())
        .then(files => {
            if (Array.isArray(files)) {
                if (files.length === 0) {
                    fileDisplay.innerHTML = `<p>No files found in <strong>${folder}</strong>.</p>`;
                } else {
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
