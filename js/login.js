/* ════════════════════════════════════════
   login.js — Login Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-login');

  // If already logged in, redirect
  const cu = getCurrentUser();
  if (cu) {
    const users = getUsers();
    const user = users.find(u => u.email === cu);
    if (user && user.role === 'admin') window.location.href = 'admin.html';
    else window.location.href = 'applications.html';
    return;
  }

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('log-email').value.trim();
      const pass  = document.getElementById('log-pass').value;
      const msg   = document.getElementById('log-msg');
      const users = getUsers();
      const user  = users.find(u => u.email === email && u.password === pass);

      if (user) {
        setCurrentUser(email);
        msg.style.color = '#15803d';
        msg.textContent = `Welcome back, ${user.name}! 🎉`;
        showToast(`Welcome back, ${user.name}! 👋`, 'success');
        setTimeout(() => {
          form.reset();
          if (user.role === 'admin') window.location.href = 'admin.html';
          else window.location.href = 'applications.html';
        }, 1400);
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Invalid Email or Password ❌';
        showToast('Login failed. Check credentials.', 'error');
      }
    });
  }
});
