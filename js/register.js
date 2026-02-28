/* ════════════════════════════════════════
   register.js — Registration Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-register');

  // Password match check
  const passEl  = document.getElementById('reg-pass');
  const cpassEl = document.getElementById('reg-cpass');
  const matchTxt = document.getElementById('match-txt');

  if (cpassEl) {
    cpassEl.addEventListener('input', () => {
      if (!cpassEl.value) { matchTxt.textContent = ''; return; }
      if (passEl.value === cpassEl.value) {
        matchTxt.style.color = '#15803d';
        matchTxt.textContent = '✔ Passwords matched';
      } else {
        matchTxt.style.color = '#b91c1c';
        matchTxt.textContent = '❌ Passwords do not match';
      }
    });
  }

  // Register form submit
  const form = document.getElementById('registerForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name  = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const pass  = passEl.value;
      const cpass = cpassEl.value;
      const msg   = document.getElementById('reg-msg');

      if (pass !== cpass) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Passwords do not match ❌';
        return;
      }
      let users = getUsers();
      if (users.find(u => u.email === email)) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Email already registered! ❌';
        return;
      }
      users.push({ name, email, password: pass, role: 'student' });
      saveUsers(users);
      msg.style.color = '#15803d';
      msg.textContent = 'Registration Successful! Redirecting... 🎉';
      showToast('Account created successfully! 🎉', 'success');
      setTimeout(() => {
        form.reset();
        window.location.href = 'login.html';
      }, 1500);
    });
  }
});
