document.addEventListener("DOMContentLoaded", () => {
    // Modal elements
    const modal = document.getElementById('bookingModal');
    const closeModal = document.querySelector('.close-modal');
    const modalPlace = document.getElementById('modalPlace');
    const bookingForm = document.getElementById('wildlifeBookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    let currentPlace = '';

    // Open modal when any book-now-btn is clicked
    const bookButtons = document.querySelectorAll('.book-now-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentPlace = btn.getAttribute('data-place');
            if (modalPlace) modalPlace.innerText = `Book Safari: ${currentPlace}`;
            if (modal) {
                modal.classList.add('active');
            }
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
            const name = document.getElementById('visitorName').value.trim();
            const email = document.getElementById('visitorEmail').value.trim();
            const date = document.getElementById('visitDate').value;
            const visitors = document.getElementById('visitorCount').value;

            if (!name || !email || !date) {
                bookingMessage.innerHTML = '⚠️ Please fill all required fields.';
                bookingMessage.className = 'modal-msg error';
                bookingMessage.style.display = 'block';
                return;
            }
            bookingMessage.innerHTML = `✅ Thank you ${name}! Your booking for ${currentPlace} on ${date} (${visitors}) has been received. We will contact you at ${email} shortly.`;
            bookingMessage.className = 'modal-msg success';
            bookingMessage.style.display = 'block';
            
            setTimeout(() => {
                modal.classList.remove('active');
            }, 3000);
        });
    }
});
