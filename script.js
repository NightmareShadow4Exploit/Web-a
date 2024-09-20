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
            fetchPdfFiles();  // Call to fetch PDF files
            fetchExcelFiles(); // Call to fetch Excel files
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

function fetchPdfFiles() {
    const pdfFiles = [
        // Replace these with the actual paths to your PDF files
        "https://raw.githubusercontent.com/NightmareShadow4Exploit/web-a/main/path/to/your/file1.pdf",
        "https://raw.githubusercontent.com/NightmareShadow4Exploit/web-a/main/path/to/your/file2.pdf"
    ];

    const pdfList = document.getElementById("pdfList");
    pdfFiles.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" onclick="viewPdf('${file}')">${file.split('/').pop()}</a>`;
        pdfList.appendChild(li);
    });
}

function viewPdf(url) {
    document.getElementById('pdfContent').innerHTML = `<iframe src="${url}" width="100%" height="500px"></iframe>`;
}

function fetchExcelFiles() {
    const excelFiles = [
        // Replace these with the actual paths to your Excel files
        "https://raw.githubusercontent.com/NightmareShadow4Exploit/web-a/main/path/to/your/file1.xlsx",
        "https://raw.githubusercontent.com/NightmareShadow4Exploit/web-a/main/path/to/your/file2.xlsx"
    ];

    const excelList = document.getElementById("excelList");
    excelFiles.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" onclick="viewExcel('${file}')">${file.split('/').pop()}</a>`;
        excelList.appendChild(li);
    });
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
