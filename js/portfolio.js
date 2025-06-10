//======================Portfolio Page Js=============================================
        



// Portfolio-specific JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize portfolio-specific features
    initWorkspaceControls();
    initPortfolioFilter();
    initPortfolioAnimations();
    initPartnersSlider();
});

// Enhanced Partners Section JavaScript
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

// Workspace Monitor Controls with Enhanced Animations
function initWorkspaceControls() {
    const controlButtons = document.querySelectorAll('.workspace-controls .control-btn');
    const projectPreviews = document.querySelectorAll('.project-preview');
    const mainScreen = document.querySelector('.main-screen');
    
    if (controlButtons.length === 0 || projectPreviews.length === 0) return;
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetProject = this.getAttribute('data-target');
            
            // Update active control button with ripple effect
            controlButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Create ripple effect
            createRippleEffect(this);
            
            // Switch project preview with enhanced transition
            projectPreviews.forEach(preview => {
                preview.classList.remove('active');
            });
            
            // Add screen transition effect
            if (mainScreen) {
                mainScreen.style.transform = 'scale(0.95) rotateY(5deg)';
                mainScreen.style.filter = 'brightness(0.8)';
                
                setTimeout(() => {
                    // Show new preview
                    const targetPreview = document.querySelector(`[data-project="${targetProject}"]`);
                    if (targetPreview) {
                        targetPreview.classList.add('active');
                    }
                    
                    // Reset screen transform
                    mainScreen.style.transform = 'scale(1) rotateY(0deg)';
                    mainScreen.style.filter = 'brightness(1)';
                }, 300);
            }
        });
    });
    
    // Enhanced auto-rotate with pause on interaction
    let currentIndex = 0;
    let isUserInteracting = false;
    
    const autoRotate = () => {
        if (!isUserInteracting && controlButtons.length > 0) {
            currentIndex = (currentIndex + 1) % controlButtons.length;
            controlButtons[currentIndex].click();
        }
    };
    
    let rotateInterval = setInterval(autoRotate, 8000);
    
    // Pause auto-rotation when user interacts
    const workspace = document.querySelector('.portfolio-workspace');
    if (workspace) {
        workspace.addEventListener('mouseenter', () => {
            isUserInteracting = true;
        });
        
        workspace.addEventListener('mouseleave', () => {
            setTimeout(() => {
                isUserInteracting = false;
            }, 2000); // Resume after 2 seconds
        });
        
        // Pause on any button click
        controlButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                isUserInteracting = true;
                setTimeout(() => {
                    isUserInteracting = false;
                }, 5000); // Resume after 5 seconds
            });
        });
    }
}

// Create ripple effect for buttons
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const filterHr = document.querySelector('.portfolio-filter hr');
    const mobileFilter = document.querySelector('.mobile-filter-select');
    
    if ((filterButtons.length === 0 || portfolioItems.length === 0) && !mobileFilter) return;
    
    // Set initial hr position
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn && filterHr) {
        const index = Array.from(filterButtons).indexOf(activeBtn);
        updateFilterIndicator(index, filterHr);
    }
    
    // Handle desktop filter buttons
    filterButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            updateActiveFilter(filterValue, index);
            filterPortfolioItems(filterValue, portfolioItems);
        });
    });
    
    // Handle mobile filter select
    if (mobileFilter) {
        // Set initial value
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            mobileFilter.value = activeFilter.getAttribute('data-filter');
        }
        
        mobileFilter.addEventListener('change', function() {
            const filterValue = this.value;
            updateActiveFilter(filterValue);
            filterPortfolioItems(filterValue, portfolioItems);
        });
    }
    
    function updateActiveFilter(filterValue, index = 0) {
        // Update desktop buttons
        filterButtons.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
                // Update hr position if filterHr exists
                if (filterHr) {
                    const btnIndex = Array.from(filterButtons).indexOf(btn);
                    updateFilterIndicator(btnIndex, filterHr);
                }
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update mobile select
        if (mobileFilter) {
            mobileFilter.value = filterValue;
        }
    }
}

// Update filter indicator position
function updateFilterIndicator(index, hrElement) {
    const percentage = (100 / 6) * index; // 6 filter buttons
    hrElement.style.marginLeft = `${percentage}%`;
}

// Filter portfolio items with animation
function filterPortfolioItems(filterValue, portfolioItems) {
    let visibleIndex = 0;
    
    portfolioItems.forEach((item, index) => {
        const category = item.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || category === filterValue;
        
        if (shouldShow) {
            // Show item with staggered animation
            item.classList.remove('hidden');
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, visibleIndex * 100);
            
            visibleIndex++;
        } else {
            // Hide item with fade out
            item.style.transition = 'all 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                item.classList.add('hidden');
            }, 300);
        }
    });
}

// Enhanced Portfolio-specific animations
function initPortfolioAnimations() {
    // Animate code lines in side panel with typing effect
    animateCodeLines();
    
    // Animate chart bars with realistic data flow
    animateChartBars();
    
    // Enhanced hover effects for portfolio cards
    initPortfolioCardHovers();
    
    // Add floating animation triggers
    initFloatingAnimations();
    
    // Initialize screen glow effects
    initScreenGlowEffects();
}

