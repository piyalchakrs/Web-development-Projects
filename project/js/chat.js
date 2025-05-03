// Chat script
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Chat room selection
    const chatRooms = document.querySelectorAll('.chat-room');
    
    chatRooms.forEach(room => {
        room.addEventListener('click', () => {
            chatRooms.forEach(r => r.classList.remove('active'));
            room.classList.add('active');
            
            // In a real app, you would load the chat messages for this room
            // For the demo, we already have messages loaded
            
            // Remove the unread badge
            const badge = room.querySelector('.badge');
            if (badge) {
                badge.remove();
            }
            
            // Update chat header
            updateChatHeader(room);
        });
    });
    
    function updateChatHeader(room) {
        const chatHeader = document.querySelector('.chat-header-info');
        if (!chatHeader) return;
        
        const icon = room.querySelector('.chat-room-icon') || room.querySelector('.avatar');
        const name = room.querySelector('h5').textContent;
        
        // Clone the icon (either chat-room-icon or avatar)
        let iconClone;
        if (icon.classList.contains('avatar')) {
            iconClone = document.createElement('div');
            iconClone.classList.add('avatar');
            iconClone.textContent = icon.textContent;
        } else {
            iconClone = icon.cloneNode(true);
        }
        
        // Update the header
        chatHeader.innerHTML = '';
        chatHeader.appendChild(iconClone);
        
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `
            <h3>${name}</h3>
            <p>${room.classList.contains('chat-room') ? 'Class Discussion' : 'Direct Message'}</p>
        `;
        
        chatHeader.appendChild(infoDiv);
    }
    
    // Send message functionality
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.chat-input-actions .btn-primary');
    const messagesContainer = document.querySelector('.chat-messages-container');
    
    if (chatInput && sendButton && messagesContainer) {
        sendButton.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
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
            <div class="avatar">${userInfo.initials}</div>
            <div class="message-content">
                <div class="message-header">
                    <h5>${userInfo.name}</h5>
                    <span class="time">${time}</span>
                </div>
                <div class="message-body">
                    <p>${message}</p>
                </div>
                <div class="message-actions">
                    <button class="btn btn-text">Reply</button>
                </div>
            </div>
        `;
        
        // Add the message to the chat
        messagesContainer.appendChild(messageElement);
        
        // Clear the input
        chatInput.value = '';
        
        // Scroll to the bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    // Chat search
    const chatSearch = document.querySelector('.chat-search input');
    
    if (chatSearch) {
        chatSearch.addEventListener('input', () => {
            const searchTerm = chatSearch.value.toLowerCase();
            
            chatRooms.forEach(room => {
                const roomName = room.querySelector('h5').textContent.toLowerCase();
                const lastMessage = room.querySelector('p').textContent.toLowerCase();
                
                if (roomName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
                    room.style.display = 'flex';
                } else {
                    room.style.display = 'none';
                }
            });
        });
    }
    
    // Reply functionality
    const replyButtons = document.querySelectorAll('.message-actions .btn');
    
    replyButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the message
            const message = button.closest('.message-content').querySelector('.message-body p').textContent;
            const author = button.closest('.message-content').querySelector('h5').textContent;
            
            // Set the reply text in the input
            if (chatInput) {
                chatInput.value = `@${author} `;
                chatInput.focus();
            }
        });
    });
});