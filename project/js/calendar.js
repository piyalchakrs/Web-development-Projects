// Calendar script
document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Calendar navigation
    const prevButton = document.querySelector('.calendar-navigation .btn:first-child');
    const nextButton = document.querySelector('.calendar-navigation .btn:last-child');
    const monthDisplay = document.querySelector('.calendar-navigation h3');
    
    let currentDate = new Date();
    
    if (prevButton && nextButton && monthDisplay) {
        // Update month display
        updateCalendarHeader();
        
        // Previous month button
        prevButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendarHeader();
            // In a real app, you would update the calendar grid here
        });
        
        // Next month button
        nextButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendarHeader();
            // In a real app, you would update the calendar grid here
        });
    }
    
    function updateCalendarHeader() {
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        monthDisplay.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    
    // View switching
    const viewButtons = document.querySelectorAll('.calendar-view-options .btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const view = button.getAttribute('data-view');
            // In a real app, you would switch the calendar view based on this
            console.log(`Switching to ${view} view`);
        });
    });
    
    // Modal handling
    const addEventBtn = document.getElementById('add-event-btn');
    const addEventModal = document.getElementById('add-event-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    
    if (addEventBtn && addEventModal) {
        addEventBtn.addEventListener('click', () => {
            addEventModal.classList.add('show');
            
            // Set default date to today
            const dateInput = document.getElementById('event-date');
            if (dateInput) {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                dateInput.value = `${year}-${month}-${day}`;
            }
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
    
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
        });
    });
    
    // Add event form handling
    const addEventForm = document.getElementById('add-event-form');
    const addEventSubmit = document.getElementById('add-event-submit');
    
    if (addEventForm && addEventSubmit) {
        addEventSubmit.addEventListener('click', () => {
            const title = document.getElementById('event-title').value;
            const eventClass = document.getElementById('event-class').value;
            const date = document.getElementById('event-date').value;
            const time = document.getElementById('event-time').value;
            const eventType = document.getElementById('event-type').value;
            
            if (!title || !date || !time || !eventType) {
                alert('Please fill all required fields');
                return;
            }
            
            // Get selected color
            const activeColorOption = document.querySelector('.color-option.active');
            const color = activeColorOption ? activeColorOption.style.backgroundColor : '#1a73e8';
            
            // Here you would make an API call to add the event
            // For the frontend demo, we'll simulate success
            
            // Simulate API call delay
            setTimeout(() => {
                alert(`Event "${title}" added successfully!`);
                
                // Close the modal
                addEventModal.classList.remove('show');
                
                // Clear the form
                addEventForm.reset();
                
                // In a real application, you would update the calendar
                // For demo purposes, we'll reload the page
                location.reload();
            }, 1000);
        });
    }
    
    // Mini-calendar day selection
    const calendarDays = document.querySelectorAll('.mini-calendar-days span');
    
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            calendarDays.forEach(d => d.classList.remove('current-day'));
            day.classList.add('current-day');
            
            // In a real app, you would update the main calendar
            // and the events list based on the selected day
            console.log(`Selected day: ${day.textContent}`);
        });
    });
    
    // Calendar event click handling
    const calendarEvents = document.querySelectorAll('.calendar-event');
    
    calendarEvents.forEach(event => {
        event.addEventListener('click', () => {
            const title = event.querySelector('.event-title').textContent;
            const time = event.querySelector('.event-time').textContent;
            
            // In a real app, you would show event details
            alert(`Event: ${title} at ${time}`);
        });
    });
});