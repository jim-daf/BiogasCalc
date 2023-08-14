
const scrollToTopButton = document.getElementById('scrollToTopBtn');

// Show the button when the user scrolls down
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Scroll to top when the button is clicked
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});