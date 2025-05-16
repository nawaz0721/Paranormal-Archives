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

  // File upload functionality
  const fileInput = document.getElementById("file")
  const fileList = document.querySelector(".file-list")

  if (fileInput && fileList) {
    fileInput.addEventListener("change", function () {
      fileList.innerHTML = ""

      if (this.files.length > 0) {
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i]
          const fileItem = document.createElement("div")
          fileItem.className = "file-item"

          // Determine file icon based on type
          let fileIcon = "fa-file"
          if (file.type.startsWith("image/")) {
            fileIcon = "fa-file-image"
          } else if (file.type.startsWith("video/")) {
            fileIcon = "fa-file-video"
          } else if (file.type.startsWith("audio/")) {
            fileIcon = "fa-file-audio"
          }

          // Format file size
          const fileSize = file.size
          let fileSizeFormatted = ""
          if (fileSize < 1024) {
            fileSizeFormatted = fileSize + " B"
          } else if (fileSize < 1024 * 1024) {
            fileSizeFormatted = (fileSize / 1024).toFixed(1) + " KB"
          } else {
            fileSizeFormatted = (fileSize / (1024 * 1024)).toFixed(1) + " MB"
          }

          fileItem.innerHTML = `
            <div class="file-item-name">
              <i class="fas ${fileIcon}"></i>
              <span>${file.name}</span>
              <small>(${fileSizeFormatted})</small>
            </div>
            <button type="button" class="file-item-remove">
              <i class="fas fa-times"></i>
            </button>
          `

          fileList.appendChild(fileItem)

          // Add remove functionality
          const removeButton = fileItem.querySelector(".file-item-remove")
          removeButton.addEventListener("click", () => {
            fileItem.remove()
            // Note: This doesn't actually remove the file from the input
            // In a real implementation, you would need to create a new FileList
          })
        }
      }
    })

    // Drag and drop functionality
    const fileUpload = document.querySelector(".file-upload")
    ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      fileUpload.addEventListener(eventName, preventDefaults, false)
    })

    function preventDefaults(e) {
      e.preventDefault()
      e.stopPropagation()
    }
    ;["dragenter", "dragover"].forEach((eventName) => {
      fileUpload.addEventListener(eventName, highlight, false)
    })
    ;["dragleave", "drop"].forEach((eventName) => {
      fileUpload.addEventListener(eventName, unhighlight, false)
    })

    function highlight() {
      fileUpload.classList.add("highlight")
    }

    function unhighlight() {
      fileUpload.classList.remove("highlight")
    }

    fileUpload.addEventListener("drop", handleDrop, false)

    function handleDrop(e) {
      const dt = e.dataTransfer
      const files = dt.files
      fileInput.files = files

      // Trigger change event
      const event = new Event("change")
      fileInput.dispatchEvent(event)
    }
  }

  // Contact form submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Show success message
      alert("Thank you for your message! We will get back to you soon.")

      // Reset form
      this.reset()
      if (fileList) {
        fileList.innerHTML = ""
      }
    })
  }

  // Live chat button
  const chatButton = document.querySelector(".contact-method .btn")
  if (chatButton) {
    chatButton.addEventListener("click", () => {
      alert("Live chat functionality would be implemented here.")
    })
  }

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector('input[type="email"]')
      if (emailInput.value) {
        alert("Thank you for subscribing to our newsletter!")
        emailInput.value = ""
      }
    })
  }
})
