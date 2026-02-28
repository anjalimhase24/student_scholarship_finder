/* ════════════════════════════════════════
   my-applications.js — Student App History
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-myapps');

  const cu    = getCurrentUser();
  const tbody = document.getElementById('myAppTbody');
  const empty = document.getElementById('emptyState');

  if (!cu) {
    if (tbody) tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:#9aaabe;">
      Please <a href="login.html" style="color:#f5a623;font-weight:700;">login</a> to view your applications.
    </td></tr>`;
    return;
  }

  const apps = getApps().filter(a => a.userEmail === cu);

  if (!apps.length) {
    if (tbody) tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:#9aaabe;">
      No applications yet. <a href="scholarship.html" style="color:#f5a623;font-weight:700;">Apply Now →</a>
    </td></tr>`;
    return;
  }

  if (empty) empty.style.display = 'none';

  if (tbody) {
    tbody.innerHTML = apps.map((a, i) => `
      <tr>
        <td>${i + 1}</td>
        <td style="font-weight:700;font-size:0.8rem;color:#0a1628;">${a.appId}</td>
        <td>${a.schName}</td>
        <td>${a.year}</td>
        <td>${a.cat}</td>
        <td><span class="sbadge ${a.status}">${a.status}</span></td>
        <td style="font-size:0.82rem;">${a.appliedDate}</td>
      </tr>`).join('');
  }
});
