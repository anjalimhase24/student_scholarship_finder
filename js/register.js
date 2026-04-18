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
import { auth, db } from "../firebase-config.js";
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
 
const form = document.getElementById("registerForm");
const msgEl = document.getElementById("formMsg");
 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const fullName = document.getElementById("fullName").value.trim();
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm  = document.getElementById("confirmPassword").value;
 
  // Validation
  if (password !== confirm) {
    showMsg("Passwords जुळत नाहीत!", "error");
    return;
  }
  if (password.length < 6) {
    showMsg("Password कमीत कमी 6 characters असावा!", "error");
    return;
  }
 
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Creating account...";
 
  try {
    // 1. Firebase Auth मध्ये user बनवा
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
 
    // 2. Display name set करा
    await updateProfile(userCred.user, { displayName: fullName });
 
    // 3. Firestore मध्ये user profile save करा
    await setDoc(doc(db, "users", userCred.user.uid), {
      fullName,
      email,
      role:      "student",
      createdAt: serverTimestamp()
    });
 
    showMsg("Account तयार झाला! Login page वर जात आहे...", "success");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
 
  } catch (err) {
    let msg = "काहीतरी चूक झाली.";
    if (err.code === "auth/email-already-in-use") msg = "हा email आधीच registered आहे!";
    if (err.code === "auth/invalid-email")        msg = "Email address valid नाही!";
    showMsg(msg, "error");
    btn.disabled = false;
    btn.textContent = "Create Account 🎉";
  }
});
 
function showMsg(text, type) {
  msgEl.textContent = text;
  msgEl.style.display = "block";
  msgEl.style.color = type === "success" ? "green" : "red";
  msgEl.style.marginTop = "10px";
  msgEl.style.fontWeight = "bold";
}
