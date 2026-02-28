/* ════════════════════════════════════════
   scholarship.js — Scholarship Page Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-scholarships');

  // Render all scholarship cards
  const grid = document.getElementById('schPageGrid');
  if (grid) grid.innerHTML = SCHOLARSHIPS.map(s => schCardHTML(s)).join('');

  // Modal apply button
  const modalApplyBtn = document.getElementById('modal-apply-btn');
  if (modalApplyBtn) {
    modalApplyBtn.addEventListener('click', () => {
      closeModal();
      if (!getCurrentUser()) {
        showToast('Please login first to apply! 🔐', 'error');
        window.location.href = 'login.html';
        return;
      }
      sessionStorage.setItem('selectedSchId', _modalSchId);
      window.location.href = 'apply.html';
    });
  }
});
