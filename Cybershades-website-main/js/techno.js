    
     
      // Technology category filtering
      document.addEventListener('DOMContentLoaded', function() {
        const categoryCards = document.querySelectorAll('.category-card');
        const techCards = document.querySelectorAll('.tech-card');

        categoryCards.forEach(card => {
          card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all category cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            
            // Filter tech cards
            techCards.forEach(techCard => {
              if (category === 'all' || techCard.getAttribute('data-category') === category) {
                techCard.classList.remove('hidden');
                techCard.classList.add('visible');
              } else {
                techCard.classList.add('hidden');
                techCard.classList.remove('visible');
              }
            });
          });
        });
      });

      // Proficiency bar animation
      function animateProficiencyBars() {
        const proficiencyFills = document.querySelectorAll('.proficiency-fill');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const fill = entry.target;
              const level = fill.getAttribute('data-level');
              fill.style.width = level + '%';
            }
          });
        }, { threshold: 0.5 });

        proficiencyFills.forEach(fill => {
          observer.observe(fill);
        });
      }

      // Counter animation for hero stats
      function animateCounters() {
        const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
              const target = parseInt(entry.target.getAttribute('data-count'));
              const duration = 2000;
              const stepTime = 50;
              const steps = duration / stepTime;
              const increment = target / steps;
              let current = 0;

              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                entry.target.textContent = Math.floor(current);
              }, stepTime);
              
              entry.target.classList.add('animated');
            }
          });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
          observer.observe(stat);
        });
      }

      // Trust stats animation
      function animateTrustStats() {
        const trustNumbers = document.querySelectorAll('.trust-number');
        
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
              const text = entry.target.textContent;
              const isNumber = !isNaN(parseInt(text));
              
              if (isNumber) {
                const target = parseInt(text);
                const duration = 2000;
                const stepTime = 50;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    current = target;
                    clearInterval(timer);
                  }
                  entry.target.textContent = Math.floor(current) + (text.includes('%') ? '%' : '+');
                }, stepTime);
              }
              
              entry.target.classList.add('animated');
            }
          });
        }, { threshold: 0.5 });

        trustNumbers.forEach(stat => {
          observer.observe(stat);
        });
      }

      // Simple AOS-like animation
      function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('aos-animate');
          }
        });
      }

      // Initialize all animations
      document.addEventListener('DOMContentLoaded', function() {
        animateProficiencyBars();
        animateCounters();
        animateTrustStats();
        animateOnScroll();
      });

      window.addEventListener('scroll', animateOnScroll);

      // Smooth scrolling for anchor links
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

      // Back to top button
      const backToTop = document.querySelector('.back-to-top');
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      });
    