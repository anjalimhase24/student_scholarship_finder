/* ════════════════════════════════════════
   forget.js — Forgot Password & OTP Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── FORGET PASSWORD FORM ── */
  const forgetForm = document.getElementById('forgetForm');
  if (forgetForm) {
    forgetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('forget-email').value.trim();
      const msg   = document.getElementById('forget-msg');
      const users = getUsers();
      const user  = users.find(u => u.email === email);

      if (!user) {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Email not registered! ❌';
        return;
      }
      // Generate OTP and save to sessionStorage
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      sessionStorage.setItem('reset_otp',   otp);
      sessionStorage.setItem('reset_email', email);

      msg.style.color = '#15803d';
      msg.textContent = `OTP sent! (Demo OTP: ${otp}) 📧`;
      showToast(`Demo OTP: ${otp}`, 'success');
      setTimeout(() => window.location.href = 'otp.html', 2200);
    });
  }

  /* ── OTP VERIFY FORM ── */
  const otpForm = document.getElementById('otpForm');
  if (otpForm) {
    otpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const digits  = document.querySelectorAll('.otp-d');
      const entered = Array.from(digits).map(d => d.value).join('');
      const saved   = sessionStorage.getItem('reset_otp') || '';
      const msg     = document.getElementById('otp-msg');

      if (entered === saved) {
        msg.style.color = '#15803d';
        msg.textContent = 'OTP Verified! Redirecting to login... ✔';
        showToast('OTP Verified Successfully! ✔', 'success');
        sessionStorage.removeItem('reset_otp');
        sessionStorage.removeItem('reset_email');
        setTimeout(() => window.location.href = 'login.html', 1500);
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Incorrect OTP ❌ Try again.';
        showToast('Incorrect OTP!', 'error');
      }
    });
  }
});

/* ── OTP BOX AUTO-FOCUS ── */
function otpNext(el, idx) {
  el.value = el.value.replace(/[^0-9]/g, '');
  const digits = document.querySelectorAll('.otp-d');
  if (el.value && idx < 3) digits[idx + 1].focus();
}
function otpBack(e, idx) {
  if (e.key === 'Backspace') {
    const digits = document.querySelectorAll('.otp-d');
    if (!digits[idx].value && idx > 0) digits[idx - 1].focus();
  }
}
