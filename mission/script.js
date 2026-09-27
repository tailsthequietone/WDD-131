document.addEventListener('DOMContentLoaded', () => {
  const modeSelect = document.getElementById('mode-select');

  modeSelect.addEventListener('change', (event) => {
    const selectedMode = event.target.value;

    if (selectedMode === 'dark') {
      document.body.classList.add('dark-mode');
    } else if (selectedMode === 'light') {
      document.body.classList.remove('dark-mode');
    }
  });
});