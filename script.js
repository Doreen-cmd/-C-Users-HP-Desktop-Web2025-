document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Ensure all appointment buttons work
    const appointmentButtons = document.querySelectorAll('a[href="appointment.html"]');
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // This ensures the link works even if there's an issue with the href
            e.preventDefault();
            window.location.href = 'appointment.html';
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevTestimonial = document.getElementById('prev-testimonial');
    const nextTestimonial = document.getElementById('next-testimonial');
    
    if (testimonials.length > 0 && prevTestimonial && nextTestimonial) {
        let currentTestimonial = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Show next testimonial
        nextTestimonial.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        });
        
        // Show previous testimonial
        prevTestimonial.addEventListener('click', function() {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        });
    }

    // Facilities Slider
    const facilitySlides = document.querySelectorAll('.facility-slide');
    const prevFacility = document.getElementById('prev-facility');
    const nextFacility = document.getElementById('next-facility');
    
    if (facilitySlides.length > 0 && prevFacility && nextFacility) {
        let currentFacility = 0;
        
        // Hide all facility slides except the first one
        facilitySlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Show next facility
        nextFacility.addEventListener('click', function() {
            facilitySlides[currentFacility].style.display = 'none';
            currentFacility = (currentFacility + 1) % facilitySlides.length;
            facilitySlides[currentFacility].style.display = 'block';
        });
        
        // Show previous facility
        prevFacility.addEventListener('click', function() {
            facilitySlides[currentFacility].style.display = 'none';
            currentFacility = (currentFacility - 1 + facilitySlides.length) % facilitySlides.length;
            facilitySlides[currentFacility].style.display = 'block';
        });
    }

    // Doctor Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const doctorCards = document.querySelectorAll('.doctor-card');
    
    if (filterButtons.length > 0 && doctorCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide doctor cards based on filter
                doctorCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function() {
                // Toggle active class on clicked item
                item.classList.toggle('active');
                
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                isValid = false;
                showError(name, 'Please enter your name');
            } else {
                removeError(name);
            }
            
            if (!email.value.trim()) {
                isValid = false;
                showError(email, 'Please enter your email');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                removeError(email);
            }
            
            if (!message.value.trim()) {
                isValid = false;
                showError(message, 'Please enter your message');
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Appointment Form Steps
    const appointmentForm = document.getElementById('appointmentForm');
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.appointment-form');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    if (appointmentForm) {
        // Doctor selection
        const doctorOptions = document.querySelectorAll('.doctor-option');
        const specialtySelect = document.getElementById('specialty');
        
        doctorOptions.forEach(option => {
            option.addEventListener('click', function() {
                doctorOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        if (specialtySelect) {
            specialtySelect.addEventListener('change', function() {
                const specialty = this.value;
                
                doctorOptions.forEach(option => {
                    if (specialty === 'all' || option.getAttribute('data-specialty') === specialty) {
                        option.style.display = 'block';
                    } else {
                        option.style.display = 'none';
                        option.classList.remove('selected');
                    }
                });
            });
        }
        
        // Time slot selection
        const timeSlots = document.querySelectorAll('.time-slot:not(.unavailable)');
        
        timeSlots.forEach(slot => {
            slot.addEventListener('click', function() {
                timeSlots.forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
        
        // Next step buttons
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextStep = parseInt(this.getAttribute('data-next'));
                
                // Validate current step
                if (validateStep(nextStep - 1)) {
                    // Hide all form steps
                    formSteps.forEach(step => step.classList.remove('active'));
                    
                    // Show the next step
                    document.getElementById(`step${nextStep}`).classList.add('active');
                    
                    // Update step indicators
                    steps.forEach(step => {
                        if (parseInt(step.getAttribute('data-step')) <= nextStep) {
                            step.classList.add('active');
                        } else {
                            step.classList.remove('active');
                        }
                    });
                    
                    // If it's the last step, populate confirmation details
                    if (nextStep === 4) {
                        populateConfirmationDetails();
                    }
                }
            });
        });
        
        // Previous step buttons
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const prevStep = parseInt(this.getAttribute('data-prev'));
                
                // Hide all form steps
                formSteps.forEach(step => step.classList.remove('active'));
                
                // Show the previous step
                document.getElementById(`step${prevStep}`).classList.add('active');
                
                // Update step indicators
                steps.forEach(step => {
                    if (parseInt(step.getAttribute('data-step')) <= prevStep) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
            });
        });
        
        // Submit appointment form
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateStep(4)) {
                // In a real application, you would send the form data to a server
                alert('Thank you for booking an appointment! We will confirm your appointment shortly.');
                
                // Reset form and go back to step 1
                appointmentForm.reset();
                formSteps.forEach(step => step.classList.remove('active'));
                document.getElementById('step1').classList.add('active');
                
                steps.forEach(step => {
                    if (parseInt(step.getAttribute('data-step')) === 1) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                // Reset selections
                doctorOptions.forEach(option => option.classList.remove('selected'));
                timeSlots.forEach(slot => slot.classList.remove('selected'));
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--error-color)';
        errorElement.style.fontSize = '0.9rem';
        errorElement.style.marginTop = '5px';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.style.borderColor = 'var(--error-color)';
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = 'var(--border-color)';
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validateStep(stepNumber) {
        let isValid = true;
        
        switch (stepNumber) {
            case 1:
                // Validate personal information
                const firstName = document.getElementById('firstName');
                const lastName = document.getElementById('lastName');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');
                const reason = document.getElementById('reason');
                
                if (!firstName.value.trim()) {
                    isValid = false;
                    showError(firstName, 'Please enter your first name');
                } else {
                    removeError(firstName);
                }
                
                if (!lastName.value.trim()) {
                    isValid = false;
                    showError(lastName, 'Please enter your last name');
                } else {
                    removeError(lastName);
                }
                
                if (!email.value.trim()) {
                    isValid = false;
                    showError(email, 'Please enter your email');
                } else if (!isValidEmail(email.value)) {
                    isValid = false;
                    showError(email, 'Please enter a valid email');
                } else {
                    removeError(email);
                }
                
                if (!phone.value.trim()) {
                    isValid = false;
                    showError(phone, 'Please enter your phone number');
                } else {
                    removeError(phone);
                }
                
                if (!reason.value) {
                    isValid = false;
                    showError(reason, 'Please select a reason for your visit');
                } else {
                    removeError(reason);
                }
                break;
                
            case 2:
                // Validate doctor selection
                const selectedDoctor = document.querySelector('.doctor-option.selected');
                
                if (!selectedDoctor) {
                    isValid = false;
                    alert('Please select a doctor');
                }
                break;
                
            case 3:
                // Validate date and time selection
                const appointmentDate = document.getElementById('appointmentDate');
                const selectedTimeSlot = document.querySelector('.time-slot.selected');
                
                if (!appointmentDate.value) {
                    isValid = false;
                    showError(appointmentDate, 'Please select a date');
                } else {
                    removeError(appointmentDate);
                }
                
                if (!selectedTimeSlot) {
                    isValid = false;
                    alert('Please select a time slot');
                }
                break;
                
            case 4:
                // Final validation before submission
                isValid = true; // All validations already done in previous steps
                break;
        }
        
        return isValid;
    }

    function populateConfirmationDetails() {
        // Get selected values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const reason = document.getElementById('reason').options[document.getElementById('reason').selectedIndex].text;
        
        const selectedDoctor = document.querySelector('.doctor-option.selected');
        const doctorName = selectedDoctor ? selectedDoctor.querySelector('h4').textContent : '';
        const doctorSpecialty = selectedDoctor ? selectedDoctor.querySelector('p').textContent : '';
        
        const appointmentDate = document.getElementById('appointmentDate').value;
        const selectedTimeSlot = document.querySelector('.time-slot.selected');
        const timeSlot = selectedTimeSlot ? selectedTimeSlot.textContent : '';
        
        // Format date
        const formattedDate = appointmentDate ? new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '';
        
        // Create confirmation details HTML
        const confirmationDetails = `
            <h3>Appointment Details</h3>
            <p><i class="fas fa-user"></i> <strong>Patient:</strong> ${firstName} ${lastName}</p>
            <p><i class="fas fa-envelope"></i> <strong>Email:</strong> ${email}</p>
            <p><i class="fas fa-phone"></i> <strong>Phone:</strong> ${phone}</p>
            <p><i class="fas fa-stethoscope"></i> <strong>Doctor:</strong> ${doctorName} (${doctorSpecialty})</p>
            <p><i class="fas fa-calendar-alt"></i> <strong>Date:</strong> ${formattedDate}</p>
            <p><i class="fas fa-clock"></i> <strong>Time:</strong> ${timeSlot}</p>
            <p><i class="fas fa-clipboard-list"></i> <strong>Reason:</strong> ${reason}</p>
        `;
        
        // Add confirmation details to the page
        const confirmationContainer = document.createElement('div');
        confirmationContainer.className = 'confirmation-details';
        confirmationContainer.innerHTML = confirmationDetails;
        
        // Replace any existing confirmation details
        const existingConfirmation = document.querySelector('.confirmation-details');
        if (existingConfirmation) {
            existingConfirmation.remove();
        }
        
        // Add to the step 4 container
        const step4 = document.getElementById('step4');
        if (step4) {
            // Add before the form navigation
            const formNavigation = step4.querySelector('.form-navigation');
            step4.insertBefore(confirmationContainer, formNavigation);
        }
    }

    // Complete the appointment form in appointment.html
    const step4 = document.getElementById('step4');
    if (step4 && !step4.innerHTML.trim()) {
        step4.innerHTML = `
            <h2>Confirm Your Appointment</h2>
            <p>Please review your appointment details below and confirm.</p>
            
            <div class="form-group">
                <label for="confirmTerms">
                    <input type="checkbox" id="confirmTerms" name="confirmTerms" required>
                    I confirm that the information provided is correct and I agree to the clinic's terms and conditions.
                </label>
            </div>
            
            <div class="form-navigation">
                <button type="button" class="btn btn-outline prev-step" data-prev="3">Previous: Date & Time</button>
                <button type="submit" class="btn btn-primary">Confirm Appointment</button>
            </div>
        `;
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Run on load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);

    // Emergency banner toggle
    const emergencyBanner = document.querySelector('.emergency-banner');
    const closeBanner = document.querySelector('.close-banner');
    
    if (emergencyBanner && closeBanner) {
        closeBanner.addEventListener('click', function() {
            emergencyBanner.style.display = 'none';
            // Store in session storage so it stays closed during the session
            sessionStorage.setItem('emergencyBannerClosed', 'true');
        });
        
        // Check if banner was previously closed
        if (sessionStorage.getItem('emergencyBannerClosed') === 'true') {
            emergencyBanner.style.display = 'none';
        }
    }

    // Health tips carousel
    const healthTips = document.querySelector('.health-tips');
    if (healthTips) {
        const tipItems = healthTips.querySelectorAll('.tip-item');
        let currentTip = 0;
        
        function showNextTip() {
            tipItems[currentTip].classList.remove('active');
            currentTip = (currentTip + 1) % tipItems.length;
            tipItems[currentTip].classList.add('active');
        }
        
        // Show first tip
        if (tipItems.length > 0) {
            tipItems[0].classList.add('active');
            // Auto rotate tips every 5 seconds
            setInterval(showNextTip, 5000);
        }
    }
});