// Enhanced code lines animation with typing effect
function animateCodeLines() {
    const codeLines = document.querySelectorAll('.code-line');
    
    function typeCodeLines() {
        codeLines.forEach((line, index) => {
            // Reset line
            line.style.width = '0%';
            line.style.opacity = '0.3';
            
            setTimeout(() => {
                const targetWidth = line.classList.contains('short') ? '60%' : 
                                   line.classList.contains('medium') ? '80%' : '100%';
                
                line.style.transition = `width ${0.8 + Math.random() * 0.4}s ease-out, opacity 0.3s ease`;
                line.style.width = targetWidth;
                line.style.opacity = '1';
                
                // Add cursor blink effect
                line.style.boxShadow = `${targetWidth === '100%' ? '100%' : targetWidth} 0 0 2px var(--primary)`;
                setTimeout(() => {
                    line.style.boxShadow = 'none';
                }, 500);
                
            }, index * 300 + Math.random() * 200);
        });
    }
    
    // Initial animation
    setTimeout(typeCodeLines, 2000);
    
    // Repeat animation every 10 seconds
    setInterval(typeCodeLines, 10000);
}

// Enhanced chart bars with realistic data simulation
function animateChartBars() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    function simulateDataFlow() {
        chartBars.forEach((bar, index) => {
            setTimeout(() => {
                // Generate realistic height changes
                const heights = ['25%', '45%', '30%', '75%', '60%', '90%', '35%', '55%'];
                const randomHeight = heights[Math.floor(Math.random() * heights.length)];
                
                bar.style.transition = 'height 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                bar.style.height = randomHeight;
                
                // Add pulse effect for high values
                if (parseInt(randomHeight) > 70) {
                    bar.style.animation = 'chart-pulse 3s ease-in-out infinite, chart-highlight 1s ease-in-out';
                } else {
                    bar.style.animation = 'chart-pulse 3s ease-in-out infinite';
                }
                
            }, index * 200);
        });
    }
    
    // Initial animation
    setTimeout(simulateDataFlow, 2500);
    
    // Repeat animation every 8 seconds
    setInterval(simulateDataFlow, 8000);
}

// Enhanced portfolio card hover effects
function initPortfolioCardHovers() {
    const portfolioCards = document.querySelectorAll('.cs-portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Enhanced hover with multiple effects
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.filter = 'brightness(1.05)';
            this.style.boxShadow = `
                0 25px 50px rgba(0, 0, 0, 0.15),
                0 0 30px rgba(0, 247, 255, 0.2)
            `;
            
            // Animate tech stack items
            const techItems = this.querySelectorAll('.cs-tech-item');
            techItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-3px)';
                    item.style.background = 'var(--primary)';
                    item.style.color = 'white';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.filter = '';
            this.style.boxShadow = '';
            
            // Reset tech stack items
            const techItems = this.querySelectorAll('.cs-tech-item');
            techItems.forEach(item => {
                item.style.transform = '';
                item.style.background = '';
                item.style.color = '';
            });
        });
    });
}

// Initialize floating animations for workspace elements
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.code-panel, .analytics-panel, .floating-card');
    
    floatingElements.forEach((element, index) => {
        // Add subtle mouse follow effect
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
            const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
            
            const moveX = x * 10;
            const moveY = y * 10;
            
            element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

// Initialize screen glow effects
function initScreenGlowEffects() {
    const mainScreen = document.querySelector('.main-screen');
    const sidePanels = document.querySelectorAll('.code-panel, .analytics-panel');
    
    // Add interactive glow based on mouse position
    if (mainScreen) {
        mainScreen.addEventListener('mousemove', (e) => {
            const rect = mainScreen.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            mainScreen.style.background = `
                radial-gradient(circle at ${x}% ${y}%, rgba(0, 247, 255, 0.1) 0%, transparent 50%),
                var(--surface-1)
            `;
        });
        
        mainScreen.addEventListener('mouseleave', () => {
            mainScreen.style.background = 'var(--surface-1)';
        });
    }
}

// Smooth scroll to portfolio section
function scrollToPortfolio() {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
        portfolioSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced stats counter for portfolio page
function initPortfolioStats() {
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.getAttribute('data-count'));
                let currentValue = 0;
                const increment = finalValue / 60; // 60 frames for smooth animation
                
                const updateCounter = () => {
                    if (currentValue < finalValue) {
                        currentValue += increment;
                        target.textContent = Math.floor(currentValue);
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = finalValue;
                    }
                };
                
                updateCounter();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize portfolio stats counter
initPortfolioStats();

// Add keyboard navigation for workspace controls
document.addEventListener('keydown', function(e) {
    const controlButtons = document.querySelectorAll('.workspace-controls .control-btn');
    const activeButton = document.querySelector('.workspace-controls .control-btn.active');
    
    if (controlButtons.length === 0 || !activeButton) return;
    
    const currentIndex = Array.from(controlButtons).indexOf(activeButton);
    let newIndex;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : controlButtons.length - 1;
        controlButtons[newIndex].click();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        newIndex = currentIndex < controlButtons.length - 1 ? currentIndex + 1 : 0;
        controlButtons[newIndex].click();
    }
});

// Parallax effect for floating cards (enhanced)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = 0.3 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Resize handler for responsive behavior
window.addEventListener('resize', function() {
    // Recalculate filter indicator position
    //const filterHr = document.querySelector('.portfolio-filter hr');
    const activeBtn = document.querySelector('.filter-btn.active');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterHr && activeBtn && filterButtons.length > 0) {
        const index = Array.from(filterButtons).indexOf(activeBtn);
        updateFilterIndicator(index, filterHr);
    }
});

// Export functions for global access
window.scrollToPortfolio = scrollToPortfolio;