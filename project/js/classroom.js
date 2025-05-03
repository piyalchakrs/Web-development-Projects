// Classroom script
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Tab switching logic
    const tabs = document.querySelectorAll('.classroom-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected tab and content
            tab.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Handle posting announcements
    const announcementForm = document.querySelector('.announcement-form');
    if (announcementForm) {
        const input = announcementForm.querySelector('input');
        const postButton = announcementForm.querySelector('.btn-primary');
        
        postButton.addEventListener('click', () => {
            const announcement = input.value.trim();
            
            if (!announcement) {
                alert('Please enter an announcement');
                return;
            }
            
            // Here you would make an API call to post the announcement
            // For the frontend demo, we'll add it to the DOM
            
            // Get user info from session storage
            const userInfoString = sessionStorage.getItem('userInfo');
            if (!userInfoString) return;
            
            const userInfo = JSON.parse(userInfoString);
            
            // Create the announcement element
            const streamItems = document.querySelector('.stream-items');
            const newAnnouncement = document.createElement('div');
            newAnnouncement.classList.add('stream-item');
            
            const now = new Date();
            const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            newAnnouncement.innerHTML = `
                <div class="stream-item-header">
                    <div class="avatar">${userInfo.initials}</div>
                    <div class="author-info">
                        <h4>${userInfo.name}</h4>
                        <p>Just now, ${time}</p>
                    </div>
                </div>
                <div class="stream-item-content">
                    <p>${announcement}</p>
                </div>
                <div class="stream-item-actions">
                    <button class="btn btn-text">
                        <span class="material-icons">comment</span>
                        Comments
                    </button>
                </div>
            `;
            
            // Add the announcement to the top of the stream
            streamItems.insertBefore(newAnnouncement, streamItems.firstChild);
            
            // Clear the input
            input.value = '';
            
            // Add animation
            newAnnouncement.style.animation = 'fade-in-up 0.5s ease-out';
        });
    }
    
    // Handle submission view
    const viewAssignmentButtons = document.querySelectorAll('.btn-primary[data-assignment]');
    viewAssignmentButtons.forEach(button => {
        button.addEventListener('click', () => {
            const assignmentId = button.getAttribute('data-assignment');
            // In a real application, you would navigate to the assignment page
            alert(`Navigate to assignment: ${assignmentId}`);
        });
    });
    
    // Handle material downloads
    const downloadButtons = document.querySelectorAll('.btn-outline[data-material]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const materialId = button.getAttribute('data-material');
            // In a real application, you would download the file
            alert(`Download material: ${materialId}`);
        });
    });
});