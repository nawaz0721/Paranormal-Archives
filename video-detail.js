document.addEventListener("DOMContentLoaded", () => {
  // Video player functionality
  const videoPlayer = document.querySelector(".video-player")
  const playIcon = videoPlayer.querySelector(".play-icon")

  if (playIcon) {
    playIcon.addEventListener("click", () => {
      // Check if this is a locked video
      if (videoPlayer.classList.contains("locked")) {
        // Open subscription modal
        const subscriptionModal = document.getElementById("subscription-modal")
        subscriptionModal.style.display = "flex"
        document.body.style.overflow = "hidden"
      } else {
        // Open video preview modal
        const videoModal = document.getElementById("video-preview-modal")
        videoModal.style.display = "flex"
        document.body.style.overflow = "hidden"

        // Play the video
        const video = videoModal.querySelector("video")
        video.play()
      }
    })
  }

  // Share button functionality
  const shareButton = document.querySelector(".action-btn:nth-child(1)")
  if (shareButton) {
    shareButton.addEventListener("click", () => {
      if (navigator.share) {
        navigator
          .share({
            title: "Hospital Apparition - Paranormal Archives",
            text: "Check out this chilling ghost footage captured at St. Mary's Hospital!",
            url: window.location.href,
          })
          .catch((error) => console.log("Error sharing:", error))
      } else {
        // Fallback for browsers that don't support Web Share API
        alert("Copy this link to share: " + window.location.href)
      }
    })
  }

  // Save button functionality
  const saveButton = document.querySelector(".action-btn:nth-child(2)")
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      // Toggle saved state
      if (this.classList.contains("saved")) {
        this.classList.remove("saved")
        this.innerHTML = '<i class="fas fa-bookmark"></i> Save'
        alert("Video removed from your saved list")
      } else {
        this.classList.add("saved")
        this.innerHTML = '<i class="fas fa-bookmark"></i> Saved'
        alert("Video added to your saved list")
      }
    })
  }

  // Download button functionality
  const downloadButton = document.querySelector(".action-btn:nth-child(3)")
  if (downloadButton) {
    downloadButton.addEventListener("click", () => {
      // Check if this is a locked video
      if (videoPlayer.classList.contains("locked")) {
        // Open subscription modal
        const subscriptionModal = document.getElementById("subscription-modal")
        subscriptionModal.style.display = "flex"
        document.body.style.overflow = "hidden"
      } else {
        alert("Download started. Your video will be available shortly.")
      }
    })
  }

  // Comment form functionality
  const commentForm = document.querySelector(".comment-form")
  if (commentForm) {
    commentForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const textarea = this.querySelector("textarea")
      if (textarea.value.trim() !== "") {
        alert("Comment submitted! It will appear after moderation.")
        textarea.value = ""
      }
    })
  }

  // Load more comments functionality
  const loadMoreButton = document.querySelector(".load-more button")
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      alert("Loading more comments functionality would be implemented here.")
    })
  }

  // Comment like functionality
  const likeButtons = document.querySelectorAll(".comment-actions button:first-child")
  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const likeCount = Number.parseInt(this.textContent.match(/\d+/)[0])
      const newCount = likeCount + 1
      this.innerHTML = `<i class="fas fa-thumbs-up"></i> ${newCount}`
    })
  })

  // Comment reply functionality
  const replyButtons = document.querySelectorAll(".comment-actions button:nth-child(2)")
  replyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const commentContent = this.closest(".comment-content")

      // Check if reply form already exists
      if (commentContent.querySelector(".reply-form")) {
        return
      }

      // Create reply form
      const replyForm = document.createElement("div")
      replyForm.className = "reply-form"
      replyForm.innerHTML = `
                <textarea placeholder="Write your reply..."></textarea>
                <div class="reply-actions">
                    <button class="btn primary-btn">Post Reply</button>
                    <button class="btn secondary-btn cancel-reply">Cancel</button>
                </div>
            `

      // Add reply form after comment actions
      this.closest(".comment-actions").after(replyForm)

      // Focus on textarea
      replyForm.querySelector("textarea").focus()

      // Add event listener to cancel button
      replyForm.querySelector(".cancel-reply").addEventListener("click", () => {
        replyForm.remove()
      })

      // Add event listener to post button
      replyForm.querySelector(".primary-btn").addEventListener("click", () => {
        const replyText = replyForm.querySelector("textarea").value.trim()
        if (replyText !== "") {
          alert("Reply submitted! It will appear after moderation.")
          replyForm.remove()
        }
      })
    })
  })
})
