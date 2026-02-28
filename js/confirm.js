/* ════════════════════════════════════════
   confirm.js — Application Confirmation
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const appId = sessionStorage.getItem('lastAppId') || 'APP-UNKNOWN';
  const el = document.getElementById('confirm-appid');
  if (el) el.textContent = appId;
  sessionStorage.removeItem('lastAppId');
});
