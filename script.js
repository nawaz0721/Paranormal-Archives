document.addEventListener("DOMContentLoaded", () => {
  // Import Particles.js and Swiper
  const particlesJS = window.particlesJS;
  const Swiper = window.Swiper;

  // Initialize Particles.js
  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#7d0000",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#7d0000",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    });
  }

  // Initialize Swiper for featured videos
  if (document.querySelector(".featured-swiper")) {
    const featuredSwiper = new Swiper(".featured-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }

  // Initialize Swiper for testimonials
  if (document.querySelector(".testimonial-swiper")) {
    const testimonialSwiper = new Swiper(".testimonial-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
      },
      autoplay: {
        delay: 5000,
      },
    });
  }

  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("nav ul");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");

      // Toggle between menu and close icon
      if (navMenu.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
      } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // Close menu when clicking on a nav link (mobile)
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        if (menuToggle) {
          menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Modal functionality - FIX FOR MODALS NOT SHOWING
  const modals = document.querySelectorAll(".modal");
  const modalOpeners = document.querySelectorAll(".open-modal");
  const modalClosers = document.querySelectorAll(".close-modal");

  // Open modal - Fixed to work with login/signup links
  modalOpeners.forEach((opener) => {
    opener.addEventListener("click", function (e) {
      e.preventDefault();
      const modalId = this.getAttribute("href");
      const modal = document.querySelector(modalId);

      if (modal) {
        // Close all other modals first
        modals.forEach((m) => {
          m.style.display = "none";
        });

        // Open the target modal
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";

        // If this is a subscription button, update the selected plan
        if (this.hasAttribute("data-plan")) {
          const planName = this.getAttribute("data-plan");
          updateSelectedPlan(planName);
        }
      }
    });
  });

  // Also add event listeners to login and signup buttons specifically
  const loginBtn = document.querySelector(".login-btn a");
  const signupBtn = document.querySelector(".signup-btn a");

  if (loginBtn) {
    loginBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const loginModal = document.getElementById("login");
      if (loginModal) {
        // Close all other modals first
        modals.forEach((m) => {
          m.style.display = "none";
        });
        
        // Open login modal
        loginModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const signupModal = document.getElementById("signup");
      if (signupModal) {
        // Close all other modals first
        modals.forEach((m) => {
          m.style.display = "none";
        });
        
        // Open signup modal
        signupModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  }

  // Close modal
  modalClosers.forEach((closer) => {
    closer.addEventListener("click", function () {
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // Password strength meter
  const passwordInput = document.getElementById("signup-password");
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      const password = this.value;
      const strengthSegments = document.querySelectorAll(".strength-segment");
      const strengthText = document.querySelector(".strength-text");

      // Reset
      strengthSegments.forEach((segment) => {
        segment.className = "strength-segment";
      });

      // Calculate strength
      let strength = 0;
      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      // Update UI
      for (let i = 0; i < strength; i++) {
        if (strength === 1) {
          strengthSegments[i].classList.add("weak");
        } else if (strength === 2 || strength === 3) {
          strengthSegments[i].classList.add("medium");
        } else if (strength === 4) {
          strengthSegments[i].classList.add("strong");
        }
      }

      // Update text
      if (strength === 0) {
        strengthText.textContent = "Password strength: Too weak";
      } else if (strength === 1) {
        strengthText.textContent = "Password strength: Weak";
      } else if (strength === 2) {
        strengthText.textContent = "Password strength: Medium";
      } else if (strength === 3) {
        strengthText.textContent = "Password strength: Good";
      } else {
        strengthText.textContent = "Password strength: Strong";
      }
    });
  }

  // Subscription modal tabs
  const subscriptionTabs = document.querySelectorAll(".subscription-tabs .tab");
  if (subscriptionTabs.length > 0) {
    subscriptionTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs
        subscriptionTabs.forEach((t) => t.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Update billing period in summary
        const billingPeriod = this.getAttribute("data-tab");
        const billingPeriodElement = document.querySelector(".billing-period");
        if (billingPeriodElement) {
          billingPeriodElement.textContent = billingPeriod === "monthly" ? "Monthly" : "Annual";
        }

        // Update prices based on billing period
        updatePricesForBillingPeriod(billingPeriod);

        // Update total
        updateSubscriptionTotal();
      });
    });
  }

  // Subscription options
  const subscriptionOptions = document.querySelectorAll(".subscription-option");
  if (subscriptionOptions.length > 0) {
    subscriptionOptions.forEach((option) => {
      const radio = option.querySelector('input[type="radio"]');

      option.addEventListener("click", function () {
        // Check the radio button
        if (radio) {
          radio.checked = true;
        }

        // Update plan name in summary
        const planName = this.getAttribute("data-plan");
        updateSelectedPlan(planName);
      });
    });
  }

  // Payment methods
  const paymentMethods = document.querySelectorAll(".payment-method");
  if (paymentMethods.length > 0) {
    paymentMethods.forEach((method) => {
      const radio = method.querySelector('input[type="radio"]');

      method.addEventListener("click", function () {
        // Remove active class from all methods
        paymentMethods.forEach((m) => m.classList.remove("active"));

        // Add active class to clicked method
        this.classList.add("active");

        // Check the radio button
        if (radio) {
          radio.checked = true;
        }
      });
    });
  }

  // Video preview functionality
  const videoContainers = document.querySelectorAll(
    ".video-container:not(.locked), .featured-item:not(.locked) .featured-thumbnail"
  );
  videoContainers.forEach((container) => {
    const playIcon = container.querySelector(".play-icon");
    if (playIcon) {
      playIcon.addEventListener("click", () => {
        // Open video preview modal
        const videoModal = document.getElementById("video-preview-modal");
        if (videoModal) {
          videoModal.style.display = "flex";
          document.body.style.overflow = "hidden";

          // Play the video
          const video = videoModal.querySelector("video");
          if (video) {
            video.play();
          }
        }
      });
    }
  });

  // Close video modal and pause video
  const videoModal = document.getElementById("video-preview-modal");
  if (videoModal) {
    const closeVideoModal = videoModal.querySelector(".close-modal");
    const video = videoModal.querySelector("video");

    if (closeVideoModal && video) {
      closeVideoModal.addEventListener("click", () => {
        videoModal.style.display = "none";
        document.body.style.overflow = "auto";
        video.pause();
      });

      window.addEventListener("click", (e) => {
        if (e.target === videoModal) {
          videoModal.style.display = "none";
          document.body.style.overflow = "auto";
          video.pause();
        }
      });
    }
  }

  // Locked content interaction
  const lockedContent = document.querySelectorAll(".lock-overlay, .lock-icon");
  lockedContent.forEach((item) => {
    item.addEventListener("click", () => {
      // Open subscription modal
      const subscriptionModal = document.getElementById("subscription-modal");
      if (subscriptionModal) {
        subscriptionModal.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        alert("Thank you for subscribing to our newsletter!");
        emailInput.value = "";
      }
    });
  }

  // Login form
  const loginForm = document.querySelector(".login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login functionality would be implemented here.");
    });
  }

  // Signup form
  const signupForm = document.querySelector(".signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Signup functionality would be implemented here.");
    });
  }

  // Subscription form
  const subscriptionForm = document.querySelector(".payment-form");
  if (subscriptionForm) {
    subscriptionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing to Real Ghost Capture!");

      // Close modal
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  }

  // Helper function to update selected plan
  function updateSelectedPlan(planName) {
    // Update radio button
    const planRadio = document.getElementById(planName);
    if (planRadio) {
      planRadio.checked = true;
    }

    // Update plan name in summary
    let displayName = "Basic Access";
    if (planName === "premium") {
      displayName = "Premium Access";
    } else if (planName === "ultimate") {
      displayName = "Ultimate Access";
    } else if (planName === "annual") {
      displayName = "Annual Pass";
    }

    const planNameElement = document.querySelector(".plan-name");
    if (planNameElement) {
      planNameElement.textContent = displayName;
    }

    // Update total
    updateSubscriptionTotal();
  }

  // Helper function to update prices based on billing period
  function updatePricesForBillingPeriod(period) {
    const options = document.querySelectorAll(".subscription-option");

    options.forEach((option) => {
      const priceElement = option.querySelector(".price");
      if (!priceElement) return;
      
      const planType = option.getAttribute("data-plan");

      if (period === "monthly") {
        if (planType === "basic") {
          priceElement.textContent = "$9.99";
        } else if (planType === "premium") {
          priceElement.textContent = "$19.99";
        } else if (planType === "ultimate") {
          priceElement.textContent = "$29.99";
        }
      } else {
        // Annual prices (25% discount)
        if (planType === "basic") {
          priceElement.textContent = "$89.99";
        } else if (planType === "premium") {
          priceElement.textContent = "$179.99";
        } else if (planType === "ultimate") {
          priceElement.textContent = "$269.99";
        }
      }
    });
  }

  // Helper function to update subscription total
  function updateSubscriptionTotal() {
    const selectedPlan = document.querySelector('.subscription-option input[type="radio"]:checked');
    const tabActive = document.querySelector(".subscription-tabs .tab.active");
    
    if (!selectedPlan || !tabActive) return;
    
    const billingPeriod = tabActive.getAttribute("data-tab");
    const planType = selectedPlan.closest(".subscription-option").getAttribute("data-plan");
    const totalElement = document.querySelector(".total-price");
    
    if (!totalElement) return;

    let price = "";
    if (billingPeriod === "monthly") {
      if (planType === "basic") {
        price = "$9.99/month";
      } else if (planType === "premium") {
        price = "$19.99/month";
      } else if (planType === "ultimate") {
        price = "$29.99/month";
      }
    } else {
      if (planType === "basic") {
        price = "$89.99/year";
      } else if (planType === "premium") {
        price = "$179.99/year";
      } else if (planType === "ultimate") {
        price = "$269.99/year";
      }
    }

    totalElement.textContent = price;
  }

  // Add spooky cursor effect
  const body = document.querySelector("body");
  if (body) {
    body.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Create a subtle glow effect that follows the cursor
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      glow.style.cssText = `
              position: fixed;
              top: ${y}px;
              left: ${x}px;
              width: 30px;
              height: 30px;
              background: radial-gradient(circle, rgba(125,0,0,0.3) 0%, rgba(125,0,0,0) 70%);
              border-radius: 50%;
              transform: translate(-50%, -50%);
              pointer-events: none;
              z-index: 9999;
          `;

      body.appendChild(glow);

      // Remove the glow effect after animation
      setTimeout(() => {
        glow.style.opacity = "0";
        setTimeout(() => {
          glow.remove();
        }, 300);
      }, 100);
    });
  }

  // Add random flicker effect to highlight elements
  const highlights = document.querySelectorAll(".highlight");

  function randomFlicker() {
    highlights.forEach((highlight) => {
      if (Math.random() > 0.99) {
        highlight.style.opacity = "0.7";
        setTimeout(() => {
          highlight.style.opacity = "1";
        }, 100);
      }
    });

    requestAnimationFrame(randomFlicker);
  }

  randomFlicker();
});
