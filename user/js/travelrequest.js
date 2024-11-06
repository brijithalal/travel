document.getElementById('travelRequestForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page refresh

    // Collect form data
    const empId = document.getElementById('empId').value;
    const empName = document.getElementById('empName').value;
    const project = document.getElementById('project').value;
    const cause = document.getElementById('cause').value;
    const source = document.getElementById('source').value;
    const destination = document.getElementById('destination').value;
    const fromDate = document.getElementById('fromDate').value;
    const noOfDays = document.getElementById('noOfDays').value;
    const modeOfTravel = document.getElementById('modeOfTravel').value;
    const priority = document.getElementById('priority').value;

    // Create request object
    const travelRequest = {
        empId,
        empName,
        project,
        cause,
        source,
        destination,
        fromDate,
        noOfDays,
        modeOfTravel,
        priority
    };

    // Get existing requests from localStorage or initialize empty array
    let requests = JSON.parse(localStorage.getItem('requests')) || [];

    // Add the new request to the array
    requests.push(travelRequest);

    // Save updated requests back to localStorage
    localStorage.setItem('requests', JSON.stringify(requests));

    // Clear the form fields
    document.getElementById('travelRequestForm').reset();
    document.getElementById('requestMessage').textContent = 'Request submitted successfully!';
});


function logout() {
    window.location.href="../html/login.html"
}