// Dashboard script
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Modal handling
    const createClassBtn = document.getElementById('create-class-btn');
    const joinClassBtn = document.getElementById('join-class-btn');
    const createClassModal = document.getElementById('create-class-modal');
    const joinClassModal = document.getElementById('join-class-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Create class modal
    if (createClassBtn && createClassModal) {
        createClassBtn.addEventListener('click', () => {
            createClassModal.classList.add('show');
        });
    }
    
    // Join class modal
    if (joinClassBtn && joinClassModal) {
        joinClassBtn.addEventListener('click', () => {
            joinClassModal.classList.add('show');
        });
    }
    
    // Close all modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.classList.remove('show'));
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    });
    
    // Create class form handling
    const createClassForm = document.getElementById('create-class-form');
    const createClassSubmit = document.getElementById('create-class-submit');
    
    if (createClassForm && createClassSubmit) {
        createClassSubmit.addEventListener('click', () => {
            const className = document.getElementById('class-name').value;
            const section = document.getElementById('class-section').value;
            const subject = document.getElementById('class-subject').value;
            const room = document.getElementById('class-room').value;
            
            if (!className || !section || !subject) {
                alert('Please fill all required fields');
                return;
            }
            
            // Here you would make an API call to create the class
            // For the frontend demo, we'll simulate success
            
            // Simulate API call delay
            setTimeout(() => {
                alert(`Class "${className}" created successfully!`);
                
                // Close the modal
                createClassModal.classList.remove('show');
                
                // Clear the form
                createClassForm.reset();
                
                // Reload page to show new class (in a real app, you would update the DOM)
                location.reload();
            }, 1000);
        });
    }
    
    // Join class form handling
    const joinClassForm = document.getElementById('join-class-form');
    const joinClassSubmit = document.getElementById('join-class-submit');
    
    if (joinClassForm && joinClassSubmit) {
        joinClassSubmit.addEventListener('click', () => {
            const classCode = document.getElementById('class-code').value;
            
            if (!classCode) {
                alert('Please enter a class code');
                return;
            }
            
            // Here you would make an API call to join the class
            // For the frontend demo, we'll simulate success
            
            // Simulate API call delay
            setTimeout(() => {
                alert(`Joined class successfully with code: ${classCode}`);
                
                // Close the modal
                joinClassModal.classList.remove('show');
                
                // Clear the form
                joinClassForm.reset();
                
                // Reload page to show new class (in a real app, you would update the DOM)
                location.reload();
            }, 1000);
        });
    }
    
    // Load user info from session storage (demo only)
    const userInfoString = sessionStorage.getItem('userInfo');
    if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        
        // Update user display
        const userNameElement = document.querySelector('.user-name');
        const avatarElements = document.querySelectorAll('.avatar');
        
        if (userNameElement) {
            userNameElement.textContent = userInfo.name;
        }
        
        avatarElements.forEach(avatar => {
            if (!avatar.classList.contains('small')) {
                avatar.textContent = userInfo.initials;
            }
        });
    } else {
        // If no user info, redirect to login
        // window.location.href = 'index.html';
    }
});