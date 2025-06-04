// Modern Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCounterAnimations();
  initMagneticButtons();
  initFAQAccordion();
  initScrollAnimations();
  initParallaxEffects();
  initNeuralNetwork();
  initHologramEffect();
});

// Counter animations for hero stats
function initCounterAnimations() {
  const counters = document.querySelectorAll('.cs-stat-number[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const start = parseInt(counter.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  };
  
  // Use Intersection Observer to trigger animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Magnetic button effects
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.cs-btn-magnetic');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const moveX = x * 0.3;
      const moveY = y * 0.3;
      
      this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translate(0, 0)';
    });
  });
}



// Enhanced scroll animations
function initScrollAnimations() {

  
  // Package cards animation
  const packageCards = document.querySelectorAll('.cs-package-card');
  
  const packageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
      }
    });
  }, { threshold: 0.2 });
  
  packageCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    packageObserver.observe(card);
  });
}

// Parallax effects for floating elements
function initParallaxEffects() {
  const floatingElements = document.querySelectorAll('.cs-float-item');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * parallaxSpeed;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
  
  // Mouse follow effect for hero visual
  const heroVisual = document.querySelector('.cs-hero-visual');
  if (heroVisual) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      heroVisual.style.transform = `translate(${x * 0.02}px, ${y * 0.02}px)`;
    });
  }
}

// Neural network animation
function initNeuralNetwork() {
  const nodes = document.querySelectorAll('.cs-node');
  const connections = document.querySelectorAll('.cs-connection');
  
  // Random pulse intervals for nodes
  nodes.forEach((node, index) => {
    setInterval(() => {
      node.style.transform = 'scale(1.5)';
      node.style.boxShadow = `0 0 30px ${getComputedStyle(document.documentElement).getPropertyValue('--primary')}`;
      
      setTimeout(() => {
        node.style.transform = 'scale(1)';
        node.style.boxShadow = `0 0 20px ${getComputedStyle(document.documentElement).getPropertyValue('--primary')}`;
      }, 300);
    }, 2000 + index * 500);
  });
  
  // Data flow animation for connections
  connections.forEach((connection, index) => {
    setInterval(() => {
      connection.style.background = `linear-gradient(90deg, 
        transparent, 
        ${getComputedStyle(document.documentElement).getPropertyValue('--secondary')}, 
        transparent)`;
      
      setTimeout(() => {
        connection.style.background = `linear-gradient(90deg, 
          transparent, 
          ${getComputedStyle(document.documentElement).getPropertyValue('--primary')}, 
          transparent)`;
      }, 1000);
    }, 3000 + index * 1000);
  });
}

// Hologram text effect
function initHologramEffect() {
  const hologramText = document.querySelector('.cs-text-hologram');
  if (!hologramText) return;
  
  // Create glitch effect
  let glitchInterval = setInterval(() => {
    hologramText.style.textShadow = `
      2px 0 ${getComputedStyle(document.documentElement).getPropertyValue('--accent')},
      -2px 0 ${getComputedStyle(document.documentElement).getPropertyValue('--secondary')},
      0 0 30px ${getComputedStyle(document.documentElement).getPropertyValue('--primary')}
    `;
    
    setTimeout(() => {
      hologramText.style.textShadow = `0 0 30px ${getComputedStyle(document.documentElement).getPropertyValue('--primary')}`;
    }, 100);
  }, 3000);
}

// Advanced button interactions
document.addEventListener('DOMContentLoaded', function() {
  // Ripple effect for package buttons
  const packageBtns = document.querySelectorAll('.cs-package-btn');
  
  packageBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.6)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .cs-package-btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});


