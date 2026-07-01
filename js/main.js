/**
 * Aurora Grand - Luxury Hotel Website
 * JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Loader immediately
    initLoader();

    // 2. Mobile Menu Toggle
    initMobileMenu();

    // 3. Scroll Reveal Animations
    initScrollReveal();

    // 4. Statistics Counters Animation
    initCounters();

    // 5. Testimonial Review Carousel
    initTestimonialCarousel();

    // 6. Room Category Filter
    initRoomFilter();

    // 7. Gallery Category Filter & Lightbox
    initGallery();

    // 8. Contact Booking Form Validation
    initContactFormValidation();

    // 9. FAQ Accordion
    initFAQAccordion();

    // Initialize Unified Scroll System
    initUnifiedScroll();
});

/* ==========================================================================
   Unified Scroll System (High Performance & Throttled)
   ========================================================================== */
function initUnifiedScroll() {
    const header = document.querySelector('header');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const progressBar = document.getElementById('scroll-progress');
    const heroBg = document.querySelector('.hero-bg');
    const heroContent = document.querySelector('.hero-content');
    const bannerBg = document.querySelector('.page-banner-bg');
    const bannerContent = document.querySelector('.page-banner-content');

    // Smooth scroll to top click handler
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    const handleScroll = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // 1. Navigation scroll
        if (header) {
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // 2. Scroll to top button visibility
        if (scrollTopBtn) {
            if (scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }

        // 3. Scroll progress bar
        if (progressBar) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (scrollY / totalHeight) * 100;
                progressBar.style.width = `${progress}%`;
            }
        }

        // 4. Hero Zoom on scroll
        if (heroBg) {
            const scale = 1 + scrollY * 0.0008;
            const translate = scrollY * 0.12;
            heroBg.style.transform = `scale(${scale}) translateY(${translate}px)`;
            
            if (heroContent) {
                const opacity = Math.max(0, 1 - scrollY * 0.0018);
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
        }
        
        // 5. Banner Zoom on scroll
        if (bannerBg) {
            const scale = 1 + scrollY * 0.0006;
            const translate = scrollY * 0.08;
            bannerBg.style.transform = `scale(${scale}) translateY(${translate}px)`;
            
            if (bannerContent) {
                const opacity = Math.max(0, 1 - scrollY * 0.0022);
                bannerContent.style.opacity = opacity;
                bannerContent.style.transform = `translateY(${scrollY * 0.12}px)`;
            }
        }
    };

    // Run once on init
    handleScroll();

    // Set passive scroll listener with rAF throttling
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });
}

/* ==========================================================================
   2. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-item a');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/* ==========================================================================
   3. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. Statistics Counters Animation
   ========================================================================== */
function initCounters() {
    const counterElements = document.querySelectorAll('.stat-number');
    if (counterElements.length === 0) return;

    const countUp = (element) => {
        const targetStr = element.getAttribute('data-target');
        const isPlus = targetStr.includes('+');
        const target = parseInt(targetStr.replace('+', '').replace(/,/g, ''), 10);
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas if necessary
            let displayVal = current.toLocaleString();
            element.textContent = displayVal + (isPlus ? '+' : '');
        }, stepTime);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
}

/* ==========================================================================
   5. Testimonial Review Carousel
   ========================================================================== */
function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const nextBtn = document.querySelector('.carousel-nav-btn.next');
    const prevBtn = document.querySelector('.carousel-nav-btn.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval;

    // Create dot indicators with buttons for accessibility
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.setAttribute('type', 'button');
        dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.carousel-dot'));

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            } else {
                dot.classList.remove('active');
                dot.removeAttribute('aria-current');
            }
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        updateCarousel();
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });
    }

    // Keyboard navigation on the carousel
    const carouselContainer = document.querySelector('.testimonials-carousel-container');
    if (carouselContainer) {
        carouselContainer.setAttribute('tabindex', '0');
        carouselContainer.setAttribute('aria-label', 'Guest Reviews Carousel. Use Left and Right arrow keys to navigate.');
        carouselContainer.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoSlide();
                e.preventDefault();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoSlide();
                e.preventDefault();
            }
        });
    }

    // Auto-slide functionality
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 6000); // Change slide every 6s
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();
}

