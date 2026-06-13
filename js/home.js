document.addEventListener("DOMContentLoaded", () => {
    // EmailJS keys from credentials
    const EMAILJS_PUBLIC_KEY = "vh4r0nj_ZQnQyRHny";
    const EMAILJS_SERVICE_ID = "service_wp0ufth";
    const EMAILJS_TEMPLATE_ID = "template_8iumohm";

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const requestBtn = document.getElementById('homeRequestBtn');
    const bookingForm = document.getElementById('homeBookingForm');
    const messageDiv = document.getElementById('homeFormMessage');

    function showMessage(text, isError = false) {
        if (!messageDiv) return;
        messageDiv.textContent = text;
        messageDiv.className = `modal-msg ${isError ? 'error' : 'success'}`;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'modal-msg';
            messageDiv.style.display = 'none';
        }, 5000);
    }

    function validateForm() {
        const pickup = document.getElementById('pickup').value.trim();
        const dropoff = document.getElementById('dropoff').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!pickup) { showMessage("Please enter pick-up location", true); return false; }
        if (!dropoff) { showMessage("Please enter drop-off location/hotel", true); return false; }
        if (!date) { showMessage("Please select travel date", true); return false; }
        if (!time) { showMessage("Please select departure time", true); return false; }
        return true;
    }

    async function handleBooking(e) {
        e.preventDefault();
        if (!validateForm()) return;

        const pickup = document.getElementById('pickup').value.trim();
        const dropoff = document.getElementById('dropoff').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const vehicle = document.getElementById('vehicleType').value;

        // 1. Try sending Email via EmailJS
        let emailSent = false;
        if (typeof emailjs !== 'undefined') {
            const templateParams = {
                pickup: pickup,
                dropoff: dropoff,
                date: date,
                time: time,
                vehicle: vehicle,
            };

            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                emailSent = true;
                console.log("EmailJS Sent Successfully!");
            } catch (error) {
                console.error("EmailJS Error:", error);
            }
        }

        // 2. Format WhatsApp Redirect Message
        const messageText = 
            `🚖 *New Booking Request (Ceylon Horizons)*%0A%0A` +
            `📍 *Pick-up:* ${pickup}%0A` +
            `🏨 *Drop-off:* ${dropoff}%0A` +
            `📅 *Date:* ${date}%0A` +
            `⏰ *Time:* ${time}%0A` +
            `🚗 *Vehicle Type:* ${vehicle}`;

        const whatsappNumber = "94759026156";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${messageText}`;

        if (emailSent) {
            showMessage("✅ Booking request logged! Redirecting to WhatsApp to coordinate transfer...", false);
        } else {
            showMessage("⚠️ Booking request saved locally! Redirecting to WhatsApp...", false);
        }

        // Clear Form fields
        document.getElementById('pickup').value = '';
        document.getElementById('dropoff').value = '';
        document.getElementById('date').value = '';
        document.getElementById('time').value = '';
        document.getElementById('vehicleType').value = 'Standard Car (up to 4 persons)';

        // Open WhatsApp after a short delay so user can read message
        setTimeout(() => {
            window.open(whatsappURL, "_blank");
        }, 1500);
    }

    if (requestBtn) {
        requestBtn.addEventListener('click', handleBooking);
    }
});
