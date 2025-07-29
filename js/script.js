document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const titles = [
        "a Data Scientist",
        "a Data Analyst",
        "a ML Enthusiast",
        "an AI Enthusiast"
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentTitle = titles[titleIndex];
        const prefix = "I'm ";
        
        if (isDeleting) {
            heroSubtitle.textContent = prefix + currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            heroSubtitle.textContent = prefix + currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at the end of typing
            isDeleting = true;
            typingSpeed = 1000; // Reduced from 2000ms to 1000ms (1 second)
        } else if (isDeleting && charIndex === 0) {
            // Move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 300; // Reduced from 500ms to 300ms
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    // Enhanced smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            let targetId = this.getAttribute('href');
            let targetElement;
            
            // Remove the # from the targetId if it exists
            if (targetId.startsWith('#')) {
                targetId = targetId.substring(1);
            }
            
            // Find the target element
            targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate the target position, accounting for the fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('show');
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        
        try {
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-message success';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-message error';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Sorry, there was an error. Please try again.';
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 5000);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.setProperty('--width', level + '%');
            
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                bar.classList.add('animate');
            }
        });
    }
    
    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Skills Animation
    const skillsGrid = document.querySelector('.skills-grid');
    const skillsCategories = document.querySelectorAll('.skill-category');
    
    // Clone all skill categories and append them
    skillsCategories.forEach(category => {
        const clone = category.cloneNode(true);
        skillsGrid.appendChild(clone);
    });

    // Set the width of the skills grid to be exactly twice the width of the original content
    const originalWidth = skillsGrid.scrollWidth / 2;
    skillsGrid.style.width = `${originalWidth * 2}px`;

    // Animate skill bars
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach(level => {
        const percentage = level.getAttribute('data-level');
        level.style.setProperty('--width', `${percentage}%`);
        level.classList.add('animate');
    });
});