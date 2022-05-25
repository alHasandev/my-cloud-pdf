function preventDigitalWebPiracy() {
  // Prevent user from opening context menu when clicking canvas
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    popup('Tidak dapat menggunakan klik kanan');
  });

  // Prevent user from 'hacking'
  // Handle keyboard shortcut
  document.addEventListener('keydown', (event) => {
    if (!(event.ctrlKey || event.altKey || event.shiftKey)) return false;
    event.preventDefault();
  });
  document.addEventListener('keyup', (event) => {
    if (event.altKey || event.ctrlKey || event.shiftKey) {
      if (event.code !== 'I' || event.key !== 'Shift') return false;
      event.preventDefault();
    }
  });
}