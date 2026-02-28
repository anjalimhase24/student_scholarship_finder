/* ════════════════════════════════════════
   db.js — Shared Data & Utilities
   Used by ALL pages
════════════════════════════════════════ */

// ── SCHOLARSHIP DATA ──────────────────
const SCHOLARSHIPS = [
  {id:'SCH1', name:'Pragati Scholarship',         badge:'Female Students',  el:'Girl students (Diploma / Degree)',  ben:'Fees + Books + Equipment support',      cat:'All Categories'},
  {id:'SCH2', name:'Saksham Scholarship',          badge:'Special-abled',    el:'Special-abled students',             ben:'₹50,000 per year support',              cat:'All Categories'},
  {id:'SCH3', name:'Merit-Cum-Means Scholarship',  badge:'Minority',         el:'Minority community students',        ben:'₹25,000 – ₹30,000 per year',           cat:'Minority'},
  {id:'SCH4', name:'National PG Scholarship',      badge:'Postgraduate',     el:'Postgraduate students',              ben:'₹1,50,000 per year',                    cat:'All Categories'},
  {id:'SCH5', name:'Top Class Education (Disability)', badge:'Disabled',     el:'Disabled students',                  ben:'Fee + Maintenance support',             cat:'All Categories'},
  {id:'SCH6', name:'Rajarshi Shahu Maharaj Scholarship', badge:'SC/Neo-Buddhist', el:'SC / Neo-Buddhist students',  ben:'Tuition fees for abroad study',         cat:'SC'},
  {id:'SCH7', name:'Post-Matric Scholarship',      badge:'SC/ST/OBC',        el:'SC/ST/OBC/VJNT/PwD students',        ben:'All Education Fees + Allowance',        cat:'SC/ST/OBC/VJNT'},
  {id:'SCH8', name:'Savitribai Phule Scholarship', badge:'Girls',            el:'Girls (5th–10th & College)',         ben:'Fee Support + Maintenance',             cat:'All Categories'},
];

// ── LOCAL STORAGE HELPERS ─────────────
function getUsers()      { return JSON.parse(localStorage.getItem('ss_users') || '[]'); }
function saveUsers(u)    { localStorage.setItem('ss_users', JSON.stringify(u)); }
function getApps()       { return JSON.parse(localStorage.getItem('ss_apps')  || '[]'); }
function saveApps(a)     { localStorage.setItem('ss_apps',  JSON.stringify(a)); }
function getCurrentUser(){ return localStorage.getItem('ss_current') || null; }
function setCurrentUser(e){ localStorage.setItem('ss_current', e); }
function clearCurrentUser(){ localStorage.removeItem('ss_current'); }

// ── SEED DEFAULT USERS ────────────────
(function seedData() {
  if (!localStorage.getItem('ss_users')) {
    saveUsers([
      { name: 'Admin User',   email: 'admin@gmail.com',   password: 'admin123', role: 'admin'   },
      { name: 'Student User', email: 'student@gmail.com', password: '12345',    role: 'student' },
    ]);
  }
  if (!localStorage.getItem('ss_apps')) {
    saveApps([
      { appId:'APP1700000001', userEmail:'student@gmail.com', name:'Rahul Patil',    gender:'Male',   dob:'2002-06-15', aadhar:'123456789012', cat:'OBC', course:'Engineering', year:'2024-25', college:'Pune Institute of Technology', income:'₹1,00,000 - ₹2,50,000', schName:'Post-Matric Scholarship',       acc:'9876543210', ifsc:'SBIN0012345', addr:'Pune, Maharashtra',       status:'Pending',  appliedDate:'01/01/2025, 10:00:00 AM' },
      { appId:'APP1700000002', userEmail:'student@gmail.com', name:'Priya Deshmukh', gender:'Female', dob:'2001-03-22', aadhar:'987654321098', cat:'SC',  course:'MCA',         year:'2024-25', college:'Aurangabad University',        income:'Below ₹1,00,000',       schName:'Savitribai Phule Scholarship',  acc:'1122334455', ifsc:'BANK0001122', addr:'Aurangabad, Maharashtra', status:'Approved', appliedDate:'15/01/2025, 2:30:00 PM'  },
    ]);
  }
})();

// ── TOAST ─────────────────────────────
function showToast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'toast ' + type + ' show';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
}

// ── SCHOLARSHIP CARD HTML ─────────────
function schCardHTML(s, linkPrefix = '') {
  return `<div class="sch-card">
    <span class="sch-badge">${s.badge}</span>
    <h3>${s.name}</h3>
    <div class="sch-row"><span>👤</span><span>${s.el}</span></div>
    <div class="sch-row"><span>💰</span><span>${s.ben}</span></div>
    <button class="sch-apply-btn" onclick="openModal('${s.id}')">View &amp; Apply →</button>
  </div>`;
}

// ── MODAL ─────────────────────────────
let _modalSchId = '';
function openModal(id) {
  const s = SCHOLARSHIPS.find(x => x.id === id);
  if (!s) return;
  _modalSchId = id;
  document.getElementById('m-title').textContent = s.name;
  document.getElementById('m-el').textContent    = s.el;
  document.getElementById('m-ben').textContent   = s.ben;
  document.getElementById('m-cat').textContent   = s.cat;
  document.getElementById('schModal').classList.add('open');
}
function closeModal() {
  document.getElementById('schModal').classList.remove('open');
}

// ── NAVBAR ACTIVE LINK ────────────────
function setNavActive(id) {
  document.querySelectorAll('.navbar nav a').forEach(a => a.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('schModal');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
});
