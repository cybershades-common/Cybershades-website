// Main JavaScript file for CyberShades Website

// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initPreloader();
    initNavigation();
    initAnimations();
    initCounters();
    initCarousels();
    initFAQ();
    initBackToTop();
    initContactForm();
    initTechTabs();
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    // Simulate loading completion after 1.5 seconds
    setTimeout(() => {
        preloader.classList.add('hide');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
}

// Theme Management
function initTheme() {
    const themeSwitch = document.querySelector('.theme-switch input');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get theme from localStorage or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update the switch state
    if (themeSwitch) {
        themeSwitch.checked = (currentTheme === 'dark');
        
        // Add event listener for theme toggle
        themeSwitch.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Dispatch custom event for any components that need to update
            document.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: newTheme }
            }));
        });
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addListener(e => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Initialize theme
    initTheme();
    
    // Scroll event for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Trigger scroll event on page load
    window.dispatchEvent(new Event('scroll'));
    
    // Mobile menu toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Active link tracking
    function setActiveLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                mobileLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Call on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Call on page load
    setActiveLink();
    
}

// Initialize Scroll Animations
function initAnimations() {
    // Observe elements with data-aos attribute
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Target elements with data-aos
    document.querySelectorAll('[data-aos]').forEach(element => {
        observer.observe(element);
    });
    
    // Special animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delayed animation for each item
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Counter animation for stats
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'), 10);
                let count = 0;
                const speed = 2000 / countTo; // Adjust speed based on target value
                
                const updateCount = () => {
                    if (count < countTo) {
                        count++;
                        target.textContent = count;
                        setTimeout(updateCount, speed);
                    } else {
                        target.textContent = countTo;
                    }
                };
                
                updateCount();
                
                // Unobserve after animation starts
                counterObserver.unobserve(target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Carousels and sliders
function initCarousels() {
    // Testimonial carousel
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (!testimonialTrack) return;
    
    let currentIndex = 0;
    const cardWidth = 100; // Percentage width
    
    // Set initial position
    testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
    
    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
        updateDots();
    }
    
    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
        updateDots();
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            testimonialTrack.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
            updateDots();
        });
    });
    
    // Auto-slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause auto-slide on hover
    testimonialTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Technology tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active state for buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show the selected tab
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Portfolio filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Update active state for buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    // Add animation
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// FAQ accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active before
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize tech tabs
function initTechTabs() {
    const tabButtons = document.querySelectorAll('.tech-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.tech-tabs .tab-pane');

    if (tabButtons.length === 0 || tabPanes.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show the corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            const tabPane = document.getElementById(tabId);
            if (tabPane) {
                tabPane.classList.add('active');
            }
        });
    });
}

// Contact form validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Form would normally send data to server here
            // For demo, show success message and reset form
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}


// Call this function after page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initial delay to ensure elements are loaded
  setTimeout(initServiceCardEffects, 500);
});


//Partner section slider

// Enhanced Partners Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
  initPartnersSlider();
});

