// Technologies Page JavaScript
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

  // Technology Category Filtering
  const categoryCards = document.querySelectorAll('.tech-category-card');
  const techCards = document.querySelectorAll('.tech-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.dataset.category;
      
      // Update active category with smooth transition
      categoryCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      // Filter technologies with staggered animation
      filterTechnologiesWithAnimation(category);
    });
  });

  function filterTechnologiesWithAnimation(category) {
    // First hide all cards
    techCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }, index * 30);
    });

    // Then show matching cards after a delay
    setTimeout(() => {
      let visibleIndex = 0;
      techCards.forEach(card => {
        const cardCategory = card.dataset.category;
        
        if (category === 'all' || cardCategory === category) {
          setTimeout(() => {
            card.classList.remove('hidden');
            card.classList.add('visible');
            
            // Animate proficiency bar when card becomes visible
            animateProficiencyBar(card);
          }, visibleIndex * 80);
          visibleIndex++;
        }
      });
    }, 200);
  }

  // Animate Proficiency Bars
  function animateProficiencyBar(card) {
    const proficiencyFill = card.querySelector('.proficiency-fill');
    if (proficiencyFill) {
      const level = proficiencyFill.dataset.level;
      setTimeout(() => {
        proficiencyFill.style.width = level + '%';
      }, 300);
    }
  }

  // Initialize proficiency bars on page load
  const initializeProficiencyBars = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          animateProficiencyBar(card);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.3 });
    
    techCards.forEach(card => {
      observer.observe(card);
    });
  };

  // Enhanced Technology Card Interactions
  const setupTechCardInteractions = () => {
    techCards.forEach(card => {
      const techLogo = card.querySelector('.tech-logo img');
      const features = card.querySelectorAll('.feature');
      const proficiencyBar = card.querySelector('.proficiency-fill');
      
      // Enhanced hover effects
      card.addEventListener('mouseenter', function() {
        // Add subtle tilt effect
        this.style.transform = 'translateY(-8px) rotateX(2deg)';
        
        // Animate logo
        if (techLogo) {
          techLogo.style.transform = 'scale(1.1) rotate(5deg)';
        }
        
        // Animate features
        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.style.transform = 'translateY(-2px) scale(1.05)';
          }, index * 50);
        });
        
        // Pulse proficiency bar
        if (proficiencyBar) {
          proficiencyBar.style.animation = 'pulse 1s ease-in-out';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0deg)';
        
        if (techLogo) {
          techLogo.style.transform = 'scale(1) rotate(0deg)';
        }
        
        features.forEach(feature => {
          feature.style.transform = 'translateY(0) scale(1)';
        });
        
        if (proficiencyBar) {
          proficiencyBar.style.animation = '';
        }
      });
      
      // Feature hover interactions
      features.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-4px) scale(1.1)';
          this.style.boxShadow = '0 8px 16px rgba(99, 102, 241, 0.3)';
        });
        
        feature.addEventListener('mouseleave', function() {
          this.style.transform = 'translateY(0) scale(1)';
          this.style.boxShadow = 'none';
        });
      });
    });
  };

  // Animated Counter for Hero Stats
  const animateHeroCounters = () => {
    const counters = document.querySelectorAll('.tech-stat-item .stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace('+', ''));
      const increment = target / 40;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
        }
      };
      
      // Start animation when element is in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      });
      
      observer.observe(counter);
    });
  };

  // Methodology Steps Animation
  const animateMethodologySteps = () => {
    const methodologySteps = document.querySelectorAll('.methodology-step');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            
            // Animate step icon
            const stepIcon = entry.target.querySelector('.step-icon');
            if (stepIcon) {
              setTimeout(() => {
                stepIcon.style.transform = 'scale(1.1)';
                setTimeout(() => {
                  stepIcon.style.transform = 'scale(1)';
                }, 200);
              }, 300);
            }
          }, index * 150);
        }
      });
    }, { threshold: 0.2 });
    
    methodologySteps.forEach((step, index) => {
      // Initial state
      step.style.opacity = '0';
      step.style.transform = 'translateY(30px) scale(0.95)';
      step.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      
      observer.observe(step);
    });
  };

  // Partnership CTA Interactions
  const setupPartnershipInteractions = () => {
    const primaryCTA = document.querySelector('.tech-partnership-cta .cta-primary');
    const secondaryCTA = document.querySelector('.tech-partnership-cta .cta-secondary');
    const featureItems = document.querySelectorAll('.tech-partnership-cta .feature-item');
    
    // Enhanced CTA interactions
    if (primaryCTA) {
      primaryCTA.addEventListener('click', function(e) {
        e.preventDefault();
        createRippleEffect(this, e);
        setTimeout(() => openTechConsultationModal(), 200);
      });
    }
    
    if (secondaryCTA) {
      secondaryCTA.addEventListener('click', function(e) {
        e.preventDefault();
        createRippleEffect(this, e);
        setTimeout(() => openPortfolioModal(), 200);
      });
    }
    
    // Feature items hover animation
    featureItems.forEach((item, index) => {
      item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-6px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(99, 102, 241, 0.2)';
      });
      
      item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
      });
      
      // Staggered animation on load
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 100);
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

  // Technology Consultation Modal
  function openTechConsultationModal() {
    const modalHTML = `
      <div class="tech-modal-overlay" id="techConsultationModal">
        <div class="tech-modal-container">
          <div class="modal-header">
            <div class="modal-header-content">
              <div class="modal-icon">
                <i class="fas fa-code"></i>
              </div>
              <div class="modal-title-group">
                <h3>Technology Consultation</h3>
                <p>Let's discuss your technology needs and requirements</p>
              </div>
            </div>
            <button class="tech-modal-close">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="consultation-benefits">
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>Custom technology stack recommendation</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>Architecture and scalability planning</span>
              </div>
              <div class="benefit-item">
                <i class="fas fa-check-circle"></i>
                <span>Performance optimization strategies</span>
              </div>
            </div>
            
            <form class="tech-consultation-form" id="techConsultationForm">
              <div class="form-section">
                <h4>Contact Information</h4>
                <div class="form-row">
                  <div class="form-group">
                    <label for="techName">Full Name *</label>
                    <input type="text" id="techName" name="name" required>
                  </div>
                  <div class="form-group">
                    <label for="techEmail">Email Address *</label>
                    <input type="email" id="techEmail" name="email" required>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="techPhone">Phone Number</label>
                    <input type="tel" id="techPhone" name="phone">
                  </div>
                  <div class="form-group">
                    <label for="techCompany">Company Name</label>
                    <input type="text" id="techCompany" name="company">
                  </div>
                </div>
              </div>
              
              <div class="form-section">
                <h4>Project Requirements</h4>
                <div class="form-group">
                  <label for="techType">Project Type *</label>
                  <select id="techType" name="projectType" required>
                    <option value="">Select project type</option>
                    <option value="web-application">Web Application</option>
                    <option value="mobile-app">Mobile Application</option>
                    <option value="enterprise-solution">Enterprise Solution</option>
                    <option value="ai-ml-project">AI/ML Project</option>
                    <option value="cloud-migration">Cloud Migration</option>
                    <option value="api-development">API Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="techBudget">Project Budget</label>
                    <select id="techBudget" name="budget">
                      <option value="">Select budget range</option>
                      <option value="50000-200000">₹50,000 - ₹2,00,000</option>
                      <option value="200000-500000">₹2,00,000 - ₹5,00,000</option>
                      <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
                      <option value="1000000+">₹10,00,000+</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="techTimeline">Project Timeline</label>
                    <select id="techTimeline" name="timeline">
                      <option value="">Select timeline</option>
                      <option value="1-2months">1-2 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6-12months">6-12 months</option>
                      <option value="12months+">12+ months</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="techRequirements">Technical Requirements *</label>
                  <textarea id="techRequirements" name="requirements" rows="4" placeholder="Describe your technical requirements, preferred technologies, scalability needs, integrations, etc." required></textarea>
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn-tech btn-primary">
                  <span>Schedule Consultation</span>
                  <i class="fas fa-calendar-alt"></i>
                </button>
                <p class="form-note">Our technology experts will contact you within 24 hours</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupTechModalEvents('techConsultationModal');
  }

  // Portfolio Modal
  function openPortfolioModal() {
    const modalHTML = `
      <div class="tech-modal-overlay" id="portfolioModal">
        <div class="tech-modal-container">
          <div class="modal-header">
            <div class="modal-header-content">
              <div class="modal-icon">
                <i class="fas fa-briefcase"></i>
              </div>
              <div class="modal-title-group">
                <h3>Our Technology Portfolio</h3>
                <p>Explore our successful technology implementations</p>
              </div>
            </div>
            <button class="tech-modal-close">&times;</button>
          </div>
          
          <div class="modal-content">
            <div class="portfolio-showcase">
              <div class="portfolio-item">
                <div class="portfolio-tech">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB">
                </div>
                <h4>E-commerce Platform</h4>
                <p>Built with React, Node.js, and MongoDB for a leading retail company</p>
                <div class="portfolio-metrics">
                  <span>500K+ Users</span>
                  <span>99.9% Uptime</span>
                </div>
              </div>
              
              <div class="portfolio-item">
                <div class="portfolio-tech">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" alt="Flutter">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase">
                </div>
                <h4>Healthcare Mobile App</h4>
                <p>Cross-platform mobile app with Flutter and Firebase backend</p>
                <div class="portfolio-metrics">
                  <span>100K+ Downloads</span>
                  <span>4.8 Rating</span>
                </div>
              </div>
              
              <div class="portfolio-item">
                <div class="portfolio-tech">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" alt="AWS">
                </div>
                <h4>AI Analytics Platform</h4>
                <p>Machine learning platform with Python, TensorFlow, and AWS</p>
                <div class="portfolio-metrics">
                  <span>95% Accuracy</span>
                  <span>Real-time Processing</span>
                </div>
              </div>
            </div>
            
            <div class="portfolio-actions">
              <button class="btn-tech btn-primary" onclick="closeTechModal('portfolioModal')">
                <span>Discuss Your Project</span>
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setupTechModalEvents('portfolioModal');
  }

  function setupTechModalEvents(modalId) {
    const modal = document.getElementById(modalId);
    const closeBtn = modal.querySelector('.tech-modal-close');
    const form = modal.querySelector('form');
    
    // Close modal events
    closeBtn.addEventListener('click', () => closeTechModal(modalId));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeTechModal(modalId);
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeTechModal(modalId);
    });
    
    // Form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleTechFormSubmission(form, modalId);
      });
    }
    
    // Show modal with animation
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    
    // Focus first input
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 300);
    }
  }

  function closeTechModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = 'auto';
    }, 300);
  }

  function handleTechFormSubmission(form, modalId) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('.btn-tech');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Processing...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      showTechSuccessMessage(data);
      closeTechModal(modalId);
      
      // Log data (replace with actual API call)
      console.log('Technology consultation form submitted:', data);
    }, 2000);
  }

  function showTechSuccessMessage(data) {
    const successHTML = `
      <div class="tech-success-notification" id="techSuccessNotification">
        <div class="success-animation">
          <div class="success-checkmark">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <div class="success-content">
          <h4>Consultation Request Received!</h4>
          <p>Thank you, ${data.name}! Our technology experts will contact you within 24 hours to discuss your ${data.projectType || 'project'} requirements.</p>
          <div class="success-actions">
            <button class="success-btn" onclick="document.getElementById('techSuccessNotification').remove()">
              Perfect!
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHTML);
    
    const notification = document.getElementById('techSuccessNotification');
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto-remove after 6 seconds
    setTimeout(() => {
      if (notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }
    }, 6000);
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
    const animatedElements = document.querySelectorAll('.tech-partnership-cta .feature-item');
    
    // Set initial states
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'all 0.6s ease-out';
    });
  };

  // Technology search functionality
  const setupTechSearch = () => {
    const searchInput = document.getElementById('techSearch');
    if (searchInput) {
      searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        techCards.forEach(card => {
          const techTitle = card.querySelector('.tech-title').textContent.toLowerCase();
          const techDescription = card.querySelector('.tech-description').textContent.toLowerCase();
          const features = Array.from(card.querySelectorAll('.feature')).map(f => f.textContent.toLowerCase());
          
          const isMatch = techTitle.includes(searchTerm) || 
                         techDescription.includes(searchTerm) ||
                         features.some(feature => feature.includes(searchTerm));
          
          if (isMatch) {
            card.style.display = 'block';
            card.classList.add('visible');
          } else {
            card.style.display = 'none';
            card.classList.remove('visible');
          }
        });
      });
    }
  };

  // Initialize all functionality
  setupTechCardInteractions();
  animateHeroCounters();
  animateMethodologySteps();
  setupPartnershipInteractions();
  setupSmoothScrolling();
  setupProgressiveAnimations();
  setupTechSearch();
  initializeProficiencyBars();

  // Performance optimization
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Lazy load animations for better performance
    setTimeout(() => {
      filterTechnologiesWithAnimation('all');
    }, 500);
  });

  // Make closeTechModal globally accessible
  window.closeTechModal = closeTechModal;
});

// Additional CSS for modals and animations
const techModalStyles = `
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
  
  .tech-modal-overlay {
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
  
  .tech-modal-overlay.show {
    opacity: 1;
    visibility: visible;
  }
  
  .tech-modal-container {
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
  
  .tech-modal-overlay.show .tech-modal-container {
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
  
  .tech-modal-close {
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
  
  .tech-modal-close:hover {
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
  
  .btn-tech {
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
  
  .btn-tech:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
  }
  
  .btn-tech:disabled {
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
  
  .portfolio-showcase {
    display: grid;
    gap: var(--space-6);
    margin-bottom: var(--space-8);
  }
  
  .portfolio-item {
    padding: var(--space-6);
    background: var(--gradient-glass);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    transition: all var(--transition-normal);
  }
  
  .portfolio-item:hover {
    transform: translateY(-4px);
    border-color: var(--primary);
  }
  
  .portfolio-tech {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  
  .portfolio-tech img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
  
  .portfolio-item h4 {
    color: var(--text-primary);
    font-family: var(--font-display);
    font-weight: 600;
    margin-bottom: var(--space-2);
  }
  
  .portfolio-item p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: var(--space-4);
  }
  
  .portfolio-metrics {
    display: flex;
    gap: var(--space-4);
  }
  
  .portfolio-metrics span {
    padding: var(--space-1) var(--space-3);
    background: var(--primary);
    color: white;
    border-radius: var(--radius-full);
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .portfolio-actions {
    text-align: center;
  }
  
  .tech-success-notification {
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
  
  .tech-success-notification.show {
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
    
    .tech-modal-container {
      width: 98%;
    }
    
    .consultation-benefits {
      flex-direction: column;
    }
    
    .portfolio-tech {
      justify-content: center;
    }
    
    .portfolio-metrics {
      justify-content: center;
    }
  }
`;

// Inject the modal styles
const techStyleSheet = document.createElement('style');
techStyleSheet.textContent = techModalStyles;
document.head.appendChild(techStyleSheet);