/* ==========================================================================
   6. Room Category Filter
   ========================================================================== */
function initRoomFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.rooms-grid .room-card');

    if (filterButtons.length === 0 || roomCards.length === 0) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            roomCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 350); // Matches CSS transition duration
                }
            });
        });
    });
}

/* ==========================================================================
   7. Gallery Category Filter & Lightbox
   ========================================================================== */
function initGallery() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Lightbox Elements
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-arrow.left');
    const lightboxNext = lightbox.querySelector('.lightbox-arrow.right');

    let activeItems = [...galleryItems]; // Tracks items currently visible under active filter
    let currentImageIndex = 0;

    // Gallery Categorization
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                activeItems = [];

                galleryItems.forEach(item => {
                    const categories = item.getAttribute('data-category').split(' ');

                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        item.style.display = 'block';
                        activeItems.push(item);
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 350);
                    }
                });
            });
        });
    }

    // Lightbox Open
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Find index of clicked item within current active list
            currentImageIndex = activeItems.indexOf(item);
            if (currentImageIndex === -1) return;

            openLightbox();
        });
    });

    const openLightbox = () => {
        const item = activeItems[currentImageIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const category = item.querySelector('span').textContent;

        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `${title} <br> <span style="font-size: 0.8rem; color: #C8A74E; text-transform: uppercase; font-family: var(--font-body); letter-spacing: 0.1em;">${category}</span>`;
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Stop page scrolling behind lightbox
    };

    const closeLightbox = () => {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    };

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % activeItems.length;
        openLightbox();
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + activeItems.length) % activeItems.length;
        openLightbox();
    };

    // Lightbox Event Listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    // Close on click outside content
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });
}

/* ==========================================================================
   8. Contact Booking Form Validation
   ========================================================================== */
