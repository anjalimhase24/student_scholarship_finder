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
import { auth, db } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { collection, query, where, orderBy, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
 
const tableBody = document.getElementById("applicationsTableBody");
const noDataMsg = document.getElementById("noDataMsg");
 
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }
 
  // Logged-in user चे applications load करा
  await loadApplications(user.uid);
});
 
async function loadApplications(userId) {
  tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;">Loading...</td></tr>`;
 
  try {
    const q = query(
      collection(db, "applications"),
      where("userId", "==", userId),
      orderBy("appliedAt", "desc")
    );
 
    const snapshot = await getDocs(q);
 
    if (snapshot.empty) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:#888;">
        कोणतीही application नाही. <a href="apply.html">Apply Now →</a>
      </td></tr>`;
      return;
    }
 
    tableBody.innerHTML = "";
 
    let sr = 1;
    snapshot.forEach((docSnap) => {
      const app = docSnap.data();
      const appId = docSnap.id.substring(0, 8).toUpperCase(); // Short ID
      
      // Date format
      let appliedDate = "-";
      if (app.appliedAt) {
        const d = app.appliedAt.toDate();
        appliedDate = d.toLocaleDateString("en-IN", {
          day: "2-digit", month: "short", year: "numeric"
        });
      }
 
      // Status badge color
      const statusColors = {
        "Pending":  "background:#fff3cd;color:#856404;",
        "Approved": "background:#d4edda;color:#155724;",
        "Rejected": "background:#f8d7da;color:#721c24;",
        "Under Review": "background:#cce5ff;color:#004085;"
      };
      const statusStyle = statusColors[app.status] || "background:#e2e3e5;color:#383d41;";
 
      const row = `
        <tr>
          <td style="text-align:center;">${sr++}</td>
          <td style="font-family:monospace;font-size:12px;">#${appId}</td>
          <td>${app.scholarshipName || "-"}</td>
          <td>${app.academicYear || "-"}</td>
          <td>${app.category || "-"}</td>
          <td>
            <span style="padding:3px 10px;border-radius:20px;font-size:12px;font-weight:600;${statusStyle}">
              ${app.status}
            </span>
          </td>
          <td>${appliedDate}</td>
        </tr>
      `;
      tableBody.innerHTML += row;
    });
 
  } catch (err) {
    console.error("Error loading applications:", err);
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:red;padding:20px;">
      Error loading data: ${err.message}
    </td></tr>`;
  }
}