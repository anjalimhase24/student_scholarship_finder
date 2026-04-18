/* ════════════════════════════════════════
   db.js — Shared Data & Utilities
   Used by ALL pages
════════════════════════════════════════ */

// ── SCHOLARSHIP DATA ──────────────────
const SCHOLARSHIPS = [{ id: 'SCH1', name: 'Pragati Scholarship', badge: 'Female Students', el: 'Girl students (Diploma / Degree)', ben: 'Fees + Books + Equipment support', cat: 'All Categories', amount: '₹50,000', deadline: '31 March 2025' },
{ id: 'SCH2', name: 'Saksham Scholarship', badge: 'Special-abled', el: 'Special-abled students (40%+ disability)', ben: '₹50,000 per year', cat: 'All Categories', amount: '₹50,000', deadline: '28 Feb 2025' },
{ id: 'SCH3', name: 'Merit-Cum-Means Scholarship', badge: 'Minority', el: 'Minorority community students', ben: '₹25,000 – ₹30,000 per year', cat: 'Minority', amount: '₹30,000', deadline: '15 April 2025' },
{ id: 'SCH4', name: 'National PG Scholarship', badge: 'Postgraduate', el: 'Postgraduate students with 60%+', ben: '₹1,50,000 per year', cat: 'All Categories', amount: '₹1,50,000', deadline: '30 April 2025' },
{ id: 'SCH5', name: 'Top Class Education (Disability)', badge: 'Disabled', el: 'Disabled students in top institutes', ben: 'Full Fee + Maintenance', cat: 'All Categories', amount: 'Full Fees', deadline: '31 March 2025' },
{ id: 'SCH6', name: 'Rajarshi Shahu Maharaj Scholarship', badge: 'SC/Neo-Buddhist', el: 'SC / Neo-Buddhist students', ben: 'Tuition fees for abroad study', cat: 'SC', amount: '₹2,00,000', deadline: '28 Feb 2025' },
{ id: 'SCH7', name: 'Post-Matric Scholarship', badge: 'SC/ST/OBC', el: 'SC/ST/OBC/VJNT/PwD students', ben: 'All Education Fees + Allowance', cat: 'SC/ST/OBC/VJNT', amount: 'Full Fees + ₹10,000', deadline: '15 March 2025' },
{ id: 'SCH8', name: 'Savitribai Phule Scholarship', badge: 'Girls', el: 'Girls (5th–10th & College)', ben: 'Fee Support + Maintenance', cat: 'All Categories', amount: '₹15,000', deadline: '30 April 2025' },
{ id: 'SCH9', name: 'Rajiv Gandhi National Fellowship', badge: 'SC/ST Research', el: 'SC/ST students for M.Phil/PhD', ben: '₹25,000/month (JRF) + HRA', cat: 'SC/ST', amount: '₹25,000/month', deadline: '31 May 2025' },
{ id: 'SCH10', name: 'Ishan Uday Scholarship', badge: 'North-East Students', el: 'Students from North-East studying outside', ben: '₹5,400 – ₹7,800/month', cat: 'All Categories', amount: '₹7,800/month', deadline: '30 June 2025' },
];