function initPartnersSlider() {
  const partnersTrack = document.querySelector('.partners-track');
  
  if (!partnersTrack) return;
  
  // Clone the partners to create an infinite loop
  const partners = partnersTrack.innerHTML;
  
  // Create two identical sections for seamless looping
  partnersTrack.innerHTML = `
    <div class="track-section">${partners}</div>
    <div class="track-section">${partners}</div>
  `;
  
  // Add spotlight effect to each partner logo
  const partnerLogos = document.querySelectorAll('.partner-logo');
  
  partnerLogos.forEach(logo => {
    // Mouse move effect to create spotlight
    logo.addEventListener('mousemove', (e) => {
      const rect = logo.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position for lighting effect
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate degrees of rotation based on mouse position
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = ((centerY - y) / centerY) * 10;
      
      // Apply 3D transform
      logo.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateY(-10px)
        scale(1.05)
      `;
      
      // Create spotlight effect
      const spotlightIntensity = 0.8;
      logo.style.background = `
        radial-gradient(
          circle at ${x}px ${y}px,
          rgba(99, 102, 241, ${spotlightIntensity * 0.3}),
          rgba(30, 41, 59, 0.7) 80%
        )
      `;
    });
    
    // Reset on mouse leave
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = '';
      logo.style.background = '';
      // Smooth return transition
      logo.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      
      // Remove transition property after animation completes
      setTimeout(() => {
        logo.style.transition = '';
      }, 600);
    });
    
    // Remove transition on mouseenter for smooth movement
    logo.addEventListener('mouseenter', () => {
      logo.style.transition = 'none';
    });
  });
  
  // Pause animation on hover over the entire section
  const partnersSection = document.querySelector('.partners-section');
  if (partnersSection) {
    partnersSection.addEventListener('mouseenter', () => {
      const trackSections = document.querySelectorAll('.track-section');
      trackSections.forEach(section => {
        section.style.animationPlayState = 'paused';
      });
    });
    
    partnersSection.addEventListener('mouseleave', () => {
      const trackSections = document.querySelectorAll('.track-section');
      trackSections.forEach(section => {
        section.style.animationPlayState = 'running';
      });
    });
  }
}


//Process section 


document.addEventListener('DOMContentLoaded', function() {
  // Add entry animations to timeline elements
  animateTimelineOnScroll();
  
  // Simple animation on hover for content panels
  addHoverEffects();
});

/**
 * Animates timeline elements when they enter the viewport
 */
function animateTimelineOnScroll() {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const timelineSteps = document.querySelectorAll('.timeline-step');
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.3 // Trigger when at least 30% of the item is visible
    });
    
    // Add visible class to steps when they enter viewport
    timelineSteps.forEach((step, index) => {
      // Add delay based on index for cascade effect
      step.style.setProperty('--delay', `${index * 0.2}s`);
      
      // Add initial invisible class
      step.classList.add('invisible');
      
      // Observe each step
      observer.observe(step);
    });
  } else {
    // Fallback for browsers without Intersection Observer
    document.querySelectorAll('.timeline-step').forEach(step => {
      step.classList.add('visible');
    });
  }
}

/**
 * Adds hover effects to content panels
 */
function addHoverEffects() {
  const contentPanels = document.querySelectorAll('.step-content');
  
  contentPanels.forEach(panel => {
    panel.addEventListener('mouseover', function() {
      const marker = this.closest('.timeline-step').querySelector('.step-marker');
      marker.classList.add('active');
    });
    
    panel.addEventListener('mouseout', function() {
      const marker = this.closest('.timeline-step').querySelector('.step-marker');
      marker.classList.remove('active');
    });
  });
}

// Add these CSS rules dynamically to maintain clean separation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  /* Animation styles */
  .timeline-step.invisible {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .timeline-step.visible {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.6s ease, transform 0.6s ease;
    transition-delay: var(--delay, 0s);
  }
  
  .step-marker.active {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 
      0 0 0 3px var(--primary-color),
      0 0 25px var(--primary-glow);
  }
  
  @media (max-width: 768px) {
    .step-marker.active {
      transform: scale(1.1);
    }
  }
`;
document.head.appendChild(styleSheet);









document.addEventListener('DOMContentLoaded', () => {
  const toggleInput = document.querySelector('.switch__input');
  const htmlEl      = document.documentElement;
  const KEY         = 'theme';

  // 1) Initialize from storage (default = light)
  const stored = localStorage.getItem(KEY) || 'light';
  htmlEl.setAttribute('data-theme', stored);
  toggleInput.checked = (stored === 'dark');

  // 2) When the user flips the switch…
  toggleInput.addEventListener('change', () => {
    const newTheme = toggleInput.checked ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem(KEY, newTheme);
  });
});





document.addEventListener('DOMContentLoaded', function() {
  // Portfolio filter
  const portfolioButtons = document.querySelectorAll('.portfolio-filter .filter-btn');
  const portfolioHr = document.querySelector('.portfolio-filter hr');
  
  if (portfolioButtons.length && portfolioHr) {
    // Set initial position
    const activeBtn = document.querySelector('.portfolio-filter .filter-btn.active');
    if (activeBtn) {
      const index = Array.from(portfolioButtons).indexOf(activeBtn);
      portfolioHr.style.marginLeft = `${index * 25}%`;
    }
    
    portfolioButtons.forEach((btn, index) => {
      btn.addEventListener('click', function() {
        portfolioButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        portfolioHr.style.marginLeft = `${index * 25}%`;
      });
    });
  }
  
  // Add animation variables to stat blocks
  const statBlocks = document.querySelectorAll('.stat-block');
  statBlocks.forEach((block, index) => {
    block.style.setProperty('--i', index);
  });
});

// Theme toggle switch
const toggle = document.getElementById('theme-toggle');
const root = document.documentElement;
toggle.addEventListener('change', () => {
  root.setAttribute('data-theme', toggle.checked ? 'dark' : 'light');
});



// Classic Testimonial Carousel
        class ClassicTestimonialCarousel {
            constructor() {
                this.track = document.querySelector('.carousel-track');
                this.cards = document.querySelectorAll('.testimonial-card');
                this.indicators = document.querySelectorAll('.indicator');
                this.prevBtn = document.querySelector('.nav-prev');
                this.nextBtn = document.querySelector('.nav-next');
                
                this.currentIndex = 0;
                this.isTransitioning = false;
                this.autoplayInterval = null;
                
                this.init();
            }
            
            init() {
                this.setupEventListeners();
                this.startAutoplay();
                this.animateStars();
            }
            
            setupEventListeners() {
                this.prevBtn.addEventListener('click', () => this.navigate('prev'));
                this.nextBtn.addEventListener('click', () => this.navigate('next'));
                
                this.indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => this.goToSlide(index));
                });
                
                // Pause autoplay on hover
                const carousel = document.querySelector('.testimonial-carousel');
                carousel.addEventListener('mouseenter', () => this.stopAutoplay());
                carousel.addEventListener('mouseleave', () => this.startAutoplay());
                
                // Touch support
                let startX = 0;
                let threshold = 50;
                
                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
                
                this.track.addEventListener('touchend', (e) => {
                    const endX = e.changedTouches[0].clientX;
                    const diff = startX - endX;
                    
                    if (Math.abs(diff) > threshold) {
                        if (diff > 0) {
                            this.navigate('next');
                        } else {
                            this.navigate('prev');
                        }
                    }
                });
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.navigate('prev');
                    if (e.key === 'ArrowRight') this.navigate('next');
                });
            }
            
            navigate(direction) {
                if (this.isTransitioning) return;
                
                if (direction === 'next') {
                    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
                } else {
                    this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
                }
                
                this.updateCarousel();
            }
            
            goToSlide(index) {
                if (this.isTransitioning || index === this.currentIndex) return;
                this.currentIndex = index;
                this.updateCarousel();
            }
            
            updateCarousel() {
                this.isTransitioning = true;
                
                const translateX = -this.currentIndex * 100;
                this.track.style.transform = `translateX(${translateX}%)`;
                
                // Update indicators
                this.indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === this.currentIndex);
                });
                
                setTimeout(() => {
                    this.isTransitioning = false;
                    this.animateStars();
                }, 500);
            }
            
            animateStars() {
                const currentCard = this.cards[this.currentIndex];
                const stars = currentCard.querySelectorAll('.testimonial-rating i');
                
                stars.forEach((star, index) => {
                    star.style.animation = 'none';
                    star.offsetHeight; // Force reflow
                    star.style.animation = `fadeInUp 0.6s ease-out ${(index + 1) * 0.1}s forwards`;
                });
            }
            
            startAutoplay() {
                this.stopAutoplay();
                this.autoplayInterval = setInterval(() => {
                    this.navigate('next');
                }, 5000);
            }
            
            stopAutoplay() {
                if (this.autoplayInterval) {
                    clearInterval(this.autoplayInterval);
                    this.autoplayInterval = null;
                }
            }
        }
        
        // Initialize carousel
        document.addEventListener('DOMContentLoaded', () => {
            new ClassicTestimonialCarousel();
        });
