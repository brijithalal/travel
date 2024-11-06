// // Function to filter requests by status
// function filterRequests(status) {
//     const requests = JSON.parse(localStorage.getItem('requests')) || [];

//     // If status is 'all', show all requests, otherwise filter by the selected status (pending, approved, rejected)
//     const filteredRequests = status === 'all' 
//         ? requests 
//         : requests.filter(request => request.status.toLowerCase() === status.toLowerCase());

//     displayRequests(filteredRequests);
// }

// // Function to display requests in the table
// function displayRequests(requests) {
//     const tableBody = document.querySelector('#requestsTable tbody');
//     tableBody.innerHTML = ''; // Clear any existing rows

//     // If no requests match the filter, show a message
//     if (requests.length === 0) {
//         const row = document.createElement('tr');
//         row.innerHTML = `<td colspan="5">No requests found.</td>`;
//         tableBody.appendChild(row);
//         return;
//     }

//     // Display each request as a row in the table
//     requests.forEach(request => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${request.empName}</td>
//             <td>${request.designation}</td>
//             <td>${request.project}</td>
//             <td>${request.priority}</td>
//             <td><button onclick="viewRequest('${request.empId}')">View</button></td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// // On page load, display all requests
// window.onload = function() {
//     const requests = JSON.parse(localStorage.getItem('requests')) || [];
//     displayRequests(requests);
// };

// // Function to view the details of a specific request
// function viewRequest(empId) {
//     const requests = JSON.parse(localStorage.getItem('requests')) || [];
//     const request = requests.find(req => req.empId === empId);

//     if (request) {
//         alert(`Employee: ${request.empName}\nProject: ${request.project}\nCause: ${request.cause}\nPriority: ${request.priority}\nStatus: ${request.status}`);
//     } else {
//         alert("Request not found.");
//     }
// }


// Function to filter requests by status
function filterRequests(status) {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];

    // If status is 'all', show all requests, otherwise filter by the selected status (pending, approved, rejected)
    const filteredRequests = status === 'all' 
        ? requests 
        : requests.filter(request => request.status.toLowerCase() === status.toLowerCase());

    displayRequests(filteredRequests);
}

// Function to display requests in the table
function displayRequests(requests) {
    const tableBody = document.querySelector('#requestsTable tbody');
    tableBody.innerHTML = ''; // Clear any existing rows

    // If no requests match the filter, show a message
    if (requests.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="5">No requests found.</td>`;
        tableBody.appendChild(row);
        return;
    }

    // Display each request as a row in the table
    requests.forEach(request => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${request.empName}</td>
            <td>${request.destination}</td>
            <td>${request.project}</td>
            <td>${request.priority}</td>
            <td><button onclick="viewRequest('${request.empId}')">View </button>
            <button onclick="deleteRequest('${request.empId}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to approve a request and update the status
function approveRequest(empId) {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const request = requests.find(req => req.empId === empId);

    if (request) {
        request.status = 'approved';  // Update the status to 'approved'

        // Save the updated requests back to localStorage
        localStorage.setItem('requests', JSON.stringify(requests));

        // Re-filter the table to show only approved requests
        filterRequests('approved');
    } else {
        alert("Request not found.");
    }
}

// On page load, display all requests
window.onload = function() {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    displayRequests(requests);
};

// Function to view the details of a specific request
// function viewRequest(empId) {
//     const requests = JSON.parse(localStorage.getItem('requests')) || [];
//     const request = requests.find(req => req.empId === empId);

//     if (request) {
//         alert(`Employee ID:${request.empId}\nEmployee Name: ${request.empName}\nProject: ${request.project}\nCause: ${request.cause}\nSource:${request.source}\nPriority: ${request.priority}\nStatus: ${request.status}`);
//     } else {
//         alert("Request not found.");
//     }
// }


function viewRequest(empId) {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const request = requests.find(req => req.empId === empId);

    if (request) {
        const message = `
            <div class="alert-item"><strong>Employee ID:</strong> ${request.empId}</div>
            <div class="alert-item"><strong>Employee Name:</strong> ${request.empName}</div>
            <div class="alert-item"><strong>Project:</strong> ${request.project}</div>
            <div class="alert-item"><strong>Cause:</strong> ${request.cause}</div>
            <div class="alert-item"><strong>Source:</strong> ${request.source}</div>
            <div class="alert-item"><strong>Priority:</strong> ${request.priority}</div>
            <div class="alert-item"><strong>Status:</strong> ${request.status}</div>
        `;
        document.getElementById('alertMessage').innerHTML = message;
        document.getElementById('customAlert').style.display = 'block';
    } else {
        alert("Request not found.");
    }
}


// Function to close the alert with the "OK" button
document.getElementById('okButton').onclick = function() {
    document.getElementById('customAlert').style.display = 'none';
};

// Function to close the alert when clicking the close button
document.getElementById('closeAlertBtn').onclick = function() {
    document.getElementById('customAlert').style.display = 'none';
};

// Optionally close the alert when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById('customAlert')) {
        document.getElementById('customAlert').style.display = 'none';
    }
};

function logout() {
     window.location.href="../html/login.html"
}

function filterRequestsByPriority() {
    const selectedPriority = document.getElementById('priorityFilter').value;
    let travelRequests = JSON.parse(localStorage.getItem('requests')) || [];
    
    const filteredRequests = selectedPriority === 'all'
        ? travelRequests
        : travelRequests.filter(request => request.priority.toLowerCase() === selectedPriority);

    displayRequests(filteredRequests);
}



// Function to delete a specific request
function deleteRequest(empId) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    const updatedRequests = requests.filter(request => request.empId !== empId);

    // Save the updated list back to localStorage
    localStorage.setItem('requests', JSON.stringify(updatedRequests));

    // Notify the user
    alert('Request has been deleted.');

    // Refresh the displayed requests
    displayRequests(updatedRequests);
}


function deleteRequest(empId) {
    if (confirm('Are you sure you want to delete this request?')) {
        let requests = JSON.parse(localStorage.getItem('requests')) || [];
        const updatedRequests = requests.filter(request => request.empId !== empId);

        localStorage.setItem('requests', JSON.stringify(updatedRequests));
        alert('Request has been deleted.');
        displayRequests(updatedRequests);
    }
}