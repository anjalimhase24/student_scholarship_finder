/* ════════════════════════════════════════
   home.js — Home Page Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-home');

  // Render scholarship preview grid
  const grid = document.getElementById('homeSchGrid');
  if (grid) grid.innerHTML = SCHOLARSHIPS.map(s => schCardHTML(s)).join('');

  // Modal apply button → check login then go apply
  const modalApplyBtn = document.getElementById('modal-apply-btn');
  if (modalApplyBtn) {
    modalApplyBtn.addEventListener('click', () => {
      closeModal();
      if (!getCurrentUser()) {
        showToast('Please login first to apply! 🔐', 'error');
        window.location.href = 'pages/login.html';
        return;
      }
      // Pass selected scholarship to apply page via sessionStorage
      sessionStorage.setItem('selectedSchId', _modalSchId);
      window.location.href = 'pages/apply.html';
    });
  }
});
