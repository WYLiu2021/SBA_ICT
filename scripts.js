// Current user information (would be loaded from server in a real application)
let currentUser = {
    sid: 'S12345678',
    name: 'John Smith',
    chineseName: '陳大文',
    className: '6A',
    classNo: 101,
    role: 1, // 1=Student, 2=Class Monitor, 3=Subject Rep, 4=Teacher, 5=Panel Head, 6=Admin
    initials: 'JS'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up user interface based on role
    setupUserInterface();
    
    // Initialize charts
    initializeCharts();
});

function setupUserInterface() {
    // Set user information
    document.getElementById('user-avatar').innerText = currentUser.initials;
    
    // Show/hide menus based on role
    if (currentUser.role >= 4) { // Teacher, Panel Head
        document.getElementById('teacher-menu').style.display = 'block';
    }
    
    if (currentUser.role >= 6) { // Admin
        document.getElementById('admin-menu').style.display = 'block';
    }
}

function initializeCharts() {
    // Assignment Progress Chart
    const progressCtx = document.getElementById('assignmentProgressChart').getContext('2d');
    const progressChart = new Chart(progressCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pending', 'Submitted', 'Graded'],
            datasets: [{
                data: [5, 8, 7],
                backgroundColor: [
                    '#ffc107',
                    '#17a2b8',
                    '#28a745'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Function to view assignment details
function viewAssignment(assignmentId) {
    window.location.href = `assignment-details.html?id=${assignmentId}`;
}

// Function to submit assignment
function submitAssignment(assignmentId) {
    window.location.href = `submit-assignment.html?id=${assignmentId}`;
}

// Function to view submission
function viewSubmission(submissionId) {
    window.location.href = `submission-details.html?id=${submissionId}`;
}

// Function to view feedback
function viewFeedback(submissionId) {
    window.location.href = `submission-feedback.html?id=${submissionId}`;
}

// Function to handle logout
function logout() {
    // In a real application, this would involve server-side session termination
    // For now, just redirect to login page
    window.location.href = 'login.html';
}

// Security measures
// 1. XSS Protection
function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

// 2. CSRF Protection (simplified example)
function addCSRFToken(formData) {
    // In a real application, this token would be generated server-side
    const csrfToken = 'random-csrf-token-would-be-generated-server-side';
    formData.append('csrf_token', csrfToken);
    return formData;
}

// 3. Input validation example
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// 4. Session timeout handling
let sessionTimeout;

function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(function() {
        // Show session timeout warning
        if (confirm('Your session is about to expire. Would you like to continue?')) {
            // Extend session (would call server API in real application)
            resetSessionTimeout();
        } else {
            // Logout
            logout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Reset session timeout on user activity
['click', 'keypress', 'scroll', 'mousemove'].forEach(event => {
    document.addEventListener(event, resetSessionTimeout);
});

// Initialize session timeout
resetSessionTimeout();
