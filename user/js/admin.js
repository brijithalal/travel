
    //-----------------------------------------------------------------

    // Function to load requests from localStorage and display them
function loadRequests(statusFilter = "All") {
    // Get the requests from localStorage
    let requests = JSON.parse(localStorage.getItem('requests')) || [];

    // Get the table body where requests will be displayed
    const tableBody = document.getElementById('requestsTableBody');
    const tabs = document.querySelectorAll('.tab');

    // Clear existing rows before displaying new ones
    tableBody.innerHTML = '';

    // Loop through each request and create a row in the table
    requests.forEach((request,index) => {
        if (statusFilter === "All" || request.status === statusFilter) {
            const row = document.createElement('tr');
            row.classList.add('request-row');

            row.innerHTML = `
                <td>${request.empName}</td>
                <td>${request.destination}</td>
                <td>${request.priority}</td>
              
                <td><button class="view-more-btn" onclick="viewMoreDetails(${index})">View More</button></td>
                <td>
                    <select class="action-dropdown" onchange="updateStatus('${request.empId}', this.value)">
                        <option value="Pending" ${request.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Approved" ${request.status === "Approved" ? "selected" : ""}>Approved</option>
                        <option value="Rejected" ${request.status === "Rejected" ? "selected" : ""}>Rejected</option>
                        <option value="Onhold" ${request.status === "Onhold" ? "selected" : ""}>Onhold</option>
                    </select>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });

    // Remove 'active' class from all tabs and add to the clicked tab
    tabs.forEach(tab => tab.classList.remove('active'));
    const activeTab = document.getElementById(statusFilter.toLowerCase() + 'Tab');
    if (activeTab) activeTab.classList.add('active');
}

// Function to handle "View More" button click (can be expanded later)
// function viewMoreDetails(empId) {
//     alert(`Viewing more details for employee ID: ${empId}`);
// }

// Function to show request details in a modal
// function viewMoreDetails(index) {
//     const travelRequests = JSON.parse(localStorage.getItem('requests')) || [];
//     const request = travelRequests[index];

//     // You can modify this to show a modal with all request details
//     alert(`Employee ID: ${request.empId}\nEmployee Name: ${request.empName}\nProject: ${request.project}\nCause for Travel: ${request.cause}\nSource: ${request.source}\nDestination: ${request.destination}\nFrom Date: ${request.fromDate}\nNo of Days: ${request.noOfDays}\nMode of Travel: ${request.modeOfTravel}\nPriority: ${request.priority}`);
// }

function viewMoreDetails(index) {
    const travelRequests = JSON.parse(localStorage.getItem('requests')) || [];
    const request = travelRequests[index];

    // Populate the modal with request details
    document.getElementById('modalDetails').innerHTML = `
        <p><strong>Employee ID:</strong> ${request.empId}</p>
        <p><strong>Employee Name:</strong> ${request.empName}</p>
        <p><strong>Project:</strong> ${request.project}</p>
        <p><strong>Cause for Travel:</strong> ${request.cause}</p>
        <p><strong>Source:</strong> ${request.source}</p>
        <p><strong>Destination:</strong> ${request.destination}</p>
        <p><strong>From Date:</strong> ${request.fromDate}</p>
        <p><strong>Number of Days:</strong> ${request.noOfDays}</p>
        <p><strong>Mode of Travel:</strong> ${request.modeOfTravel}</p>
        <p><strong>Priority:</strong> ${request.priority}</p>
    `;

    // Show the modal
    document.getElementById('detailsModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}


// Function to update the status of a request
function updateStatus(empId, status) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    const request = requests.find(req => req.empId === empId);
    if (request) {
        request.status = status;
        localStorage.setItem('requests', JSON.stringify(requests));
        loadRequests(document.querySelector('.tab.active').id.replace('Tab', ''));
    }
}

// Function to handle logout
function logout() {
    window.location.href = '../html/login.html'; // Redirect to login page
}

// Event listeners for the tabs to filter requests
document.getElementById('pendingTab').addEventListener('click', function() {
    loadRequests("Pending");
});

document.getElementById('allTab').addEventListener('click', function() {
    loadRequests("All");
});

document.getElementById('approvedTab').addEventListener('click', function() {
    loadRequests("Approved");
});

document.getElementById('rejectedTab').addEventListener('click', function() {
    loadRequests("Rejected");
});

document.getElementById('onholdTab').addEventListener('click', function() {
    loadRequests("Onhold");
});

// Load requests when the page loads
window.onload = function() {
    loadRequests("All");
};


/* <td><button class="view-more-btn" onclick="viewMoreDetails('${request.empId}')">View More</button></td> */