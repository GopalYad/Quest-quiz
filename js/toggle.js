// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggle');
  const sunImg = document.querySelector('.sun__img img');
  const moonImg = document.querySelector('.moon__img img');
  
  // Set initial theme based on user preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleSwitch.checked = true;
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    sunImg.src = './assets/icon-sun-light.svg';
    moonImg.src = './assets/icon-moon-light.svg';
  }
  
  // Set icon sources
  updateThemeIcons();
  
  // Listen for theme changes
  toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
    updateThemeIcons();
  });
  
  // Update icon sources based on current theme
  function updateThemeIcons() {
    if (document.documentElement.hasAttribute('data-theme')) {
      sunImg.src = './assets/icon-sun-light.svg';
      moonImg.src = './assets/icon-moon-light.svg';
    } else {
      sunImg.src = './assets/icon-sun-dark.svg';
      moonImg.src = './assets/icon-moon-dark.svg';
    }
  }
});

