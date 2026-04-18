/* ════════════════════════════════════════
   apply.js — Scholarship Application Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Guard: must be logged in
  const cu = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!cu) {
    showToast('Please login first! 🔐', 'error');
    window.location.href = 'login.html';
    return;
  }

  // Pre-select scholarship if coming from modal
  const selSchId = sessionStorage.getItem('selectedSchId');
  if (selSchId) {
    const sch = SCHOLARSHIPS.find(s => s.id === selSchId);
    if (sch) {
      const sel = document.getElementById('a-schname');
      if (sel) {
        for (let o of sel.options) {
          if (o.text === sch.name) { o.selected = true; break; }
        }
      }
    }
    sessionStorage.removeItem('selectedSchId');
  }

  // Submit application
  const form = document.getElementById('applyForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const appId = 'APP' + Date.now();
      const app = {
        appId,
        userEmail : cu.email,
        name      : document.getElementById('a-name').value,
        gender    : document.getElementById('a-gender').value,
        dob       : document.getElementById('a-dob').value,
        aadhar    : document.getElementById('a-aadhar').value,
        cat       : document.getElementById('a-cat').value,
        course    : document.getElementById('a-course').value,
        year      : document.getElementById('a-year').value,
        college   : document.getElementById('a-college').value,
        income    : document.getElementById('a-income').value,
        schName   : document.getElementById('a-schname').value,
        acc       : document.getElementById('a-acc').value,
        ifsc      : document.getElementById('a-ifsc').value,
        addr      : document.getElementById('a-addr').value,
        status    : 'Pending',
        appliedDate: new Date().toLocaleString(),
      };

      try {
        const response = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(app)
        });
        const data = await response.json();

        if (data.success) {
          // Save appId for confirm page
          sessionStorage.setItem('lastAppId', appId);

          form.reset();
          showToast('Application submitted! 🚀', 'success');
          window.location.href = 'confirm.html';
        } else {
          showToast('Error submitting application.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showToast('Network error.', 'error');
      }
    });
  }
});