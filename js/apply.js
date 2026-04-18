/* ════════════════════════════════════════
   apply.js — Scholarship Application Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Guard: must be logged in
  const cu = getCurrentUser();
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
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const appId = 'APP' + Date.now();
      const app = {
        appId,
        userEmail : cu,
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

      let apps = getApps();
      apps.push(app);
      saveApps(apps);

      // Save appId for confirm page
      sessionStorage.setItem('lastAppId', appId);

      form.reset();
      showToast('Application submitted! 🚀', 'success');
      window.location.href = 'confirm.html';
    });
  }
});
import { auth, db } from "../firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
 
const form  = document.getElementById("applyForm");
const msgEl = document.getElementById("formMsg");
 
// Check if user is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Application submit करण्यासाठी आधी login करा!");
    window.location.href = "login.html";
  }
});
 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const user = auth.currentUser;
  if (!user) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
    return;
  }
 
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Submitting...";
 
  // Form मधील सर्व values collect करा
  const applicationData = {
    userId:           user.uid,
    userEmail:        user.email,
 
    // Personal Details
    fullName:         document.getElementById("fullName").value.trim(),
    gender:           document.getElementById("gender").value,
    dob:              document.getElementById("dob").value,
    aadharNumber:     document.getElementById("aadharNumber").value.trim(),
    category:         document.getElementById("category").value,
 
    // Education Details
    course:           document.getElementById("course").value,
    academicYear:     document.getElementById("academicYear").value,
    collegeName:      document.getElementById("collegeName").value.trim(),
    annualIncome:     document.getElementById("annualIncome").value,
 
    // Scholarship Details
    scholarshipName:  document.getElementById("scholarshipName").value,
 
    // Bank Details
    accountNumber:    document.getElementById("accountNumber").value.trim(),
    ifscCode:         document.getElementById("ifscCode").value.trim().toUpperCase(),
 
    // Address
    address:          document.getElementById("address").value.trim(),
 
    // System fields
    status:           "Pending",
    appliedAt:        serverTimestamp()
  };
 
  try {
    const docRef = await addDoc(collection(db, "applications"), applicationData);
 
    showMsg("Application successfully submit झाली! 🎉", "success");
    form.reset();
 
    setTimeout(() => {
      window.location.href = "applications.html";
    }, 2000);
 
  } catch (err) {
    console.error("Error:", err);
    showMsg("Error: " + err.message, "error");
    btn.disabled = false;
    btn.textContent = "Submit Application 🚀";
  }
});
 
function showMsg(text, type) {
  msgEl.textContent = text;
  msgEl.style.display = "block";
  msgEl.style.padding = "10px";
  msgEl.style.borderRadius = "6px";
  msgEl.style.marginTop = "15px";
  msgEl.style.fontWeight = "bold";
  if (type === "success") {
    msgEl.style.background = "#d4edda";
    msgEl.style.color = "#155724";
    msgEl.style.border = "1px solid #c3e6cb";
  } else {
    msgEl.style.background = "#f8d7da";
    msgEl.style.color = "#721c24";
    msgEl.style.border = "1px solid #f5c6cb";
  }
}