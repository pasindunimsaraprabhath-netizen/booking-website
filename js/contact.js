// Initialize EmailJS with your Public Key
        (function() {
            // Your EmailJS Public Key (already set)
            emailjs.init("vh4r0nj_ZQnQyRHny");
            console.log("EmailJS initialized");
        })();

        document.addEventListener('DOMContentLoaded', function() {
            
            const contactForm = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            
            // Your EmailJS configuration
            const EMAILJS_SERVICE_ID = 'service_gi085dp';
            const EMAILJS_TEMPLATE_ID = 'template_tx9hwqc';
            
            // Your contact details
            const YOUR_EMAIL = 'pnimsara883@gmail.com';
            const YOUR_WHATSAPP = '94759026156';
            
            if (!contactForm) {
                console.error('Contact form not found');
                return;
            }
            
            // Helper to show messages
            function showMessage(msg, type) {
                formMessage.innerHTML = msg;
                formMessage.className = `form-message ${type}`;
                formMessage.style.display = 'block';
                
                // Auto hide after 8 seconds
                setTimeout(() => {
                    if (formMessage.style.display === 'block') {
                        formMessage.style.opacity = '0';
                        setTimeout(() => {
                            formMessage.style.display = 'none';
                            formMessage.style.opacity = '1';
                        }, 500);
                    }
                }, 8000);
            }
            
            // Handle form submission
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Get form values with correct IDs
                const fullName = document.getElementById('from_name')?.value.trim() || '';
                const email = document.getElementById('email_address')?.value.trim() || '';
                const whatsapp = document.getElementById('whatsapp_number')?.value.trim() || '';
                const subject = document.getElementById('subject')?.value.trim() || '';
                const messageText = document.getElementById('message')?.value.trim() || '';
                
                
                // Validation
                if (!fullName) {
                    showMessage('❌ Please enter your full name.', 'error');
                    return;
                }
                if (!email) {
                    showMessage('❌ Please enter your email address.', 'error');
                    return;
                }
                if (!subject) {
                    showMessage('❌ Please enter a subject.', 'error');
                    return;
                }
                if (!messageText) {
                    showMessage('❌ Please enter your message.', 'error');
                    return;
                }
                
                // Email validation
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email)) {
                    showMessage('❌ Please enter a valid email address.', 'error');
                    return;
                }
                
                // Format WhatsApp number
                let formattedWhatsApp = whatsapp;
                if (formattedWhatsApp) {
                    formattedWhatsApp = formattedWhatsApp.replace(/\D/g, '');
                    if (formattedWhatsApp.startsWith('0')) {
                        formattedWhatsApp = '94' + formattedWhatsApp.substring(1);
                    } else if (!formattedWhatsApp.startsWith('94') && formattedWhatsApp.length === 9) {
                        formattedWhatsApp = '94' + formattedWhatsApp;
                    }
                } else {
                    formattedWhatsApp = 'Not provided';
                }
                
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                formMessage.style.display = 'none';
                
                // Prepare data for EmailJS
                const templateParams = {
                    from_name: fullName,
                    from_email: email,
                    from_whatsapp: formattedWhatsApp,
                    subject: subject,
                    message: messageText,
                    to_email: YOUR_EMAIL,
                    reply_to: email
                };
                
                try {
                    console.log('Sending email with params:', templateParams);
                    
                    const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
                    
                    console.log('Email sent successfully:', response);
                    
                    showMessage(`
                        <i class="fas fa-check-circle"></i> 
                        ✅ Thank you ${fullName}! Your message has been sent successfully.<br>
                        <strong>We will contact you within 24 hours via ${email} or WhatsApp.</strong><br>
                        🙏 Safe travels from Ceylon Horizons!
                    `, 'success');
                    
                    // Reset the form
                    contactForm.reset();
                    
                } catch (error) {
                    console.error('Error sending message:', error);
                    
                    let errorMsg = '❌ Failed to send message. Please try again later.';
                    if (error.text) {
                        errorMsg += `<br><small>Error: ${error.text.substring(0, 100)}</small>`;
                    }
                    
                    showMessage(errorMsg, 'error');
                    
                } finally {
                    // Reset button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                }
            });
            
            // WhatsApp number formatting helper
            const whatsappInput = document.getElementById('whatsapp_number');
            if (whatsappInput) {
                whatsappInput.addEventListener('input', function(e) {
                    let value = this.value.replace(/[^0-9+]/g, '');
                    this.value = value;
                });
            }
        });