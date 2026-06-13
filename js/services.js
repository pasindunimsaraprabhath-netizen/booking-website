document.addEventListener("DOMContentLoaded", () => {
    // Modal elements
    const modal = document.getElementById('servicesModal');
    const closeModal = document.querySelector('.close-modal');
    const modalVehicle = document.getElementById('modalVehicle');
    const bookingForm = document.getElementById('servicesBookingForm');
    const bookingMessage = document.getElementById('bookingMessage');
    let currentVehicle = '';

    // Open modal
    const bookButtons = document.querySelectorAll('.book-now-btn');
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentVehicle = btn.getAttribute('data-vehicle');
            if (modalVehicle) modalVehicle.innerText = `Request Quote: ${currentVehicle}`;
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
            const name = document.getElementById('clientName').value.trim();
            const email = document.getElementById('clientEmail').value.trim();
            const pickup = document.getElementById('pickupLocation').value.trim();
            const dropoff = document.getElementById('dropoffLocation').value.trim();

            if (!name || !email || !pickup) {
                bookingMessage.innerHTML = '⚠️ Please fill all required fields.';
                bookingMessage.className = 'modal-msg error';
                bookingMessage.style.display = 'block';
                return;
            }
            bookingMessage.innerHTML = `✅ Thank you ${name}! Your request for ${currentVehicle} (From: ${pickup}) has been received. We will send a quote to ${email} shortly.`;
            bookingMessage.className = 'modal-msg success';
            bookingMessage.style.display = 'block';
            
            setTimeout(() => {
                modal.classList.remove('active');
            }, 3500);
        });
    }
});
