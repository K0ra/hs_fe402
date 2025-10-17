/* ========================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Gold-standard production-ready JS
   ======================================== */

// ========================================
// CONSTANTS & CONFIGURATION
// ========================================
const CONFIG = {
    animationThreshold: 0.5, // Trigger animation when 50% visible
    animationDelay: 100,
    smoothScrollOffset: 80,
  };
  
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const state = {
    navOpen: false,
    intersectionObserver: null,
    currentCardIndex: 0,
    totalCards: 0,
  };
  
  // ========================================
  // UTILITY FUNCTIONS
  // ========================================
  
  /**
   * Check if user prefers reduced motion
   * @returns {boolean} True if reduced motion is preferred
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  /**
   * Debounce function for performance optimization
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
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
  
  // ========================================
  // MOBILE NAVIGATION
  // ========================================
  
  /**
   * Initialize mobile navigation functionality
   */
  function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = navMenu.querySelectorAll('a');
  
    if (!navToggle || !navMenu) {
      console.warn('Navigation elements not found');
      return;
    }
  
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
      state.navOpen = !state.navOpen;
      navToggle.setAttribute('aria-expanded', state.navOpen);
      navMenu.classList.toggle('active');
    });
  
    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (state.navOpen) {
          state.navOpen = false;
          navToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('active');
        }
      });
    });
  
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && state.navOpen) {
        state.navOpen = false;
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        navToggle.focus();
      }
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (state.navOpen && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        state.navOpen = false;
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  }
  
  // ========================================
  // CAROUSEL FUNCTIONALITY
  // ========================================
  
  /**
   * Initialize carousel with navigation, keyboard support, and ARIA
   */
  function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    const cards = track ? track.querySelectorAll('.project-card') : [];
  
    if (!track || !prevButton || !nextButton || cards.length === 0) {
      console.warn('Carousel elements not found');
      return;
    }
  
    state.totalCards = cards.length;
  
    /**
     * Calculate card width plus gap for scrolling
     * @returns {number} Width to scroll
     */
    function getCardWidthPlusGap() {
      if (cards.length === 0) return 0;
      const firstCard = cards[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      return firstCard.offsetWidth + gap;
    }
  
    /**
     * Update button states based on scroll position
     */
    function updateButtonStates() {
      const scrollLeft = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      // Disable prev button at start
      prevButton.disabled = scrollLeft <= 0;
      
      // Disable next button at end
      nextButton.disabled = scrollLeft >= maxScroll - 5; // -5 for tolerance
    }
  
    /**
     * Navigate to previous card
     */
    function scrollToPrevCard() {
      const cardWidthPlusGap = getCardWidthPlusGap();
      track.scrollBy({
        left: -cardWidthPlusGap,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    }
  
    /**
     * Navigate to next card
     */
    function scrollToNextCard() {
      const cardWidthPlusGap = getCardWidthPlusGap();
      track.scrollBy({
        left: cardWidthPlusGap,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
      });
    }
  
    // Button click handlers
    prevButton.addEventListener('click', scrollToPrevCard);
    nextButton.addEventListener('click', scrollToNextCard);
  
    // Update button states on scroll
    track.addEventListener('scroll', debounce(updateButtonStates, 50), { passive: true });
  
    // Initialize button states
    updateButtonStates();
  
    // Keyboard navigation for carousel
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToPrevCard();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollToNextCard();
      }
    });
  
    // Keyboard navigation for individual cards
    cards.forEach((card) => {
      card.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          scrollToPrevCard();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          scrollToNextCard();
        }
      });
    });
  
    // Update on window resize
    window.addEventListener('resize', debounce(updateButtonStates, 200));
  
    console.log('Carousel initialized with', state.totalCards, 'cards');
  }
  
  // ========================================
  // INTERSECTION OBSERVER ANIMATIONS
  // ========================================
  
  /**
   * Initialize scroll-triggered animations using IntersectionObserver
   */
  function initScrollAnimations() {
    // Skip if user prefers reduced motion
    if (prefersReducedMotion()) {
      // Make all elements visible immediately
      document.querySelectorAll('[data-animate]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        if (el.dataset.animate === 'reveal') {
          el.classList.add('reveal--visible');
        }
      });
      return;
    }
  
    const animatedElements = document.querySelectorAll('[data-animate]');
  
    if (animatedElements.length === 0) {
      return;
    }
  
    // Create intersection observer
    state.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.animateDelay || 0;
            
            // Apply animation with delay
            setTimeout(() => {
              if (entry.target.dataset.animate === 'reveal') {
                // Special handling for carousel reveal cards
                entry.target.classList.add('reveal--visible');
              } else {
                entry.target.classList.add('animated');
              }
            }, parseInt(delay));
  
            // Unobserve after animation
            state.intersectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: CONFIG.animationThreshold,
        rootMargin: '0px 0px -50px 0px',
      }
    );
  
    // Observe all animated elements
    animatedElements.forEach(element => {
      state.intersectionObserver.observe(element);
    });
  }
  
  /**
   * Initialize staggered animations for project cards
   */
  function initProjectCardAnimations() {
    if (prefersReducedMotion()) {
      return;
    }
  
    const projectCards = document.querySelectorAll('.project-card[data-animate="reveal"]');
    
    projectCards.forEach((card, index) => {
      // Set staggered delay for each card
      card.dataset.animateDelay = index * CONFIG.animationDelay;
    });
  }
  
  // ========================================
  // SMOOTH SCROLL
  // ========================================
  
  /**
   * Initialize smooth scroll for anchor links
   */
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
          return;
        }
  
        const target = document.querySelector(href);
        
        if (target) {
          e.preventDefault();
          
          const targetPosition = target.offsetTop - CONFIG.smoothScrollOffset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          });
  
          // Update URL without jumping
          history.pushState(null, null, href);
  
          // Focus target for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      });
    });
  }
  
  // ========================================
  // FORM HANDLING
  // ========================================
  
  /**
   * Initialize contact form functionality
   */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
      return;
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // TODO: Implement actual form submission
      // This is a placeholder for demonstration
      console.log('Form submitted:', data);
      
      // Show success message (placeholder)
      alert('Thank you for your message! This is a demo form.');
      
      // Reset form
      form.reset();
    });
  
    // Add real-time validation feedback
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateInput(input);
      });
    });
  }
  
  /**
   * Validate form input
   * @param {HTMLElement} input - Input element to validate
   */
  function validateInput(input) {
    if (input.hasAttribute('required') && !input.value.trim()) {
      input.setAttribute('aria-invalid', 'true');
    } else if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(input.value);
      input.setAttribute('aria-invalid', !isValid);
    } else {
      input.setAttribute('aria-invalid', 'false');
    }
  }
  
  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  
  /**
   * Add background to header on scroll
   */
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    
    if (!header) {
      return;
    }
  
    const handleScroll = debounce(() => {
      if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(28, 28, 32, 0.9)';
      } else {
        header.style.backgroundColor = 'rgba(220, 220, 220, 0.02)';
      }
    }, 10);
  
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  
  /**
   * Enhance keyboard navigation
   */
  function initKeyboardNav() {
    // Trap focus in mobile menu when open
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (!navMenu || !navToggle) {
      return;
    }
  
    navMenu.addEventListener('keydown', (e) => {
      if (!state.navOpen) {
        return;
      }
  
      const focusableElements = navMenu.querySelectorAll('a');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
  
      // Tab key navigation
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }
  
  // ========================================
  // VIDEO SECTION
  // ========================================
  
  /**
   * Initialize video section with toggle and autoplay functionality
   */
  function initVideoSection() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoPlayerWrapper = document.getElementById('videoPlayerWrapper');
    const videoEmbedWrapper = document.getElementById('videoEmbedWrapper');
    const videoEmbed = document.getElementById('videoEmbed');
    const toggleButton = document.getElementById('toggleEmbedButton');
  
    if (!videoPlayer || !toggleButton) {
      return;
    }
  
    // Toggle between native video and embed
    toggleButton.addEventListener('click', () => {
      const isPressed = toggleButton.getAttribute('aria-pressed') === 'true';
      
      if (!isPressed) {
        // Switch to embed
        videoPlayerWrapper.style.display = 'none';
        videoEmbedWrapper.style.display = 'block';
        toggleButton.setAttribute('aria-pressed', 'true');
        
        // Load embed iframe (lazy)
        if (videoEmbed && videoEmbed.dataset.src && !videoEmbed.src) {
          videoEmbed.src = videoEmbed.dataset.src;
        }
        
        // Pause native video
        videoPlayer.pause();
      } else {
        // Switch to native video
        videoEmbedWrapper.style.display = 'none';
        videoPlayerWrapper.style.display = 'block';
        toggleButton.setAttribute('aria-pressed', 'false');
      }
    });
  
    // Video autoplay/pause with IntersectionObserver
    initVideoAutoplay();
  }
  
  /**
   * Initialize video autoplay when 60% visible, pause when out of view
   */
  function initVideoAutoplay() {
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (!videoPlayer) {
      return;
    }
  
    // Skip autoplay if user prefers reduced motion
    if (prefersReducedMotion()) {
      return;
    }
  
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            // Video is 60% visible - autoplay if muted
            if (videoPlayer.muted) {
              videoPlayer.play().catch(err => {
                console.log('Autoplay prevented:', err);
              });
            }
          } else {
            // Video is less than 60% visible or out of view - pause
            if (!videoPlayer.paused) {
              videoPlayer.pause();
            }
          }
        });
      },
      {
        threshold: [0, 0.6, 1],
        rootMargin: '0px',
      }
    );
  
    videoObserver.observe(videoPlayer);
  }
  
  // ========================================
  // PERFORMANCE MONITORING
  // ========================================
  
  /**
   * Log performance metrics (development only)
   */
  function logPerformance() {
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = window.performance.timing;
          const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
          const connectTime = perfData.responseEnd - perfData.requestStart;
          const renderTime = perfData.domComplete - perfData.domLoading;
          
          console.log('Performance Metrics:');
          console.log(`Page Load Time: ${pageLoadTime}ms`);
          console.log(`Connect Time: ${connectTime}ms`);
          console.log(`Render Time: ${renderTime}ms`);
        }, 0);
      });
    }
  }
  
  // ========================================
  // INITIALIZATION
  // ========================================
  
  /**
   * Initialize all functionality when DOM is ready
   */
  function init() {
    // Initialize features
    initMobileNav();
    initCarousel();
    initProjectCardAnimations();
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initHeaderScroll();
    initKeyboardNav();
    initVideoSection();
    
    // Log performance in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      logPerformance();
    }
  
    console.log('Portfolio website initialized successfully');
  }
  
  // ========================================
  // DOM READY
  // ========================================
  
  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // ========================================
  // CLEANUP
  // ========================================
  
  /**
   * Cleanup function for single-page apps
   */
  function cleanup() {
    if (state.intersectionObserver) {
      state.intersectionObserver.disconnect();
    }
  }
  
  // Expose cleanup for potential SPA usage
  window.portfolioCleanup = cleanup;
  