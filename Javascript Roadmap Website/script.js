// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// Load Theme on Startup
document.body.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

// Progress Tracker
const checkboxes = document.querySelectorAll('.progress-check');
const progressFill = document.getElementById('progress-fill');
const progressPercentage = document.getElementById('progress-percentage');

function updateProgress() {
  const total = checkboxes.length;
  const completed = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
  const percentage = Math.round((completed / total) * 100);
  progressFill.style.width = `${percentage}%`;
  progressPercentage.textContent = `${percentage}% Completed`;

  // Save progress in localStorage
  const progressData = Array.from(checkboxes).map((checkbox) => checkbox.checked);
  localStorage.setItem('progress', JSON.stringify(progressData));
}

// Load Progress on Startup
const savedProgress = JSON.parse(localStorage.getItem('progress')) || [];
checkboxes.forEach((checkbox, index) => {
  checkbox.checked = savedProgress[index] || false;
});

// Add Event Listeners
checkboxes.forEach((checkbox) => checkbox.addEventListener('change', updateProgress));

// Initialize Progress
updateProgress();
