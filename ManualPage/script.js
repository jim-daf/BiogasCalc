
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


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("downArrow").addEventListener("click", function() {
        var calcCategories = document.getElementById("calcCategories");
        calcCategories.style.maxHeight = calcCategories.scrollHeight + "px";
        calcCategories.style.visibility = "visible";
        document.getElementById("downArrow").style.display = "none";
        document.getElementById("upArrow").style.display="block"
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("upArrow").addEventListener("click", function() {
        var calcCategories = document.getElementById("calcCategories");
        calcCategories.style.maxHeight = 0;
        calcCategories.style.visibility = "hidden";
        document.getElementById("downArrow").style.display= "block";
        document.getElementById("upArrow").style.display="none"
    });
});