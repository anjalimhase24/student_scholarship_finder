/* ════════════════════════════════════════
   login.js — Login Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-login');

  // If already logged in, redirect
  const cu = localStorage.getItem('currentUser');
  if (cu) {
    const user = JSON.parse(cu);
    if (user.role === 'admin') window.location.href = 'admin.html';
    else window.location.href = 'applications.html';
    return;
  }

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('log-email').value.trim();
      const pass  = document.getElementById('log-pass').value;
      const msg   = document.getElementById('log-msg');

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password: pass })
        });
        const data = await response.json();

        if (data.success) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          msg.style.color = '#15803d';
          msg.textContent = `Welcome back, ${data.user.name}! 🎉`;
          showToast(`Welcome back, ${data.user.name}! 👋`, 'success');
          setTimeout(() => {
            form.reset();
            if (data.user.role === 'admin') window.location.href = 'admin.html';
            else window.location.href = 'applications.html';
          }, 1400);
        } else {
          msg.style.color = '#b91c1c';
          msg.textContent = data.message || 'Invalid Email or Password ❌';
          showToast('Login failed. Check credentials.', 'error');
        }
      } catch (error) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Login failed. Try again. ❌';
        showToast('Network error.', 'error');
      }
    });
  }
});
