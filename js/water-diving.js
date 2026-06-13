document.addEventListener("DOMContentLoaded", () => {
    // Modal elements
    const modal = document.getElementById('waterModal');
    const closeModal = document.querySelector('.close-modal');
    const modalPlace = document.getElementById('modalPlace');
    const bookingForm = document.getElementById('waterBookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    let currentActivity = '';

    // Open modal
    const bookButtons = document.querySelectorAll('.book-now-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentActivity = btn.getAttribute('data-activity');
            if (modalPlace) modalPlace.innerText = `Book: ${currentActivity}`;
            if (modal) modal.classList.add('active');
            if (bookingMessage) {
                bookingMessage.className = 'modal-msg';
                bookingMessage.style.display = 'none';
            }
            if (bookingForm) bookingForm.reset();
        });
    });

    // Close modal
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('diverName').value.trim();
            const email = document.getElementById('diverEmail').value.trim();
            const date = document.getElementById('diveDate').value;
            const cert = document.getElementById('certLevel').value;

            if (!name || !email || !date) {
                bookingMessage.innerHTML = '⚠️ Please fill all required fields.';
                bookingMessage.className = 'modal-msg error';
                bookingMessage.style.display = 'block';
                return;
            }
            bookingMessage.innerHTML = `✅ Thank you ${name}! Your booking for ${currentActivity} on ${date} (Certification: ${cert}) has been received. We will email you at ${email} with details.`;
            bookingMessage.className = 'modal-msg success';
            bookingMessage.style.display = 'block';
            
            setTimeout(() => {
                modal.classList.remove('active');
            }, 3500);
        });
    }
});
