//  // Function to filter requests by status (for simplicity, we will only show all)
//  function filterRequests(status) {
//     const requests = JSON.parse(localStorage.getItem('requests')) || [];
//     const filteredRequests = status === 'pending' ? requests : requests.filter(request => request.priority.toLowerCase() === status.toLowerCase());

//     displayRequests(filteredRequests);
// }

// // Function to display requests in the table
// function displayRequests(requests) {
//     const tableBody = document.querySelector('#requestsTable tbody');
//     tableBody.innerHTML = ''; // Clear any existing rows

//     requests.forEach(request => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${request.empName}</td>
//             <td>${request.empId}</td>
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
//         alert(`Employee: ${request.empName}\nProject: ${request.project}\nCause: ${request.cause}\nPriority: ${request.priority}`);
//     }
// }



// Function to filter requests by status
function filterRequests(status) {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];

    // If status is 'all', display all requests, otherwise filter by the status (pending, approved, rejected)
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
            <td>${request.empId}</td>
            <td>${request.project}</td>
            <td>${request.priority}</td>
            <td><button onclick="viewRequest('${request.empId}')">View</button></td>
        `;
        tableBody.appendChild(row);
    });
}

// On page load, display all requests
window.onload = function() {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    displayRequests(requests);
};

// Function to view the details of a specific request
function viewRequest(empId) {
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const request = requests.find(req => req.empId === empId);

    if (request) {
        alert(`Employee: ${request.empName}\nProject: ${request.project}\nCause: ${request.cause}\nPriority: ${request.priority}\nStatus: ${request.status}`);
    } else {
        alert("Request not found.");
    }
}
