const repoOwner = 'NightmareShadow4Exploit'; // Your GitHub username
const repoName = 'web-a'; // Your repository name

function showTab(tabName) {
    const contentDiv = document.getElementById("content");
    let content = "";

    switch (tabName) {
        case 'Attendance':
            content = `<h2>Attendance</h2>
                       <ul id="pdfList"></ul>
                       <div id="pdfContent"></div>
                       <ul id="excelList"></ul>
                       <div id="excelContent"></div>`;
            fetchFiles('Attendance', fetchPdfFiles, fetchExcelFiles);
            break;
        case 'MinutesOfMeeting':
            content = "<h2>Minutes of Meeting</h2><p>Content for Minutes of Meeting goes here.</p>";
            break;
        case 'CheckList':
            content = "<h2>Check List</h2><p>Content for Check List goes here.</p>";
            break;
        case 'PlanningAndAchievement':
            content = "<h2>Planning & Achievement</h2><p>Content for Planning & Achievement goes here.</p>";
            break;
        case 'Reports':
            content = "<h2>Reports</h2><p>Content for Reports goes here.</p>";
            break;
        case 'Books':
            content = "<h2>Books</h2><p>Content for Books goes here.</p>";
            break;
        case 'Articles':
            content = "<h2>Articles</h2><p>Content for Articles goes here.</p>";
            break;
        case 'SelfAssessment':
            content = "<h2>Self Assessment</h2><p>Content for Self Assessment goes here.</p>";
            break;
        default:
            content = "<h2>Welcome! Select a tab to view content.</h2>";
    }

    contentDiv.innerHTML = content;
}

function fetchFiles(directory, pdfCallback, excelCallback) {
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${directory}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(file => {
                const filePath = file.download_url;
                const fileName = file.name;

                if (fileName.endsWith('.pdf')) {
                    pdfCallback(filePath);
                } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
                    excelCallback(filePath);
                }
            });
        })
        .catch(error => console.error('Error fetching files:', error));
}

function fetchPdfFiles(filePath) {
    const pdfList = document.getElementById("pdfList");
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="viewPdf('${filePath}')">${filePath.split('/').pop()}</a>`;
    pdfList.appendChild(li);
}

function viewPdf(url) {
    document.getElementById('pdfContent').innerHTML = `<iframe src="${url}" width="100%" height="500px"></iframe>`;
}

function fetchExcelFiles(filePath) {
    const excelList = document.getElementById("excelList");
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="viewExcel('${filePath}')">${filePath.split('/').pop()}</a>`;
    excelList.appendChild(li);
}

function viewExcel(url) {
    fetch(url)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, {type: 'array'});
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const html = XLSX.utils.sheet_to_html(worksheet);
            document.getElementById('excelContent').innerHTML = html;
        })
        .catch(error => console.error('Error reading Excel file:', error));
}