function initContactFormValidation() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const setError = (element, message) => {
        const group = element.closest('.form-group');
        group.classList.add('has-error');
        const error = group.querySelector('.error-message');
        error.textContent = message;
    };

    const clearError = (element) => {
        const group = element.closest('.form-group');
        group.classList.remove('has-error');
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhone = (phone) => {
        const regex = /^[0-9+\s-]{8,15}$/;
        return regex.test(phone);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // 1. Name Validation
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            setError(name, 'Full name is required');
            isValid = false;
        } else {
            clearError(name);
        }

        // 2. Email Validation
        const email = document.getElementById('email');
        if (email.value.trim() === '') {
            setError(email, 'Email address is required');
            isValid = false;
        } else if (!validateEmail(email.value.trim())) {
            setError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }

        // 3. Phone Validation
        const phone = document.getElementById('phone');
        if (phone.value.trim() === '') {
            setError(phone, 'Phone number is required');
            isValid = false;
        } else if (!validatePhone(phone.value.trim())) {
            setError(phone, 'Please enter a valid phone number (digits only)');
            isValid = false;
        } else {
            clearError(phone);
        }

        // 4. Date Validation
        const checkin = document.getElementById('checkin');
        const checkout = document.getElementById('checkout');
        const today = new Date();
        today.setHours(0,0,0,0);

        if (checkin.value === '') {
            setError(checkin, 'Check-in date is required');
            isValid = false;
        } else {
            const checkinDate = new Date(checkin.value);
            if (checkinDate < today) {
                setError(checkin, 'Check-in date cannot be in the past');
                isValid = false;
            } else {
                clearError(checkin);
            }
        }

        if (checkout.value === '') {
            setError(checkout, 'Check-out date is required');
            isValid = false;
        } else {
            const checkoutDate = new Date(checkout.value);
            const checkinDate = new Date(checkin.value);
            
            if (checkin.value !== '' && checkoutDate <= checkinDate) {
                setError(checkout, 'Check-out date must be after check-in date');
                isValid = false;
            } else {
                clearError(checkout);
            }
        }

        // 5. Guests Validation
        const guests = document.getElementById('guests');
        if (guests.value === '') {
            setError(guests, 'Please select number of guests');
            isValid = false;
        } else {
            clearError(guests);
        }

        // 6. Room Type Validation
        const roomType = document.getElementById('roomType');
        if (roomType.value === '') {
            setError(roomType, 'Please select a room type');
            isValid = false;
        } else {
            clearError(roomType);
        }

        if (isValid) {
            // Persist the booking in localStorage for the Admin Dashboard
            const specialRequests = document.getElementById('specialRequests');
            const bookingData = {
                id: 'AG-' + Math.floor(100000 + Math.random() * 900000),
                name: name.value,
                email: email.value,
                phone: phone.value,
                roomType: roomType.value,
                checkin: checkin.value,
                checkout: checkout.value,
                guests: guests.value,
                specialRequests: specialRequests ? specialRequests.value : '',
                status: 'Pending',
                date: new Date().toISOString().split('T')[0]
            };
            const currentBookings = JSON.parse(localStorage.getItem('aurora_bookings') || '[]');
            currentBookings.push(bookingData);
            localStorage.setItem('aurora_bookings', JSON.stringify(currentBookings));

            // Success alert & Form submission simulation
            const successOverlay = document.createElement('div');
            successOverlay.style.position = 'fixed';
            successOverlay.style.top = '0';
            successOverlay.style.left = '0';
            successOverlay.style.width = '100%';
            successOverlay.style.height = '100%';
            successOverlay.style.background = 'rgba(17, 17, 17, 0.95)';
            successOverlay.style.zIndex = '3000';
            successOverlay.style.display = 'flex';
            successOverlay.style.flexDirection = 'column';
            successOverlay.style.alignItems = 'center';
            successOverlay.style.justifyContent = 'center';
            successOverlay.style.color = '#FFFFFF';
            successOverlay.style.textAlign = 'center';
            successOverlay.style.padding = '2rem';
            
            successOverlay.innerHTML = `
                <div class="reveal active" style="max-width: 500px;">
                    <div style="font-size: 4rem; color: #C8A74E; margin-bottom: 1.5rem;"><i class="fa-solid fa-crown"></i></div>
                    <h2 style="font-family: var(--font-heading); font-size: 2.5rem; margin-bottom: 1rem; color: #FFFFFF;">Booking Request Sent</h2>
                    <p style="color: #E0E0E0; font-family: var(--font-body); font-weight: 300; margin-bottom: 2rem; line-height: 1.7;">
                        Thank you, ${name.value}. Your luxury reservation inquiry has been received. Our guest relations representative will contact you shortly to confirm your booking.
                    </p>
                    <button id="closeSuccessBtn" class="btn btn-primary">Return to site</button>
                </div>
            `;

            document.body.appendChild(successOverlay);
            document.body.style.overflow = 'hidden';

            document.getElementById('closeSuccessBtn').addEventListener('click', () => {
                successOverlay.remove();
                document.body.style.overflow = '';
                form.reset();
            });
        }
    });

    // Live validation clearing on input
    const fields = [name, email, phone, checkin, checkout, guests, roomType];
    fields.forEach(field => {
        if (!field) return;
        field.addEventListener('input', () => {
            if (field.value.trim() !== '') {
                clearError(field);
            }
        });
        field.addEventListener('change', () => {
            if (field.value !== '') {
                clearError(field);
            }
        });
    });
}

/* ==========================================================================
   9. FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length === 0) return;

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close other accordion items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}



/* ==========================================================================
   12. Fullscreen Loading Screen
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    if (!loader) return;

    // Fade out loader on window load (when all assets are ready)
    window.addEventListener('load', () => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500); // Matches CSS transition duration
    });

    // Fallback: hide loader after 3 seconds in case window load takes too long
    setTimeout(() => {
        if (!loader.classList.contains('fade-out')) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 3000);
}


