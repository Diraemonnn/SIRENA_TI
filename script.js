document.addEventListener("DOMContentLoaded", () => {
  // Registration status configuration
  const registrationConfig = {
    isActive: true, // Set to true to activate registration
    startDate: "2025-07-01",
    endDate: "2025-07-31",
  }

  // Initialize registration status
  initializeRegistrationStatus()

  function initializeRegistrationStatus() {
    const statusBanner = document.getElementById("registrationStatus")
    const statusText = document.getElementById("statusText")
    const daftarBtns = document.querySelectorAll("#daftarBtn, #daftarBtn2")

    if (registrationConfig.isActive) {
      if (statusBanner) {
        statusBanner.className = "registration-status active"
        statusText.innerHTML = '<i class="fas fa-check-circle"></i> Pendaftaran sedang berlangsung'
      }

      daftarBtns.forEach((btn) => {
        btn.classList.remove("disabled")
        btn.href = "pendaftaran.html"
      })
    } else {
      if (statusBanner) {
        statusBanner.className = "registration-status inactive"
        statusText.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Pendaftaran belum dimulai'
      }

      daftarBtns.forEach((btn) => {
        btn.classList.add("disabled")
        btn.href = "#"
        btn.addEventListener("click", (e) => {
          e.preventDefault()
          window.location.href = "tidak-aktif.html"
        })
      })
    }
  }

  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active")

      if (nav.classList.contains("active")) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>'
      } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }
    })
  }

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (nav && menuToggle) {
      const isClickInsideMenu = nav.contains(event.target)
      const isClickOnToggle = menuToggle.contains(event.target)

      if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains("active")) {
        nav.classList.remove("active")
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
      }
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })

        // Close mobile menu after clicking a link
        if (nav && nav.classList.contains("active")) {
          nav.classList.remove("active")
          if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>'
          }
        }
      }
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav ul li a")

  if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener("scroll", () => {
      let current = ""

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight

        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })

      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  }

  // Accordion functionality
  const accordionButtons = document.querySelectorAll(".accordion-button")

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active")

      const content = this.nextElementSibling

      if (this.classList.contains("active")) {
        content.style.maxHeight = content.scrollHeight + "px"
      } else {
        content.style.maxHeight = "0"
      }

      // Close other accordion items
      accordionButtons.forEach((otherButton) => {
        if (otherButton !== this) {
          otherButton.classList.remove("active")
          otherButton.nextElementSibling.style.maxHeight = "0"
        }
      })
    })
  })

  // Enhanced notification system with better error handling
  function showNotification(message, type = "success", duration = 5000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll(".notification")
    existingNotifications.forEach((notification) => notification.remove())

    const notification = document.createElement("div")
    notification.className = `notification ${type}`

    const icon = type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"
    notification.innerHTML = `<i class="${icon}"></i>${message}`

    document.body.appendChild(notification)

    // Show notification
    setTimeout(() => {
      notification.classList.add("show")
    }, 100)

    // Hide notification after duration
    setTimeout(() => {
      notification.classList.remove("show")
      setTimeout(() => {
        notification.remove()
      }, 300)
    }, duration)
  }

  // Enhanced error display with attention-grabbing pop-up
  function showErrorPopup(errors) {
    // Remove existing error popup
    const existingPopup = document.querySelector(".error-popup-overlay")
    if (existingPopup) {
      existingPopup.remove()
    }

    if (errors.length === 0) return

    // Create overlay
    const overlay = document.createElement("div")
    overlay.className = "error-popup-overlay"

    // Create popup
    const popup = document.createElement("div")
    popup.className = "error-popup"

    const errorCount = errors.length
    const errorText = errorCount === 1 ? "kesalahan" : "kesalahan"

    let errorHTML = `
      <div class="error-popup-header">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Terdapat ${errorCount} ${errorText} pada form!</h3>
      </div>
      <div class="error-popup-content">
        <p>Mohon perbaiki kesalahan berikut:</p>
        <ul>
    `

    errors.forEach((error) => {
      errorHTML += `<li><i class="fas fa-times-circle"></i> ${error}</li>`
    })

    errorHTML += `
        </ul>
      </div>
      <div class="error-popup-footer">
        <button class="btn-close-popup">Tutup</button>
      </div>
    `

    popup.innerHTML = errorHTML
    overlay.appendChild(popup)
    document.body.appendChild(overlay)

    // Add event listeners
    const closeBtn = popup.querySelector(".btn-close-popup")
    closeBtn.addEventListener("click", () => {
      overlay.remove()
    })

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.remove()
      }
    })

    // Show popup with animation
    setTimeout(() => {
      overlay.classList.add("show")
    }, 100)
  }

  // Toggle buttons functionality
  const toggleButtons = document.querySelectorAll(".toggle-btn")
  const nimGroup = document.getElementById("nimGroup")
  const prodiGroup = document.getElementById("prodiGroup")
  const nimInput = document.getElementById("nim")
  const prodiSelect = document.getElementById("prodi")

  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      toggleButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const value = this.getAttribute("data-value")

      if (value === "yes") {
        if (nimGroup) nimGroup.style.display = "block"
        if (prodiGroup) prodiGroup.style.display = "none"
        if (nimInput) nimInput.required = true
        if (prodiSelect) prodiSelect.required = false
      } else {
        if (nimGroup) nimGroup.style.display = "none"
        if (prodiGroup) prodiGroup.style.display = "block"
        if (nimInput) nimInput.required = false
        if (prodiSelect) prodiSelect.required = true
      }
    })
  })

  // File upload functionality
  const fileUploadArea = document.getElementById("fileUploadArea")
  const proofFile = document.getElementById("proofFile")
  const fileInfo = document.getElementById("fileInfo")

  if (fileUploadArea && proofFile) {
    fileUploadArea.addEventListener("click", () => {
      proofFile.click()
    })

    proofFile.addEventListener("change", function () {
      if (this.files[0]) {
        const file = this.files[0]
        const fileSize = file.size / 1024 / 1024 // in MB

        // Validate file size (5MB max)
        if (fileSize > 5) {
          showNotification("Ukuran file terlalu besar. Maksimal 5MB.", "error")
          this.value = ""
          fileInfo.style.display = "none"
          return
        }

        // Validate file type
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
        if (!validTypes.includes(file.type)) {
          showNotification("Format file tidak didukung. Gunakan JPG, PNG, atau PDF.", "error")
          this.value = ""
          fileInfo.style.display = "none"
          return
        }

        // Show file info
        fileInfo.innerHTML = `
          <i class="fas fa-file"></i>
          <strong>${file.name}</strong> (${(fileSize).toFixed(2)} MB)
        `
        fileInfo.style.display = "block"

        // Update upload area
        fileUploadArea.innerHTML = `
          <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
          <p style="color: var(--success-color);">File berhasil dipilih</p>
          <small>Klik untuk mengganti file</small>
        `
      }
    })
  }

  // Enhanced form validation and submission
  const registrationForm = document.getElementById("registrationForm")

  if (registrationForm) {
    // Perbaikan: Gunakan direct form submission dengan action ke sukses.html
    registrationForm.setAttribute("action", "sukses.html")

    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault() // Tetap mencegah default untuk validasi kustom

      // Clear previous errors
      const existingErrorList = document.querySelector(".error-list")
      if (existingErrorList) {
        existingErrorList.remove()
      }

      const errors = []

      // Get form values
      const fullName = document.getElementById("fullName").value.trim()
      const hasNim = document.querySelector(".toggle-btn.active").getAttribute("data-value")
      const nim = document.getElementById("nim").value.trim()
      const prodi = document.getElementById("prodi").value
      const email = document.getElementById("email").value.trim()
      const whatsapp = document.getElementById("whatsapp").value.trim()
      const proofFile = document.getElementById("proofFile").files[0]
      const agreement = document.getElementById("agreement").checked

      // Validate full name
      if (!fullName) {
        errors.push("Nama lengkap harus diisi")
      } else if (fullName.length < 3) {
        errors.push("Nama lengkap minimal 3 karakter")
      }

      // Validate NIM or Program Study
      if (hasNim === "yes") {
        if (!nim) {
          errors.push("NIM harus diisi")
        } else if (!/^\d{10}$/.test(nim)) {
          errors.push("NIM harus terdiri dari 10 digit angka")
        }
      } else {
        if (!prodi) {
          errors.push("Program studi harus dipilih")
        }
      }

      // Validate email
      if (!email) {
        errors.push("Email harus diisi")
      } else {
        const emailRegex = /^[^\s@]+@student\.undiksha\.ac\.id$/
        if (!emailRegex.test(email)) {
          errors.push("Email harus menggunakan domain @student.undiksha.ac.id")
        }
      }

      // Validate WhatsApp
      if (!whatsapp) {
        errors.push("Nomor WhatsApp harus diisi")
      } else {
        const whatsappRegex = /^[0-9]{10,15}$/
        if (!whatsappRegex.test(whatsapp.replace(/\D/g, ""))) {
          errors.push("Nomor WhatsApp harus berisi 10-15 digit angka")
        }
      }

      // Validate file
      if (!proofFile) {
        errors.push("Bukti penerimaan mahasiswa harus diupload")
      }

      // Validate agreement
      if (!agreement) {
        errors.push("Anda harus menyetujui syarat dan ketentuan")
      }

      // Show errors if any
      if (errors.length > 0) {
        showErrorPopup(errors)
        showNotification(`Terdapat ${errors.length} kesalahan pada form`, "error", 3000)
        return
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...'
      submitBtn.disabled = true

      // Store selected program for success page
      const selectedProdi = hasNim === "yes" ? "unknown" : prodi
      localStorage.setItem("selectedProdi", selectedProdi)
      localStorage.setItem("studentName", fullName)

      // PERBAIKAN: Redirect langsung ke sukses.html setelah validasi berhasil
      setTimeout(() => {
        window.location.href = "sukses.html"
      }, 1500)
    })
  }

  // Success page functionality
  if (window.location.pathname.includes("sukses.html")) {
    // Add entrance animation to WhatsApp buttons
    const whatsappButtons = document.querySelectorAll(".btn-whatsapp, .btn-whatsapp-main")

    whatsappButtons.forEach((button, index) => {
      // Add animation with delay based on index
      setTimeout(
        () => {
          button.classList.add("animate-in")
        },
        300 + index * 150,
      )

      // Add pulse animation on hover
      button.addEventListener("mouseenter", () => {
        button.classList.add("pulse")
      })

      button.addEventListener("mouseleave", () => {
        button.classList.remove("pulse")
      })

      // Add click animation
      button.addEventListener("click", (e) => {
        button.classList.add("clicked")
        setTimeout(() => {
          button.classList.remove("clicked")
        }, 300)
      })
    })

    const selectedProdi = localStorage.getItem("selectedProdi")
    const studentName = localStorage.getItem("studentName")

    if (studentName) {
      const namePlaceholder = document.getElementById("studentName")
      if (namePlaceholder) {
        namePlaceholder.textContent = studentName
      }
      localStorage.removeItem("studentName")
    }

    // Clear stored data
    localStorage.removeItem("selectedProdi")
  }
})
