// Smooth scroll for anchor links to #section
// Applies to all <a href="#section"> links

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Optionally update hash in URL after scroll
        history.pushState(null, '', '#' + targetId);
      }
    });
  });
});
