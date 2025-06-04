// CyberShades Portfolio Section JavaScript

class PortfolioManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupCategoryFiltering();
    this.setupCardInteractions();
    this.setupScrollAnimations();
    this.setupButtonActions();
    this.initializeStats();
  }

  // Category Filtering System
  setupCategoryFiltering() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        this.updateActiveCategory(button, categoryButtons);
        
        // Filter portfolio cards
        this.filterPortfolioCards(category, portfolioCards);
        
        // Update stats based on filtered results
        this.updateFilterStats(category, portfolioCards);
      });
    });
  }

  updateActiveCategory(activeButton, allButtons) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');
    
    // Add subtle feedback animation
    activeButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
      activeButton.style.transform = 'scale(1)';
    }, 150);
  }

  filterPortfolioCards(category, cards) {
    cards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category');
      const shouldShow = category === 'all' || cardCategory === category;
      
      if (shouldShow) {
        // Show card with staggered animation
        setTimeout(() => {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          
          // Animate in
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }, index * 100);
      } else {
        // Hide card
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '0';
        card.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  updateFilterStats(category, cards) {
    const visibleCards = Array.from(cards).filter(card => {
      const cardCategory = card.getAttribute('data-category');
      return category === 'all' || cardCategory === category;
    });
    
    // Update header stats if they exist
    const statElements = document.querySelectorAll('.stat-number');
    if (statElements.length > 0) {
      // Animate number changes
      this.animateNumber(statElements[0], visibleCards.length);
    }
  }

  // Card Interaction Effects
  setupCardInteractions() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
      // Mouse enter effect
      card.addEventListener('mouseenter', () => {
        this.handleCardHover(card, true);
      });
      
      // Mouse leave effect
      card.addEventListener('mouseleave', () => {
        this.handleCardHover(card, false);
      });
      
      // Focus handling for accessibility
      card.addEventListener('focusin', () => {
        this.handleCardHover(card, true);
      });
      
      card.addEventListener('focusout', () => {
        this.handleCardHover(card, false);
      });
    });
  }

  handleCardHover(card, isHovering) {
    const techTags = card.querySelectorAll('.tech-tag');
    const buttons = card.querySelectorAll('.btn-primary, .btn-secondary');
    
    if (isHovering) {
      // Subtle highlight effects
      techTags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-2px)';
          tag.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        }, index * 50);
      });
      
      // Button preparation for interaction
      buttons.forEach(btn => {
        btn.style.transform = 'translateY(-1px)';
      });
    } else {
      // Reset effects
      techTags.forEach(tag => {
        tag.style.transform = 'translateY(0)';
        tag.style.boxShadow = 'none';
      });
      
      buttons.forEach(btn => {
        btn.style.transform = 'translateY(0)';
      });
    }
  }

  // Scroll-based Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElementIn(entry.target);
        }
      });
    }, observerOptions);

    // Observe portfolio cards and other elements
    const animateElements = document.querySelectorAll(
      '.portfolio-card, .stat-item, .category-btn, .portfolio-summary'
    );
    
    animateElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });
  }

  animateElementIn(element) {
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }

  // Button Action Handlers
  setupButtonActions() {
    // Portfolio card buttons
    const viewButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    viewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleButtonClick(button);
      });
    });

    // Summary action buttons
    const summaryButtons = document.querySelectorAll('.summary-actions .btn-primary, .summary-actions .btn-secondary');
    
    summaryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.handleSummaryAction(button);
      });
    });
  }

  handleButtonClick(button) {
    const originalText = button.textContent;
    const buttonType = button.classList.contains('btn-primary') ? 'primary' : 'secondary';
    
    // Button loading state
    button.textContent = 'Loading...';
    button.disabled = true;
    button.style.opacity = '0.7';
    
    // Simulate action (replace with actual functionality)
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      button.style.opacity = '1';
      
      // Show success feedback
      this.showNotification(
        buttonType === 'primary' ? 'Opening project details...' : 'Loading demo...',
        'info'
      );
    }, 1500);
  }

  handleSummaryAction(button) {
    const action = button.textContent.toLowerCase();
    
    if (action.includes('project')) {
      this.showNotification('Redirecting to project form...', 'success');
      // Simulate redirect
      setTimeout(() => {
        console.log('Navigate to project form');
      }, 1000);
    } else if (action.includes('consultation')) {
      this.showNotification('Opening consultation scheduler...', 'info');
      // Simulate scheduler opening
      setTimeout(() => {
        console.log('Open consultation scheduler');
      }, 1000);
    }
  }

  // Statistics Animation
  initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const finalValue = stat.textContent;
      const isPercentage = finalValue.includes('%');
      const isPlus = finalValue.includes('+');
      const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
      
      // Animate from 0 to final value
      this.animateNumber(stat, numericValue, {
        suffix: isPercentage ? '%' : (isPlus ? '+' : ''),
        duration: 2000
      });
    });
  }

  animateNumber(element, targetValue, options = {}) {
    const {
      suffix = '',
      duration = 1000,
      startValue = 0
    } = options;
    
    const increment = (targetValue - startValue) / (duration / 16);
    let currentValue = startValue;
    
    const updateNumber = () => {
      currentValue += increment;
      
      if (currentValue >= targetValue) {
        element.textContent = targetValue + suffix;
        return;
      }
      
      element.textContent = Math.floor(currentValue) + suffix;
      requestAnimationFrame(updateNumber);
    };
    
    updateNumber();
  }

  // Notification System
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `portfolio-notification ${type}`;
    
    const colors = {
      success: '#10b981',
      info: '#6366f1',
      warning: '#f59e0b',
      error: '#ef4444'
    };
    
    // Style notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: colors[type] || colors.info,
      color: 'white',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      fontWeight: '600',
      fontSize: '0.875rem',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      zIndex: '1000',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      maxWidth: '300px'
    });
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Utility Methods
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Performance monitoring
  trackPerformance() {
    const perfData = {
      loadTime: performance.now(),
      cardsCount: document.querySelectorAll('.portfolio-card').length,
      categoriesCount: document.querySelectorAll('.category-btn').length
    };
    
    console.log('Portfolio Performance:', perfData);
  }

  // Public API for external integration
  filterByCategory(category) {
    const categoryButton = document.querySelector(`[data-category="${category}"]`);
    if (categoryButton) {
      categoryButton.click();
    }
  }

  getVisibleProjects() {
    const visibleCards = document.querySelectorAll('.portfolio-card[style*="display: flex"], .portfolio-card:not([style*="display: none"])');
    return Array.from(visibleCards).map(card => ({
      title: card.querySelector('.project-title').textContent,
      category: card.getAttribute('data-category'),
      element: card
    }));
  }
}

// Enhanced Card Interactions
class CardEffects {
  constructor() {
    this.setupAdvancedHovers();
  }

  setupAdvancedHovers() {
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
      // Mouse tracking for subtle parallax effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        // Very subtle 3D effect
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main portfolio manager
  const portfolioManager = new PortfolioManager();
  
  // Initialize enhanced card effects
  const cardEffects = new CardEffects();
  
  // Track performance
  portfolioManager.trackPerformance();
  
  // Global error handling
  window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    portfolioManager.showNotification('An error occurred. Please refresh the page.', 'error');
  });
  
  // Export for external use
  window.PortfolioAPI = {
    manager: portfolioManager,
    effects: cardEffects,
    filterByCategory: (category) => portfolioManager.filterByCategory(category),
    getVisibleProjects: () => portfolioManager.getVisibleProjects()
  };
  
  console.log('CyberShades Portfolio Initialized Successfully');
});