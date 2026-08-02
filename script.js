document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // DOM Elements
    const preloader = document.getElementById('preloader');
    const preloaderBar = document.getElementById('preloader-bar');
    const preloaderPercentage = document.getElementById('preloader-percentage');
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('back-to-top');
    const typingText = document.getElementById('typing-text');
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillCards = document.querySelectorAll('.skill-card');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    /* ==========================================================================
       1. Preloader Simulation & Page Load
       ========================================================================== */
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        preloaderBar.style.width = `${progress}%`;
        preloaderPercentage.textContent = `${progress}%`;
    }, 80);

    window.addEventListener('load', () => {
        // Ensure progress hits 100% when fully loaded
        clearInterval(progressInterval);
        preloaderBar.style.width = '100%';
        preloaderPercentage.textContent = '100%';
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Trigger entry reveal animations
            document.body.classList.add('loaded');
            triggerHeroStats();
        }, 600);
    });

    /* ==========================================================================
       2. Custom Cursor (Lerped mouse trail)
       ========================================================================== */
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    const lerpSpeed = 0.12;
    let isCursorMoving = false;

    // Show and position cursor
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!isCursorMoving) {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
            isCursorMoving = true;
        }
        
        // Immediate position for center dot
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    // Fade out cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        isCursorMoving = false;
    });

    // Mouse movement loop for lagging cursor outline
    function updateCursorOutline() {
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;
        
        outlineX += dx * lerpSpeed;
        outlineY += dy * lerpSpeed;
        
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursorOutline);
    }
    updateCursorOutline();

    // Hover effect class attachments
    function updateHoverables() {
        const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .info-card, .skill-card, .social-icon');
        hoverables.forEach(item => {
            // Remove first to avoid duplicate listeners
            item.removeEventListener('mouseenter', addHoverClass);
            item.removeEventListener('mouseleave', removeHoverClass);
            
            item.addEventListener('mouseenter', addHoverClass);
            item.addEventListener('mouseleave', removeHoverClass);
        });
    }

    function addHoverClass() {
        document.body.classList.add('cursor-hover');
    }

    function removeHoverClass() {
        document.body.classList.remove('cursor-hover');
    }
    
    updateHoverables();

    /* ==========================================================================
       3. Scroll Progress & Sticky Navbar & Back-to-Top
       ========================================================================== */
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Scroll progress bar width
        scrollProgress.style.width = `${scrollPercent}%`;
        
        // Sticky Header toggles
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Floating Back-to-Top visibility
        if (scrollTop > 450) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    /* ==========================================================================
       4. Navigation Menu & Hamburger
       ========================================================================== */
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking link items
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ==========================================================================
       5. Tagline Typing Animation
       ========================================================================== */
    const roles = [
        "Aspiring Frontend Developer",
        "HTML Developer",
        "CSS Enthusiast",
        "JavaScript Learner",
        "Future Full Stack Developer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // faster backspacing
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // natural writing speed
        }

        // Handle word completions
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // brief pause before writing next word
        }

        setTimeout(type, typingSpeed);
    }
    
    // Start typing after loader finishes
    setTimeout(type, 1500);

    /* ==========================================================================
       6. Active Navigation Link Spy & Counters Scroll Activations
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const activeSpyOptions = {
        root: null,
        threshold: 0.25,
        rootMargin: "-20% 0px -40% 0px"
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, activeSpyOptions);

    sections.forEach(section => {
        spyObserver.observe(section);
    });

    /* ==========================================================================
       7. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserverOptions = {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       8. Stats Counter & Skills Trigger
       ========================================================================== */
    
    // Stats Count Up Animation (Optimized fixed-duration lerp animation)
    function animateCounter(elem) {
        const target = parseInt(elem.getAttribute('data-target'), 10);
        const duration = 1500; // 1.5 seconds animation
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentVal = Math.floor(progress * target);
            
            elem.textContent = currentVal;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                elem.textContent = target;
            }
        }
        
        requestAnimationFrame(update);
    }

    function triggerHeroStats() {
        statNumbers.forEach(num => {
            animateCounter(num);
        });
    }

    // Skills levels animation & percentage count up
    const skillsSection = document.getElementById('skills');
    let skillsTriggered = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsTriggered) {
                skillsSection.classList.add('active');
                
                // Count up skill level text percentage
                const skillPercentages = document.querySelectorAll('.skill-percentage');
                skillPercentages.forEach(pct => {
                    const targetVal = parseInt(pct.getAttribute('data-val'), 10);
                    let val = 0;
                    const speed = 1500 / targetVal;
                    
                    const countTimer = setInterval(() => {
                        val++;
                        pct.textContent = `${val}%`;
                        if (val >= targetVal) {
                            pct.textContent = `${targetVal}%`;
                            clearInterval(countTimer);
                        }
                    }, speed);
                });

                skillsTriggered = true;
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    /* ==========================================================================
       9. Form Validation & Submission Feedback
       ========================================================================== */
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Elements
            const nameInput = document.getElementById('form-name');
            const emailInput = document.getElementById('form-email');
            const messageInput = document.getElementById('form-message');
            
            let isValid = true;
            
            // Check Name
            if (!nameInput.value.trim()) {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }
            
            // Check Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }
            
            // Check Message
            if (!messageInput.value.trim()) {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }
            
            // Handle Submit Mockup
            if (isValid) {
                const btnSubmit = document.getElementById('btn-submit-form');
                const btnText = btnSubmit.querySelector('span');
                const originalText = btnText.textContent;
                
                btnSubmit.disabled = true;
                btnText.textContent = "Sending...";
                
                // Simulate HTTP request
                setTimeout(() => {
                    // Reset Button
                    btnSubmit.disabled = false;
                    btnText.textContent = originalText;
                    
                    // Show Notification
                    formStatus.className = 'form-notification success';
                    formStatus.querySelector('.status-message').textContent = 'Thank you! Your message was sent successfully.';
                    
                    // Reset Form
                    contactForm.reset();
                    
                    // Fade out message after 5 seconds
                    setTimeout(() => {
                        formStatus.className = 'form-notification';
                    }, 5000);
                    
                }, 1800);
            }
        });
        
        // Remove validation invalid flags on keypress/input
        const inputs = contactForm.querySelectorAll('.form-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim()) {
                    input.parentElement.classList.remove('invalid');
                }
            });
        });
    }
});
