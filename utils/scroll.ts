export function scrollToWaitlist() {
  const waitlistSection = document.getElementById('waitlist')
  if (waitlistSection) {
    waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Focus on the first input after scrolling
    setTimeout(() => {
      const nameInput = document.getElementById('name') as HTMLInputElement
      if (nameInput) {
        nameInput.focus()
      }
    }, 500)
  }
}

export function scrollToFeatures() {
  const featuresSection = document.getElementById('features')
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

