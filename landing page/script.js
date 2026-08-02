/* ==========================================================================
   Nova AI - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. Preloader Simulation
     -------------------------------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloader-bar');
  
  if (preloader && preloaderBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add('fade-out');
          document.body.style.overflowY = 'auto'; // Re-enable scroll
        }, 300);
      }
      preloaderBar.style.width = `${progress}%`;
    }, 50);
  }

  /* --------------------------------------------------------------------------
     2. Custom Cursor (Desktop Only)
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorOutline) {
    // Show custom cursor elements
    cursorDot.style.display = 'block';
    cursorOutline.style.display = 'block';

    let cursorX = 0;
    let cursorY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    });

    // Smooth lerp (linear interpolation) animation loop for the outer cursor outline
    const animateOutline = () => {
      const lerpFactor = 0.15; // Speed factor of the outer ring following the dot
      outlineX += (cursorX - outlineX) * lerpFactor;
      outlineY += (cursorY - outlineY) * lerpFactor;
      cursorOutline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(animateOutline);
    };
    requestAnimationFrame(animateOutline);

    // Scaling effect on hoverable elements
    const hoverElements = document.querySelectorAll('a, button, .faq-trigger, .pricing-toggle-btn, .form-input, .social-icon');
    hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursorOutline.classList.add('hovered');
      });
      elem.addEventListener('mouseleave', () => {
        cursorOutline.classList.remove('hovered');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Scroll Progress Bar & Sticky Navbar
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    // Scroll progress indicator
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
      const scrolled = (windowScroll / height) * 100;
      if (scrollProgress) {
        scrollProgress.style.width = `${scrolled}%`;
      }
    }

    // Sticky navbar backdrop change
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  /* --------------------------------------------------------------------------
     4. Mobile Navigation Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinksList = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Close mobile nav when clicking a link
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* --------------------------------------------------------------------------
     5. Scroll Spy Navigation Highlight
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpy = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset for sticky header
      const sectionId = current.getAttribute('id');
      
      const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinksList.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollSpy);

  /* --------------------------------------------------------------------------
     6. Card Radial Mouse Glow Effect (Mouse Hover tracking)
     -------------------------------------------------------------------------- */
  const cards = document.querySelectorAll('.card-glow');
  
  if (!isTouchDevice) {
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse relative x coordinate inside the card
        const y = e.clientY - rect.top;  // Mouse relative y coordinate inside the card
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. Typing Text Animation (Hero Section)
     -------------------------------------------------------------------------- */
  const typingTarget = document.getElementById('typing-target');
  const words = ["Artificial Intelligence.", "Workflow Automation.", "Smart Analytics.", "Productive Futures."];
  
  if (typingTarget) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    const typeAnimation = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typingTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeDelay = 40; // Speeds up deleting
      } else {
        typingTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeDelay = 120; // Normal typing speed
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeDelay = 1500; // Pause at the end of the word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeDelay = 500; // Pause before typing the next word
      }

      setTimeout(typeAnimation, typeDelay);
    };

    // Trigger typing loop
    setTimeout(typeAnimation, 1000);
  }

  /* --------------------------------------------------------------------------
     8. Scroll Reveal Animation using IntersectionObserver
     -------------------------------------------------------------------------- */
  const revealItems = document.querySelectorAll('.reveal-item');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // Animation triggers only once
        }
      });
    }, {
      root: null,
      threshold: 0.12, // Elements start fading when 12% in viewport
      rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly from bottom edge
    });

    revealItems.forEach(item => {
      revealObserver.observe(item);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealItems.forEach(item => item.classList.add('revealed'));
  }

  /* --------------------------------------------------------------------------
     9. Counters Animation (About Section Statistics)
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter-number');
  
  const startCounting = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    const isDecimal = counter.getAttribute('data-decimal') === 'true';
    const scale = parseFloat(counter.getAttribute('data-scale')) || 1;
    
    let count = 0;
    const duration = 2000; // Total duration in ms
    const frameRate = 1000 / 60; // 60 FPS
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const updateCounter = () => {
      currentFrame++;
      
      // Easing function (easeOutQuad)
      const progress = currentFrame / totalFrames;
      const easeProgress = progress * (2 - progress);
      
      const currentValue = easeProgress * target;

      if (isDecimal) {
        counter.textContent = currentValue.toFixed(1) + suffix;
      } else {
        if (scale > 1) {
          // Format scales like Millions (e.g. 1M+)
          const scaledValue = currentValue / scale;
          counter.textContent = scaledValue.toFixed(1) + suffix;
        } else {
          // Format integers nicely with commas if needed
          const integerVal = Math.floor(currentValue);
          counter.textContent = integerVal.toLocaleString() + suffix;
        }
      }

      if (currentFrame < totalFrames) {
        requestAnimationFrame(updateCounter);
      } else {
        // Guarantee target value is exact at the end
        if (isDecimal) {
          counter.textContent = target.toFixed(1) + suffix;
        } else {
          if (scale > 1) {
            counter.textContent = (target / scale).toFixed(1) + suffix;
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        }
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ('IntersectionObserver' in window) {
    const countersObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => {
      countersObserver.observe(counter);
    });
  } else {
    // Fallback instantly displaying final stats
    counters.forEach(counter => {
      const target = counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      counter.textContent = target + suffix;
    });
  }

  /* --------------------------------------------------------------------------
     10. Pricing Plans Billing Toggle (Monthly / Annual)
     -------------------------------------------------------------------------- */
  const pricingToggleBtn = document.getElementById('pricing-toggle');
  const toggleMonthly = document.getElementById('toggle-monthly');
  const toggleAnnual = document.getElementById('toggle-annual');
  const priceValues = document.querySelectorAll('.price-val');

  if (pricingToggleBtn) {
    pricingToggleBtn.addEventListener('click', () => {
      const isAnnual = pricingToggleBtn.classList.toggle('annual');
      
      if (isAnnual) {
        toggleMonthly.classList.remove('active');
        toggleAnnual.classList.add('active');
      } else {
        toggleMonthly.classList.add('active');
        toggleAnnual.classList.remove('active');
      }

      // Animate price updates
      priceValues.forEach(val => {
        // Brief scale down transition
        val.style.transform = 'scale(0.85)';
        val.style.opacity = '0.5';
        
        setTimeout(() => {
          const newPrice = isAnnual ? val.getAttribute('data-annual') : val.getAttribute('data-monthly');
          val.textContent = newPrice;
          val.style.transform = 'scale(1)';
          val.style.opacity = '1';
        }, 150);
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. FAQ Accordion Animation
     -------------------------------------------------------------------------- */
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.parentElement;
      const isOpen = item.classList.contains('open');
      const content = item.querySelector('.faq-content');

      // Close all open FAQ items first
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-content').style.maxHeight = '0px';
          openItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle state of selected item
      if (isOpen) {
        item.classList.remove('open');
        content.style.maxHeight = '0px';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        content.style.maxHeight = `${content.scrollHeight}px`;
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --------------------------------------------------------------------------
     12. Modern Contact Form Handler & Submission
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm && submitBtn && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Perform simple validation
      const nameVal = document.getElementById('contact-name').value.trim();
      const emailVal = document.getElementById('contact-email').value.trim();
      const msgVal = document.getElementById('contact-message').value.trim();

      if (!nameVal || !emailVal || !msgVal) {
        formStatus.textContent = "Please fill in all fields.";
        formStatus.className = "form-status-msg error";
        return;
      }

      // Check email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.className = "form-status-msg error";
        return;
      }

      // Disable button and show sending feedback
      submitBtn.disabled = true;
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span>Sending Message...</span> <i data-lucide="loader-2" class="spin-icon"></i>`;
      if (typeof lucide !== 'undefined') {
        lucide.createIcons(); // Initialize the loader icon
      }
      formStatus.textContent = "";

      // Simulate network latency (1.5 seconds)
      setTimeout(() => {
        formStatus.textContent = "Message sent successfully! We will get back to you shortly.";
        formStatus.className = "form-status-msg success";
        
        // Reset form inputs
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons(); // Re-initialize original icon
        }

        // Auto-clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = "";
        }, 5000);
      }, 1500);
    });
  }

  /* --------------------------------------------------------------------------
     13. Newsletter Form Handler & Submission
     -------------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterStatus = document.getElementById('newsletter-status');

  if (newsletterForm && newsletterStatus) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      const emailVal = emailInput.value.trim();

      if (!emailVal) return;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        newsletterStatus.textContent = "Invalid email address.";
        newsletterStatus.className = "newsletter-status error";
        return;
      }

      newsletterStatus.textContent = "Subscribed successfully!";
      newsletterStatus.className = "newsletter-status success";
      emailInput.value = "";

      setTimeout(() => {
        newsletterStatus.textContent = "";
      }, 4000);
    });
  }
});
