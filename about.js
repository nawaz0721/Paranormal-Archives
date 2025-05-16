document.addEventListener("DOMContentLoaded", () => {
  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active")
  }

  // Animate timeline items on scroll
  const timelineItems = document.querySelectorAll(".timeline-item")

  function checkScroll() {
    timelineItems.forEach((item) => {
      const itemTop = item.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (itemTop < windowHeight * 0.8) {
        item.classList.add("animate")
      }
    })
  }

  // Add animation class
  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Check on scroll
  window.addEventListener("scroll", checkScroll)

  // Check on load
  checkScroll()

  // Team member hover effect
  const teamMembers = document.querySelectorAll(".team-member")

  teamMembers.forEach((member) => {
    member.addEventListener("mouseenter", function () {
      const socialIcons = this.querySelectorAll(".member-social a")

      socialIcons.forEach((icon, index) => {
        icon.style.transitionDelay = `${index * 0.1}s`
        icon.style.transform = "translateY(-3px)"
        icon.style.opacity = "1"
      })
    })

    member.addEventListener("mouseleave", function () {
      const socialIcons = this.querySelectorAll(".member-social a")

      socialIcons.forEach((icon, index) => {
        icon.style.transitionDelay = "0s"
        icon.style.transform = "translateY(0)"
        icon.style.opacity = "0.7"
      })
    })
  })

  // Initialize social icons
  document.querySelectorAll(".member-social a").forEach((icon) => {
    icon.style.opacity = "0.7"
    icon.style.transition = "transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease, color 0.3s ease"
  })

  // Methodology steps animation
  const methodologySteps = document.querySelectorAll(".methodology-step")

  function checkMethodologyScroll() {
    methodologySteps.forEach((step, index) => {
      const stepTop = step.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (stepTop < windowHeight * 0.8) {
        setTimeout(() => {
          step.classList.add("animate")
        }, index * 200)
      }
    })
  }

  // Add animation class
  methodologySteps.forEach((step) => {
    step.style.opacity = "0"
    step.style.transform = "translateX(-20px)"
    step.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Check on scroll
  window.addEventListener("scroll", checkMethodologyScroll)

  // Check on load
  checkMethodologyScroll()

  // Add animation class to animated elements
  document.querySelectorAll(".animate").forEach((el) => {
    el.style.opacity = "1"
    el.style.transform = "translate(0)"
  })
})