//services 
// Elite Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize AOS (Animate On Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
      delay: 100
    });
  }

  // Enhanced Service Category Filtering
  const categoryCards = document.querySelectorAll('.category-card');
  const serviceCards = document.querySelectorAll('.elite-service-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      
      // Update active category with smooth transition
      categoryCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Filter services with staggered animation
      filterServicesWithAnimation(category);
    });
  });

  function filterServicesWithAnimation(category) {
    // First hide all cards
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }, index * 50);
    });

    // Then show matching cards after a delay
    setTimeout(() => {
      let visibleIndex = 0;
      serviceCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
          setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('visible');
          }, visibleIndex * 100);
          visibleIndex++;
        }
      });
    }, 300);
  }


  // Enhanced Process Timeline Animation
  const animateProcessJourney = () => {
    const journeyPhases = document.querySelectorAll('.journey-phase');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate phase elements sequentially
            const phaseIcon = entry.target.querySelector('.phase-icon');
            const phaseContent = entry.target.querySelector('.phase-content');
            const deliverables = entry.target.querySelectorAll('.deliverable');
            
            if (phaseIcon) {
              setTimeout(() => {
                phaseIcon.style.transform = 'scale(1) rotate(0deg)';
                phaseIcon.style.opacity = '1';
              }, 200);
            }
            
            if (phaseContent) {
              setTimeout(() => {
                phaseContent.style.transform = 'translateX(0) scale(1)';
                phaseContent.style.opacity = '1';
              }, 400);
            }
            
            deliverables.forEach((deliverable, delIndex) => {
              setTimeout(() => {
                deliverable.style.opacity = '1';
                deliverable.style.transform = 'translateY(0)';
              }, 600 + (delIndex * 100));
            });
            
          }, index * 200);
        }
      });
    }, { threshold: 0.2 });
    
    journeyPhases.forEach((phase, index) => {
      // Initial state
      phase.style.opacity = '0';
      phase.style.transform = 'translateY(50px)';
      phase.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Set initial states for child elements
      const phaseIcon = phase.querySelector('.phase-icon');
      const phaseContent = phase.querySelector('.phase-content');
      const deliverables = phase.querySelectorAll('.deliverable');
      
      if (phaseIcon) {
        phaseIcon.style.transform = 'scale(0.8) rotate(-10deg)';
        phaseIcon.style.opacity = '0';
        phaseIcon.style.transition = 'all 0.6s ease-out';
      }
      
      if (phaseContent) {
        phaseContent.style.transform = index % 2 === 0 ? 'translateX(-30px) scale(0.95)' : 'translateX(30px) scale(0.95)';
        phaseContent.style.opacity = '0';
        phaseContent.style.transition = 'all 0.8s ease-out';
      }
      
      deliverables.forEach(deliverable => {
        deliverable.style.opacity = '0';
        deliverable.style.transform = 'translateY(10px)';
        deliverable.style.transition = 'all 0.4s ease-out';
      });
      
      observer.observe(phase);
    });
  };

  // Premium Consultation Interactions
  const setupConsultationInteractions = () => {
    const primaryCTA = document.querySelector('.cta-primary');
    const secondaryCTA = document.querySelector('.cta-secondary');
    const featureItems = document.querySelectorAll('.feature-item');
    
    // Enhanced CTA interactions
    if (primaryCTA) {
      primaryCTA.addEventListener('click', function(e) {
        e.preventDefault();
        createRippleEffect(this, e);
        setTimeout(() => openScheduleModal(), 200);
      });
    }
    
    if (secondaryCTA) {
      secondaryCTA.addEventListener('click', function(e) {
        e.preventDefault();
        createRippleEffect(this, e);
        setTimeout(() => openEnhancedQuoteModal(), 200);
      });
    }
    
    // Feature items hover animation
    featureItems.forEach((item, index) => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
      });
      
      // Staggered animation on load
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 150);
    });
  };

  // Enhanced Ripple Effect
  function createRippleEffect(element, event) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;
    
    const rect = element.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add('ripple-effect');
    
    const ripple = element.getElementsByClassName('ripple-effect')[0];
    if (ripple) {
      ripple.remove();
    }
    
    element.appendChild(circle);
    
    setTimeout(() => {
      circle.remove();
    }, 1000);
  }

  // Enhanced Modal System
  function openEnhancedQuoteModal(serviceName = '', servicePrice = '') {
    const modalHTML = `
      <div class="enhanced-modal-overlay" id="quoteModal">
        <div class="enhanced-modal-container">
          <div class="modal-header">
            <div class="modal-header-content">
              <div class="modal-icon">
                <i class="fas fa-calculator"></i>
              </div>
              <div class="modal-title-group">
                <h3>Get Your Custom Quote</h3>
                <p>Receive a detailed proposal within 24 hours</p>
              </div>
            </div>
            <button class="enhanced-modal-close">&times;</button>
          </div>
          
          <div class="modal-content">
            <form class="enhanced-quote-form" id="quoteForm">
              <div class="form-section">
                <h4>Contact Information</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label for="quoteName">Full Name *</label>
                    <input type="text" id="quoteName" name="name" required>
                  </div>
                  <div class="form-group">
                    <label for="quoteEmail">Email Address *</label>
                    <input type="email" id="quoteEmail" name="email" required>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="quotePhone">Phone Number *</label>
                    <input type="tel" id="quotePhone" name="phone" required>
                  </div>
                  <div class="form-group">
                    <label for="quoteCompany">Company Name</label>
                    <input type="text" id="quoteCompany" name="company">
                  </div>
                </div>
              </div>
              
              <div class="form-section">
                <h4>Project Details</h4>
                <div class="form-group">
                  <label for="quoteService">Service of Interest *</label>
                  <select id="quoteService" name="service" required>
                    <option value="${serviceName}">${serviceName || 'Select a service'}</option>
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Cloud Solutions">Cloud Solutions & Migration</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cybersecurity">Cybersecurity Solutions</option>
                    <option value="Digital Consulting">Digital Transformation Consulting</option>
                  </select>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="quoteBudget">Project Budget</label>
                    <select id="quoteBudget" name="budget">
                      <option value="">Select budget range</option>
                      <option value="100000-300000">₹1,00,000 - ₹3,00,000</option>
                      <option value="300000-500000">₹3,00,000 - ₹5,00,000</option>
                      <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
                      <option value="1000000+">₹10,00,000+</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="quoteTimeline">Desired Timeline</label>
                    <select id="quoteTimeline" name="timeline">
                      <option value="">Select timeline</option>
                      <option value="urgent">ASAP (Rush Project)</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6months+">6+ months</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="quoteProject">Project Description *</label>
                  <textarea id="quoteProject" name="project" rows="4" placeholder="Please describe your project requirements, goals, and any specific features you need..." required></textarea>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-enhanced btn-primary">
                  <span>Get My Custom Quote</span>
                  <i class="fas fa-paper-plane"></i>
                </button>
                <p class="form-note">We'll respond within 24 hours with a detailed proposal</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupEnhancedModalEvents('quoteModal');
  }

  function openScheduleModal() {
    const modalHTML = `
      <div class="enhanced-modal-overlay" id="scheduleModal">
        <div class="enhanced-modal-container">
          <div class="modal-header">
            <div class="modal-header-content">
              <div class="modal-icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <div class="modal-title-group">
                <h3>Schedule Free Consultation</h3>
                <p>Book a 60-minute strategy session with our experts</p>
              </div>
            </div>
            <button class="enhanced-modal-close">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="consultation-benefits">
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>Free 60-minute consultation</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>Custom technology roadmap</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>No obligation proposal</span>
              </div>
            </div>
            
            <form class="enhanced-schedule-form" id="scheduleForm">
              <div class="form-section">
                <h4>Contact Information</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label for="scheduleName">Full Name *</label>
                    <input type="text" id="scheduleName" name="name" required>
                  </div>
                  <div class="form-group">
                    <label for="scheduleEmail">Email Address *</label>
                    <input type="email" id="scheduleEmail" name="email" required>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="schedulePhone">Phone Number *</label>
                    <input type="tel" id="schedulePhone" name="phone" required>
                  </div>
                  <div class="form-group">
                    <label for="scheduleCompany">Company Name</label>
                    <input type="text" id="scheduleCompany" name="company">
                  </div>
                </div>
              </div>
              
              <div class="form-section">
                <h4>Preferred Schedule</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label for="scheduleDate">Preferred Date *</label>
                    <input type="date" id="scheduleDate" name="date" required>
                  </div>
                  <div class="form-group">
                    <label for="scheduleTime">Preferred Time *</label>
                    <select id="scheduleTime" name="time" required>
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="scheduleMessage">What would you like to discuss? *</label>
                  <textarea id="scheduleMessage" name="message" rows="3" placeholder="Brief description of your project or challenges..." required></textarea>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-enhanced btn-primary">
                  <span>Schedule My Consultation</span>
                  <i class="fas fa-calendar-check"></i>
                </button>
                <p class="form-note">You'll receive a calendar invite within 2 hours</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupEnhancedModalEvents('scheduleModal');
    
    // Set minimum date to tomorrow
    const dateInput = document.getElementById('scheduleDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  function setupEnhancedModalEvents(modalId) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector('.enhanced-modal-close');
    const form = modal.querySelector('form');
    
    // Close modal events
    closeBtn.addEventListener('click', () => closeEnhancedModal(modalId));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeEnhancedModal(modalId);
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeEnhancedModal(modalId);
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleEnhancedFormSubmission(form, modalId);
    });
    
    // Show modal with animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    
    // Focus first input
    const firstInput = form.querySelector('input, select, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300);
    }
  }

  function closeEnhancedModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = 'auto';
    }, 300);
  }

  function handleEnhancedFormSubmission(form, modalId) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-enhanced');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Processing...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call with enhanced loading
    setTimeout(() => {
      // Show enhanced success message
      showEnhancedSuccessMessage(modalId === 'quoteModal' ? 'quote' : 'schedule', data);
      closeEnhancedModal(modalId);
      
      // Log data (replace with actual API call)
      console.log('Form submitted:', data);
    }, 2500);
  }

  function showEnhancedSuccessMessage(type, data) {
    const isQuote = type === 'quote';
    const message = isQuote 
      ? `Thank you, ${data.name}! We'll send your custom quote to ${data.email} within 24 hours.`
      : `Perfect! Your consultation is scheduled for ${data.date} at ${data.time}. Check your email for the calendar invite.`;
    
    const successHTML = `
      <div class="enhanced-success-notification" id="successNotification">
        <div class="success-animation">
          <div class="success-checkmark">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <div class="success-content">
          <h4>${isQuote ? 'Quote Request Received!' : 'Consultation Scheduled!'}</h4>
          <p>${message}</p>
          <div class="success-actions">
            <button class="success-btn" onclick="document.getElementById('successNotification').remove()">
              Got it!
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    const notification = document.getElementById('successNotification');
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
      if (notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 8000);
  }

  // Smooth scrolling for navigation
  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  // Progressive loading animations
  const setupProgressiveAnimations = () => {
    const animatedElements = document.querySelectorAll('.feature-item');
    
    // Set initial states
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease-out';
    });
  };

  // Initialize all functionality
  setupEliteServiceInteractions();
  animateProcessJourney();
  setupConsultationInteractions();
  setupSmoothScrolling();
  setupProgressiveAnimations();

  // Performance optimization
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Lazy load animations for better performance
    setTimeout(() => {
      filterServicesWithAnimation('all');
    }, 500);
  });
});

// Enhanced CSS Styles (inject into document)
const enhancedStyles = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .enhanced-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .enhanced-modal-overlay.show {
    opacity: 1;
    visibility: visible;
  }
  
  .enhanced-modal-container {
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: var(--radius-2xl);
    max-width: 700px;
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.8) translateY(20px);
    transition: transform 0.3s ease;
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.3);
  }
  
  .enhanced-modal-overlay.show .enhanced-modal-container {
    transform: scale(1) translateY(0);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-8);
    border-bottom: 1px solid var(--border);
    background: var(--gradient-glass);
    backdrop-filter: blur(20px);
  }
  
  .modal-header-content {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  
  .modal-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: var(--gradient-primary);
    border-radius: var(--radius-lg);
  }
  
  .modal-icon i {
    font-size: 1.25rem;
    color: white;
  }
  
  .modal-title-group h3 {
    color: var(--text-primary);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.5rem;
    margin: 0 0 var(--space-1) 0;
  }
  
  .modal-title-group p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0;
  }
  
  .enhanced-modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
  }
  
  .enhanced-modal-close:hover {
    color: var(--text-primary);
    background: var(--surface-2);
  }
  
  .modal-content {
    padding: var(--space-8);
  }
  
  .consultation-benefits {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4);
    margin-bottom: var(--space-8);
    padding: var(--space-6);
    background: var(--gradient-glass);
    border-radius: var(--radius-xl);
    border: 1px solid var(--border);
  }
  
  .benefit-item {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-secondary);
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .benefit-item i {
    color: var(--secondary);
    font-size: 1rem;
  }
  
  .form-section {
    margin-bottom: var(--space-8);
  }
  
  .form-section h4 {
    color: var(--text-primary);
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.125rem;
    margin-bottom: var(--space-4);
    padding-bottom: var(--space-2);
    border-bottom: 1px solid var(--border);
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }
  
  .form-group {
    margin-bottom: var(--space-4);
  }
  
  .form-group label {
    display: block;
    margin-bottom: var(--space-2);
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: var(--space-4);
    background: var(--surface-2);
    border: 2px solid var(--border);
    border-radius: var(--radius-lg);
    color: var(--text-primary);
    font-family: var(--font-sans);
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }
  
  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
  
  .form-actions {
    text-align: center;
    padding-top: var(--space-6);
    border-top: 1px solid var(--border);
  }
  
  .btn-enhanced {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-8);
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--radius-full);
    color: white;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .btn-enhanced:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
  }
  
  .btn-enhanced:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
  
  .form-note {
    color: var(--text-tertiary);
    font-size: 0.75rem;
    margin-top: var(--space-3);
    font-style: italic;
  }
  
  .enhanced-success-notification {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    background: var(--surface-1);
    border: 2px solid var(--secondary);
    border-radius: var(--radius-2xl);
    padding: var(--space-10);
    z-index: 1001;
    text-align: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    max-width: 500px;
    width: 90%;
  }
  
  .enhanced-success-notification.show {
    opacity: 1;
    visibility: visible;
    transform: translate(-50%, -50%) scale(1);
  }
  
  .success-animation {
    margin-bottom: var(--space-6);
  }
  
  .success-checkmark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background: var(--gradient-primary);
    border-radius: 50%;
    animation: successPulse 0.6s ease-out;
  }
  
  .success-checkmark i {
    font-size: 2rem;
    color: white;
  }
  
  @keyframes successPulse {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  
  .success-content h4 {
    color: var(--text-primary);
    font-family: var(--font-display);
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: var(--space-4);
  }
  
  .success-content p {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: var(--space-6);
  }
  
  .success-btn {
    padding: var(--space-3) var(--space-6);
    background: var(--gradient-primary);
    border: none;
    border-radius: var(--radius-full);
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .success-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
  }
  
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .enhanced-modal-container {
      width: 98%;
    }
    
    .consultation-benefits {
      flex-direction: column;
    }
  }
`;

// Inject the enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);