const DIST = {
  'Pune': ['Pune City', 'Haveli', 'Mulshi', 'Maval', 'Khed', 'Junnar', 'Ambegaon', 'Shirur', 'Baramati', 'Indapur', 'Bhor', 'Velhe', 'Purandar'],
  'Mumbai City': ['Colaba', 'Worli', 'Dharavi', 'Kurla', 'Andheri', 'Borivali', 'Kandivali', 'Malad', 'Goregaon'],
  'Mumbai Suburban': ['Andheri', 'Bandra', 'Santacruz', 'Vile Parle', 'Malad', 'Kandivali', 'Borivali', 'Dahisar', 'Mulund'],
  'Nashik': ['Nashik City', 'Niphad', 'Sinnar', 'Igatpuri', 'Trimbakeshwar', 'Dindori', 'Kalwan', 'Surgana', 'Malegaon', 'Chandwad', 'Yevla'],
  'Nagpur': ['Nagpur City', 'Kamptee', 'Hingna', 'Umred', 'Bhiwapur', 'Katol', 'Narkhed', 'Savner', 'Ramtek', 'Mouda'],
  'Aurangabad': ['Aurangabad City', 'Kannad', 'Soegaon', 'Sillod', 'Phulambri', 'Vaijapur', 'Gangapur', 'Paithan'],
  'Kolhapur': ['Kolhapur City', 'Karvir', 'Panhala', 'Hatkanangle', 'Shirol', 'Radhanagari', 'Kagal', 'Ajra'],
  'Solapur': ['Solapur City', 'Akkalkot', 'South Solapur', 'North Solapur', 'Barshi', 'Mohol', 'Pandharpur', 'Sangola'],
  'Satara': ['Satara City', 'Karad', 'Patan', 'Wai', 'Mahabaleshwar', 'Javali', 'Phaltan', 'Koregaon'],
  'Sangli': ['Sangli City', 'Miraj', 'Tasgaon', 'Walwa', 'Shirala', 'Atpadi', 'Jat'],
  'Raigad': ['Alibag', 'Pen', 'Panvel', 'Uran', 'Karjat', 'Roha', 'Murud', 'Mahad'],
  'Thane': ['Thane City', 'Kalyan', 'Ambarnath', 'Ulhasnagar', 'Bhiwandi', 'Shahapur', 'Murbad'],
  'Palghar': ['Palghar', 'Vasai', 'Boisar', 'Dahanu', 'Talasari', 'Jawhar', 'Mokhada'],
  'Nanded': ['Nanded City', 'Mudkhed', 'Bhokar', 'Loha', 'Kandhar', 'Kinwat', 'Mahur', 'Deglur'],
  'Latur': ['Latur City', 'Ahmadpur', 'Udgir', 'Ausa', 'Nilanga', 'Deoni'],
  'Osmanabad': ['Osmanabad City', 'Tuljapur', 'Bhum', 'Paranda', 'Kalamb', 'Umarga'],
  'Beed': ['Beed City', 'Ambajogai', 'Georai', 'Majalgaon', 'Parli', 'Ashti'],
  'Jalna': ['Jalna City', 'Badnapur', 'Bhokardan', 'Jafrabad', 'Partur', 'Ambad'],
  'Yavatmal': ['Yavatmal City', 'Wani', 'Ghatanji', 'Kelapur', 'Darwha', 'Digras', 'Pusad', 'Umarkhed'],
  'Amravati': ['Amravati City', 'Achalpur', 'Chandur Bazar', 'Daryapur', 'Anjangaon', 'Morshi', 'Warud'],
  'Akola': ['Akola City', 'Akot', 'Balapur', 'Patur', 'Murtijapur', 'Telhara'],
  'Buldhana': ['Buldhana City', 'Chikhli', 'Malkapur', 'Nandura', 'Khamgaon', 'Shegaon', 'Mehekar', 'Lonar'],
  'Chandrapur': ['Chandrapur City', 'Mul', 'Rajura', 'Ballarpur', 'Warora', 'Chimur', 'Bhadravati'],
  'Wardha': ['Wardha City', 'Hinganghat', 'Arvi', 'Deoli', 'Seloo', 'Samudrapur'],
  'Ratnagiri': ['Ratnagiri City', 'Chiplun', 'Sangameshwar', 'Lanja', 'Rajapur', 'Dapoli', 'Guhagar'],
  'Sindhudurg': ['Kudal', 'Malvan', 'Sawantwadi', 'Vengurla', 'Kankavali'],
  'Dhule': ['Dhule City', 'Shirpur', 'Sakri', 'Sindkheda'],
  'Nandurbar': ['Nandurbar City', 'Navapur', 'Shahada', 'Taloda', 'Akkalkuwa'],
  'Jalgaon': ['Jalgaon City', 'Bhusawal', 'Amalner', 'Pachora', 'Chalisgaon', 'Jamner', 'Raver'],
  'Ahmednagar': ['Ahmednagar City', 'Shrigonda', 'Karjat', 'Shevgaon', 'Parner', 'Kopargaon', 'Sangamner'],
  'Gondia': ['Gondia City', 'Tirora', 'Goregaon', 'Amgaon', 'Deori'],
  'Bhandara': ['Bhandara City', 'Tumsar', 'Lakhandur', 'Mohadi', 'Sakoli'],
  'Parbhani': ['Parbhani City', 'Selu', 'Pathri', 'Manwath', 'Jintur'],
  'Hingoli': ['Hingoli City', 'Sengaon', 'Basmath', 'Kalamnuri'],
  'Washim': ['Washim City', 'Risod', 'Malegaon', 'Mangrulpir', 'Karanja'],
};

