// Authentication script
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching logic
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected tab and content
            tab.classList.add('active');
            document.getElementById(`${tabId}-form`).classList.add('active');
        });
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Validate form (basic validation)
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would normally make an API call to your backend
            // For the frontend demo, we'll simulate success and redirect
            
            // Simulate API call delay
            setTimeout(() => {
                // Store user info in session storage (demo only)
                const userInfo = {
                    name: 'John Smith',
                    email: email,
                    role: 'student',
                    initials: 'JS'
                };
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
    
    // Sign up form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const role = document.getElementById('role').value;
            
            // Validate form
            if (!fullName || !email || !password || !role) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would make an API call to register the user
            // For the frontend demo, we'll simulate success
            
            // Simulate API call delay
            setTimeout(() => {
                // Store user info in session storage (demo only)
                const initials = fullName.split(' ').map(name => name[0]).join('');
                const userInfo = {
                    name: fullName,
                    email: email,
                    role: role,
                    initials: initials
                };
                sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }
});