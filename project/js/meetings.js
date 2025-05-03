// Meetings script
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
    const newMeetingBtn = document.getElementById('new-meeting-btn');
    const joinMeetingBtn = document.getElementById('join-meeting-btn');
    const newMeetingModal = document.getElementById('new-meeting-modal');
    const joinMeetingModal = document.getElementById('join-meeting-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    // Create meeting modal
    if (newMeetingBtn && newMeetingModal) {
        newMeetingBtn.addEventListener('click', () => {
            newMeetingModal.classList.add('show');
        });
    }
    
    // Join meeting modal
    if (joinMeetingBtn && joinMeetingModal) {
        joinMeetingBtn.addEventListener('click', () => {
            joinMeetingModal.classList.add('show');
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
    
    // Create meeting form handling
    const createMeetingForm = document.getElementById('new-meeting-form');
    const createMeetingSubmit = document.getElementById('create-meeting-submit');
    
    if (createMeetingForm && createMeetingSubmit) {
        createMeetingSubmit.addEventListener('click', () => {
            const title = document.getElementById('meeting-title').value;
            const meetingClass = document.getElementById('meeting-class').value;
            const date = document.getElementById('meeting-date').value;
            const time = document.getElementById('meeting-time').value;
            
            if (!title || !meetingClass || !date || !time) {
                alert('Please fill all required fields');
                return;
            }
            
            // Here you would make an API call to create the meeting
            // For the frontend demo, we'll simulate success
            
            // Simulate API call delay
            setTimeout(() => {
                alert(`Meeting "${title}" scheduled successfully!`);
                
                // Close the modal
                newMeetingModal.classList.remove('show');
                
                // Clear the form
                createMeetingForm.reset();
                
                // Generate a random meeting code (in a real app, this would come from the server)
                const meetingCode = Math.random().toString(36).substring(2, 8);
                
                // Show success message with meeting code
                alert(`Your meeting has been created. The meeting code is: ${meetingCode}`);
                
                // In a real application, you would update the DOM to show the new meeting
                // For demo purposes, we'll reload the page
                location.reload();
            }, 1000);
        });
    }
    
    // Join meeting form handling
    const joinMeetingForm = document.getElementById('join-meeting-form');
    const joinMeetingSubmit = document.getElementById('join-meeting-submit');
    const meetingRoom = document.getElementById('meeting-room');
    
    if (joinMeetingForm && joinMeetingSubmit && meetingRoom) {
        joinMeetingSubmit.addEventListener('click', () => {
            const meetingCode = document.getElementById('meeting-code').value;
            
            if (!meetingCode) {
                alert('Please enter a meeting code');
                return;
            }
            
            // Here you would make an API call to join the meeting
            // For the frontend demo, we'll show the meeting room
            
            // Close the modal
            joinMeetingModal.classList.remove('show');
            
            // Show the meeting room
            meetingRoom.classList.add('active');
        });
    }
    
    // Handle meeting room functionality
    const endMeetingBtn = document.getElementById('end-meeting-btn');
    
    if (endMeetingBtn && meetingRoom) {
        endMeetingBtn.addEventListener('click', () => {
            meetingRoom.classList.remove('active');
        });
    }
    
    // Tab switching logic in meeting room
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.meeting-room-sidebar .tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected button and content
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Join meeting from meeting card
    const joinNowButtons = document.querySelectorAll('.meeting-card-actions .btn-primary');
    
    joinNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Show the meeting room
            if (meetingRoom) {
                meetingRoom.classList.add('active');
            }
        });
    });
    
    // Mute/unmute and video on/off toggles
    const audioToggleBtn = document.querySelector('.meeting-control:nth-child(1)');
    const videoToggleBtn = document.querySelector('.meeting-control:nth-child(2)');
    
    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            const icon = audioToggleBtn.querySelector('.material-icons');
            if (icon.textContent === 'mic') {
                icon.textContent = 'mic_off';
                // Here you would actually mute the audio
            } else {
                icon.textContent = 'mic';
                // Here you would unmute the audio
            }
        });
    }
    
    if (videoToggleBtn) {
        videoToggleBtn.addEventListener('click', () => {
            const icon = videoToggleBtn.querySelector('.material-icons');
            if (icon.textContent === 'videocam') {
                icon.textContent = 'videocam_off';
                // Here you would actually turn off the video
            } else {
                icon.textContent = 'videocam';
                // Here you would turn on the video
            }
        });
    }
    
    // Send chat message
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input .btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatInput && sendButton && chatMessages) {
        sendButton.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Get user info
        const userInfoString = sessionStorage.getItem('userInfo');
        if (!userInfoString) return;
        
        const userInfo = JSON.parse(userInfoString);
        
        // Create the message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message');
        
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-sender">
                <div class="avatar small">${userInfo.initials}</div>
                <div class="sender-info">
                    <p class="sender-name">${userInfo.name}</p>
                    <p class="message-time">${time}</p>
                </div>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        // Add the message to the chat
        chatMessages.appendChild(messageElement);
        
        // Clear the input
        chatInput.value = '';
        
        // Scroll to the bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});