const STATES = ['Maharashtra', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry'];

// ── LOCAL STORAGE HELPERS ─────────────
function getUsers() { return JSON.parse(localStorage.getItem('ss_users') || '[]'); }
function saveUsers(u) { localStorage.setItem('ss_users', JSON.stringify(u)); }
function getApps() { return JSON.parse(localStorage.getItem('ss_apps') || '[]'); }
function saveApps(a) { localStorage.setItem('ss_apps', JSON.stringify(a)); }
function getCurrentUser() { return localStorage.getItem('ss_current') || null; }
function setCurrentUser(e) { localStorage.setItem('ss_current', e); }
function clearCurrentUser() { localStorage.removeItem('ss_current'); }

// ── SEED DEFAULT USERS ────────────────
(function seedData() {
  if (!localStorage.getItem('ss_users')) {
    saveUsers([
      { name: 'Admin User', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
      { name: 'Student User', email: 'student@gmail.com', password: '12345', role: 'student' },
    ]);
  }
  if (!localStorage.getItem('ss_apps')) {
    saveApps([
      { appId: 'APP1700000001', userEmail: 'student@gmail.com', name: 'Rahul Patil', gender: 'Male', dob: '2002-06-15', aadhar: '123456789012', cat: 'OBC', course: 'Engineering', year: '2024-25', college: 'Pune Institute of Technology', income: '₹1,00,000 - ₹2,50,000', schName: 'Post-Matric Scholarship', acc: '9876543210', ifsc: 'SBIN0012345', addr: 'Pune, Maharashtra', status: 'Pending', appliedDate: '01/01/2025, 10:00:00 AM' },
      { appId: 'APP1700000002', userEmail: 'student@gmail.com', name: 'Priya Deshmukh', gender: 'Female', dob: '2001-03-22', aadhar: '987654321098', cat: 'SC', course: 'MCA', year: '2024-25', college: 'Aurangabad University', income: 'Below ₹1,00,000', schName: 'Savitribai Phule Scholarship', acc: '1122334455', ifsc: 'BANK0001122', addr: 'Aurangabad, Maharashtra', status: 'Approved', appliedDate: '15/01/2025, 2:30:00 PM' },
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
  document.getElementById('m-el').textContent = s.el;
  document.getElementById('m-ben').textContent = s.ben;
  document.getElementById('m-cat').textContent = s.cat;
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

// ── AUTH NAV (show Login/Register or User + Logout) ──
function renderAuthNav() {
  const ul = document.querySelector('.navbar nav ul');
  if (!ul) return;

  const cu = getCurrentUser();
  const users = getUsers();
  const user = users.find(u => u.email === cu);

  // Determine link prefix depending on whether we're inside /pages/
  const prefix = location.pathname.includes('/pages/') ? '' : 'pages/';

  // Hide existing login/register links if present
  const elLogin = document.getElementById('nav-login');
  const elRegister = document.getElementById('nav-register');
  if (elLogin) elLogin.style.display = cu ? 'none' : '';
  if (elRegister) elRegister.style.display = cu ? 'none' : '';

  // Remove any previous injected user/logout nodes
  const prevUser = document.getElementById('nav-user');
  const prevLogout = document.getElementById('nav-logout');
  if (prevUser) prevUser.parentElement.removeChild(prevUser);
  if (prevLogout) prevLogout.parentElement.removeChild(prevLogout);

  if (cu && user) {
    // Create "Hi, Name" link
    const liUser = document.createElement('li');
    const aUser = document.createElement('a');
    aUser.id = 'nav-user';
    aUser.href = prefix + 'applications.html';
    aUser.textContent = `Hi, ${user.name.split(' ')[0]}`;
    liUser.appendChild(aUser);

    // Create Logout link
    const liOut = document.createElement('li');
    const aOut = document.createElement('a');
    aOut.id = 'nav-logout';
    aOut.href = '#';
    aOut.className = 'nav-cta';
    aOut.textContent = 'Logout';
    liOut.appendChild(aOut);

    ul.appendChild(liUser);
    ul.appendChild(liOut);

    // Logout handler
    aOut.addEventListener('click', function (e) {
      e.preventDefault();
      clearCurrentUser();
      showToast('You have been logged out.', 'success');
      setTimeout(() => { window.location.href = prefix + 'index.html'; }, 600);
    });
  }
}

// Close modal on overlay click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('schModal');
  if (overlay) overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  // Render login/logout state in navbar
  renderAuthNav();
});
