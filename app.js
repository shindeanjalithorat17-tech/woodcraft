document.addEventListener('DOMContentLoaded', () => {
  // --- Constants & Config ---
  const WHATSAPP_NUMBER = '917448224541'; // Format: country code + number (no +, no spaces)
  
  const PRICING = {
    standard: { name: 'Standard Suite', rate: 15000, maxOccupancy: 2 },
    deluxe: { name: 'Deluxe Suite', rate: 22000, maxOccupancy: 2 },
    villa: { name: 'Entire Luxury Villa', rate: 50000, maxOccupancy: 10 }
  };
  
  const ADD_PERSON_FEE = 1500; // Extra person fee per night
  const TAX_RATE = 0.18; // 18% GST

  // --- Scroll Effects & Navigation ---
  const header = document.querySelector('header');
  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header background change on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy active navigation state
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // --- Dynamic Gallery & Lightbox Logic ---
  const GALLERY_ITEMS = [
    { id: 1, src: 'assets/gallery/gallery-1.jpg', category: 'interior', title: 'Luxury Ensuite Bath', desc: 'Premium modern fixtures with clean marble textures.' },
    { id: 2, src: 'assets/gallery/gallery-2.jpg', category: 'interior', title: 'Lounge Sitting Area', desc: 'Plush leather sofa with cozy ambient lighting.' },
    { id: 3, src: 'assets/gallery/gallery-3.jpg', category: 'interior', title: 'Private Dining Area', desc: 'Elegant table arrangement ready for gourmet dinners.' },
    { id: 4, src: 'assets/gallery/gallery-4.jpg', category: 'interior', title: 'Open Concept Living', desc: 'Spacious floor plan connecting the kitchen and lounge.' },
    { id: 5, src: 'assets/gallery/gallery-5.jpg', category: 'interior', title: 'Master Suite Vanity', desc: 'Large dressing mirror and elegant bathroom entry.' },
    { id: 6, src: 'assets/gallery/gallery-6.jpg', category: 'interior', title: 'Walk-in Shower', desc: 'Clean modern shower cabin with premium fixtures.' },
    { id: 7, src: 'assets/gallery/gallery-7.jpg', category: 'interior', title: 'Deluxe Bedroom View', desc: 'Bed facing massive glass doors that look out to nature.' },
    { id: 8, src: 'assets/gallery/gallery-8.jpg', category: 'interior', title: 'Cozy Suite Seating', desc: 'Comfortable room corner with contemporary design.' },
    { id: 9, src: 'assets/gallery/gallery-9.jpg', category: 'interior', title: 'Private Workspace Desk', desc: 'A quiet desk setup for remote work and reading.' },
    { id: 10, src: 'assets/gallery/gallery-10.jpg', category: 'interior', title: 'Premium Suite Bedroom', desc: 'Inviting bedding with customized headboards.' },
    { id: 11, src: 'assets/gallery/gallery-11.jpg', category: 'interior', title: 'Architectural Staircase', desc: 'Modern floating stairs with safety glass balustrades.' },
    { id: 12, src: 'assets/gallery/gallery-12.jpg', category: 'interior', title: 'Balcony Lounge Chair', desc: 'Comfortable sit-out area facing scenic views.' },
    { id: 13, src: 'assets/gallery/gallery-13.jpg', category: 'exterior', title: 'Grand Entrance Foyer', desc: 'Beautiful glass doors opening into the estate.' },
    { id: 14, src: 'assets/gallery/gallery-14.jpg', category: 'interior', title: 'Double-Height Lounge', desc: 'Spectacular high ceilings and warm chandelier lights.' },
    { id: 15, src: 'assets/gallery/gallery-15.jpg', category: 'interior', title: 'Master Suite Bedroom', desc: 'Luxurious master bedroom looking directly into forest views.' },
    { id: 16, src: 'assets/gallery/gallery-16.jpg', category: 'pool', title: 'Infinity Pool at Dusk', desc: 'Stunning twilight view of the pool and glowing skies.' },
    { id: 17, src: 'assets/gallery/gallery-17.jpg', category: 'interior', title: 'Fully Equipped Kitchen', desc: 'Sleek counters, induction cooktops, and prep island.' },
    { id: 18, src: 'assets/gallery/gallery-18.jpg', category: 'interior', title: 'Luminous Guest Corridor', desc: 'Bright, warm hallway leading to the private suites.' },
    { id: 19, src: 'assets/gallery/gallery-19.jpg', category: 'interior', title: 'Premium Basin Vanity', desc: 'Dual marble sinks with floating back-lit mirrors.' },
    { id: 20, src: 'assets/gallery/gallery-20.jpg', category: 'interior', title: 'Staircase Details', desc: 'Crisp wooden steps matching the contemporary styling.' },
    { id: 21, src: 'assets/gallery/gallery-21.jpg', category: 'garden', title: 'Manicured Green Lawn', desc: 'Expansive garden grass areas perfect for leisure activities.' },
    { id: 22, src: 'assets/gallery/gallery-22.jpg', category: 'garden', title: 'Sun-drenched Seating', desc: 'Comfortable garden layout benches for tea and reading.' },
    { id: 23, src: 'assets/gallery/gallery-23.jpg', category: 'pool', title: 'Poolside Lounge Deck', desc: 'Sunbeds by the crystal-clear pool water during the day.' },
    { id: 24, src: 'assets/gallery/gallery-24.jpg', category: 'interior', title: 'Cozy Foyer Corner', desc: 'A aesthetic lounge chair corner inside the entrance hallway.' },
    { id: 25, src: 'assets/gallery/gallery-25.jpg', category: 'garden', title: 'Lush Garden Pathway', desc: 'Beautiful paved walkways surrounded by tropical plants.' },
    { id: 26, src: 'assets/gallery/gallery-26.jpg', category: 'pool', title: 'Infinity Pool Deck', desc: 'Expansive poolside view under a clear sunny sky.' },
    { id: 27, src: 'assets/gallery/gallery-27.jpg', category: 'pool', title: 'Reflective Pool Water', desc: 'Daytime view of the villa reflecting on the pool surface.' },
    { id: 28, src: 'assets/gallery/gallery-28.jpg', category: 'exterior', title: 'Modern Villa Architecture', desc: 'Clean concrete lines and glass panels of the facade.' },
    { id: 29, src: 'assets/gallery/gallery-29.jpg', category: 'interior', title: 'Panoramic Living Lounge', desc: 'Wide-angle view of the custom-furnished living area.' },
    { id: 30, src: 'assets/gallery/gallery-30.jpg', category: 'pool', title: 'Twilight Pool Vistas', desc: 'The swimming pool lit up beautifully at dusk.' },
    { id: 31, src: 'assets/gallery/gallery-31.jpg', category: 'exterior', title: 'Grand Twilight Facade', desc: 'Stunning twilight architectural shot of the entire villa.' },
    { id: 32, src: 'assets/gallery/gallery-32.jpg', category: 'exterior', title: 'Breathtaking Balcony View', desc: 'View of the valleys from the master suite balcony.' }
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let activeFilteredItems = [...GALLERY_ITEMS];
  let currentLightboxIdx = 0;

  // Render gallery grid items
  function renderGallery(filterCategory = 'all') {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    
    // Filter items
    activeFilteredItems = filterCategory === 'all' 
      ? [...GALLERY_ITEMS] 
      : GALLERY_ITEMS.filter(item => item.category === filterCategory);
      
    activeFilteredItems.forEach((item, index) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'gallery-item';
      itemEl.setAttribute('data-index', index);
      
      itemEl.innerHTML = `
        <img src="${item.src}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <h4 class="gallery-item-title">${item.title}</h4>
          <span class="gallery-item-desc">${item.category}</span>
        </div>
      `;
      
      itemEl.addEventListener('click', () => openLightbox(index));
      galleryGrid.appendChild(itemEl);
    });
  }

  // Handle Category Filtering
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderGallery(filterValue);
    });
  });

  // Lightbox Modal Controls
  function openLightbox(index) {
    if (!lightbox) return;
    currentLightboxIdx = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  }

  function updateLightboxContent() {
    const item = activeFilteredItems[currentLightboxIdx];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
  }

  function showNextLightbox() {
    if (activeFilteredItems.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx + 1) % activeFilteredItems.length;
    updateLightboxContent();
  }

  function showPrevLightbox() {
    if (activeFilteredItems.length === 0) return;
    currentLightboxIdx = (currentLightboxIdx - 1 + activeFilteredItems.length) % activeFilteredItems.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevLightbox);

  // Close lightbox clicking outside the content area
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard controls for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowRight') showNextLightbox();
    if (e.key === 'ArrowLeft') showPrevLightbox();
    if (e.key === 'Escape') closeLightbox();
  });

  // Initial render
  renderGallery();

  // --- Booking Calculator Form Logic ---
  const checkinInput = document.getElementById('checkin');
  const checkoutInput = document.getElementById('checkout');
  const guestSelect = document.getElementById('guests');
  const stayTypeSelect = document.getElementById('stay-type');
  
  const summaryContainer = document.getElementById('calc-summary');
  const summaryNights = document.getElementById('sum-nights');
  const summaryBase = document.getElementById('sum-base');
  const summaryExtra = document.getElementById('sum-extra');
  const summaryTax = document.getElementById('sum-tax');
  const summaryTotal = document.getElementById('sum-total');
  const bookingForm = document.getElementById('booking-form');

  // Set minimum check-in date to today
  const today = new Date().toISOString().split('T')[0];
  if (checkinInput) {
    checkinInput.min = today;
  }

  function handleCheckinChange() {
    if (!checkinInput.value) return;
    
    const checkinDate = new Date(checkinInput.value);
    // Ignore invalid or unreasonable years to prevent range errors on toISOString
    if (isNaN(checkinDate.getTime()) || checkinDate.getFullYear() < 2020 || checkinDate.getFullYear() > 2100) {
      return;
    }
    
    // Check-out must be at least one day after check-in
    const checkoutMin = new Date(checkinDate);
    checkoutMin.setDate(checkoutMin.getDate() + 1);
    
    const checkoutMinString = checkoutMin.toISOString().split('T')[0];
    checkoutInput.min = checkoutMinString;

    // Adjust check-out date if it's currently invalid/before new min
    const currentCheckoutDate = new Date(checkoutInput.value);
    if (!checkoutInput.value || isNaN(currentCheckoutDate.getTime()) || currentCheckoutDate <= checkinDate || currentCheckoutDate.getFullYear() > 2100) {
      checkoutInput.value = checkoutMinString;
    }

    calculateStayCost();
  }

  if (checkinInput) checkinInput.addEventListener('change', handleCheckinChange);
  if (checkoutInput) checkoutInput.addEventListener('change', calculateStayCost);
  if (guestSelect) guestSelect.addEventListener('change', calculateStayCost);
  if (stayTypeSelect) stayTypeSelect.addEventListener('change', calculateStayCost);

  function calculateStayCost() {
    const checkinVal = checkinInput.value;
    const checkoutVal = checkoutInput.value;
    const guests = parseInt(guestSelect.value) || 1;
    const stayType = stayTypeSelect.value;

    if (!checkinVal || !checkoutVal || !stayType) {
      summaryContainer.classList.remove('visible');
      return;
    }

    const checkin = new Date(checkinVal);
    const checkout = new Date(checkoutVal);
    
    // Validate that dates are valid Date objects and have reasonable calendar years (e.g. between 2020 and 2100)
    if (isNaN(checkin.getTime()) || isNaN(checkout.getTime()) ||
        checkin.getFullYear() < 2020 || checkin.getFullYear() > 2100 ||
        checkout.getFullYear() < 2020 || checkout.getFullYear() > 2100) {
      summaryContainer.classList.remove('visible');
      return;
    }

    // Set both to UTC midnight to avoid local timezone and DST offsets
    checkin.setUTCHours(0, 0, 0, 0);
    checkout.setUTCHours(0, 0, 0, 0);
    
    // Calculate difference in nights
    const diffTime = checkout.getTime() - checkin.getTime();
    const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (nights <= 0) {
      summaryContainer.classList.remove('visible');
      return;
    }

    const stayConfig = PRICING[stayType];
    const baseRate = stayConfig.rate;
    const maxOccupancy = stayConfig.maxOccupancy;

    // Calculate base stay price
    const baseCost = baseRate * nights;

    // Calculate extra guests charge
    let extraGuestsCost = 0;
    if (guests > maxOccupancy) {
      const extraGuests = guests - maxOccupancy;
      extraGuestsCost = extraGuests * ADD_PERSON_FEE * nights;
    }

    // Calculate taxes (GST)
    const taxableAmount = baseCost + extraGuestsCost;
    const taxCost = taxableAmount * TAX_RATE;
    const totalCost = taxableAmount + taxCost;

    // Update UI elements
    summaryNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
    summaryBase.textContent = `₹${baseCost.toLocaleString('en-IN')}`;
    
    if (extraGuestsCost > 0) {
      summaryExtra.parentElement.style.display = 'flex';
      summaryExtra.textContent = `₹${extraGuestsCost.toLocaleString('en-IN')}`;
    } else {
      summaryExtra.parentElement.style.display = 'none';
    }

    summaryTax.textContent = `₹${taxCost.toLocaleString('en-IN')}`;
    summaryTotal.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
    
    summaryContainer.classList.add('visible');
    
    return {
      nights,
      stayName: stayConfig.name,
      baseCost,
      extraGuestsCost,
      taxCost,
      totalCost
    };
  }

  // Handle Form Submission - Pre-filled WhatsApp Redirect
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const calcResults = calculateStayCost();
      if (!calcResults) {
        alert('Please fill out all check-in/out dates and options first.');
        return;
      }

      const checkinDate = formatDateString(checkinInput.value);
      const checkoutDate = formatDateString(checkoutInput.value);
      const guests = guestSelect.value;

      // Construct a premium formatted message
      const message = `Hi Aahna Villa! 🌟 I would like to book a stay. Here are my details:

✨ *Accommodation:* ${calcResults.stayName}
📅 *Check-In:* ${checkinDate}
📅 *Check-Out:* ${checkoutDate}
🌙 *Duration:* ${calcResults.nights} Night(s)
👥 *Guests:* ${guests} Guest(s)
💰 *Estimated Price:* ₹${calcResults.totalCost.toLocaleString('en-IN')} (incl. 18% GST)

Please confirm if these dates are available! Thank you.`;

      // Generate WhatsApp Direct link
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      // Open in new window/tab
      window.open(waUrl, '_blank');
    });
  }

  // Direct Inquiry floating/footer triggers
  const waDirectBtn = document.getElementById('floating-wa-btn');
  const footerWaBtn = document.getElementById('footer-wa-btn');

  const openDirectInquiry = () => {
    const message = `Hi Aahna Villa! I am visiting your website and would like to make an inquiry.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  if (waDirectBtn) waDirectBtn.addEventListener('click', openDirectInquiry);
  if (footerWaBtn) footerWaBtn.addEventListener('click', openDirectInquiry);

  // Helper function to turn YYYY-MM-DD into DD/MM/YYYY or similar friendly display
  function formatDateString(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  // --- Accordion FAQ toggling ---
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqItem = header.parentElement;
      const faqBody = faqItem.querySelector('.faq-body');
      
      // Close other active FAQs
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
          item.classList.remove('active');
          item.querySelector('.faq-body').style.maxHeight = '0px';
        }
      });

      // Toggle current FAQ
      faqItem.classList.toggle('active');
      if (faqItem.classList.contains('active')) {
        // Set height to scrollHeight to allow transition animation
        faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
      } else {
        faqBody.style.maxHeight = '0px';
      }
    });
  });
});
