/* ════════════════════════════════════════
   admin.js — Admin Dashboard Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-admin');

  // Guard: admin only
  const cu    = getCurrentUser();
  const users = getUsers();
  const user  = users.find(u => u.email === cu);

  if (!cu || !user || user.role !== 'admin') {
    const tbody = document.getElementById('adminTbody');
    if (tbody) tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:40px;color:#9aaabe;">
      ⚠️ Admin access required. <a href="login.html" style="color:#f5a623;font-weight:700;">Login as Admin</a>
    </td></tr>`;
    return;
  }

  renderAdmin();

  const filterSel = document.getElementById('filterStatus');
  if (filterSel) filterSel.addEventListener('change', renderAdmin);
});

function renderAdmin() {
  const filter = document.getElementById('filterStatus')
    ? document.getElementById('filterStatus').value : 'All';

  let apps = getApps();
  if (filter !== 'All') apps = apps.filter(a => a.status === filter);

  const countEl = document.getElementById('admin-count');
  if (countEl) countEl.textContent = `Showing ${apps.length} application(s)`;

  // Update statistics
  const allApps = getApps();
  const totalEl = document.getElementById('total-apps');
  const pendingEl = document.getElementById('pending-apps');
  const approvedEl = document.getElementById('approved-apps');
  const rejectedEl = document.getElementById('rejected-apps');

  if (totalEl) totalEl.textContent = allApps.length;
  if (pendingEl) pendingEl.textContent = allApps.filter(a => a.status === 'Pending').length;
  if (approvedEl) approvedEl.textContent = allApps.filter(a => a.status === 'Approved').length;
  if (rejectedEl) rejectedEl.textContent = allApps.filter(a => a.status === 'Rejected').length;

  const tbody = document.getElementById('adminTbody');
  if (!tbody) return;

  if (!apps.length) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:40px;color:#9aaabe;">No applications found.</td></tr>`;
    return;
  }

  tbody.innerHTML = apps.map((a, i) => `
    <tr id="row-${a.appId}">
      <td>${i + 1}</td>
      <td style="font-weight:700;font-size:0.78rem;">${a.appId}</td>
      <td>${a.name}</td>
      <td style="font-size:0.82rem;">${a.userEmail}</td>
      <td>${a.schName}</td>
      <td>${a.year}</td>
      <td>${a.cat}</td>
      <td><span class="sbadge ${a.status}">${a.status}</span></td>
      <td>
        <button class="act-btn act-approve" onclick="adminAction('${a.appId}','Approved')">✔ Approve</button>
        <button class="act-btn act-reject"  onclick="adminAction('${a.appId}','Rejected')">✖ Reject</button>
        <button class="act-btn act-delete"  onclick="adminDelete('${a.appId}')">🗑 Delete</button>
      </td>
    </tr>`).join('');
}

function adminAction(appId, status) {
  let apps = getApps();
  const app = apps.find(a => a.appId === appId);
  if (app) {
    app.status = status;
    saveApps(apps);
    renderAdmin();
    showToast(`Application ${status} ✔`, 'success');
  }
}

function adminDelete(appId) {
  if (!confirm('Delete this application permanently?')) return;
  let apps = getApps().filter(a => a.appId !== appId);
  saveApps(apps);
  renderAdmin();
  showToast('Application deleted.', 'error');
}
