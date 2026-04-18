/* ════════════════════════════════════════
   login.js — Login Logic
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setNavActive('nav-login');

  // If already logged in, redirect
  const cu = getCurrentUser();
  if (cu) {
    const users = getUsers();
    const user = users.find(u => u.email === cu);
    if (user && user.role === 'admin') window.location.href = 'admin.html';
    else window.location.href = 'applications.html';
    return;
  }

  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('log-email').value.trim();
      const pass  = document.getElementById('log-pass').value;
      const msg   = document.getElementById('log-msg');
      const users = getUsers();
      const user  = users.find(u => u.email === email && u.password === pass);

      if (user) {
        setCurrentUser(email);
        msg.style.color = '#15803d';
        msg.textContent = `Welcome back, ${user.name}! 🎉`;
        showToast(`Welcome back, ${user.name}! 👋`, 'success');
        setTimeout(() => {
          form.reset();
          if (user.role === 'admin') window.location.href = 'admin.html';
          else window.location.href = 'applications.html';
        }, 1400);
      } else {
        msg.style.color = '#b91c1c';
        msg.textContent = 'Invalid Email or Password ❌';
        showToast('Login failed. Check credentials.', 'error');
      }
    });
  }
});
import { auth } from "../firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
 
const form  = document.getElementById("loginForm");
const msgEl = document.getElementById("formMsg");
 
form.addEventListener("submit", async (e) => {
  e.preventDefault();
 
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
 
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  btn.textContent = "Logging in...";
 
  try {
    await signInWithEmailAndPassword(auth, email, password);
 
    showMsg("Login successful! Redirecting...", "success");
    setTimeout(() => {
      window.location.href = "applications.html";
    }, 1000);
 
  } catch (err) {
    let msg = "Login failed.";
    if (err.code === "auth/user-not-found")   msg = "हा email registered नाही!";
    if (err.code === "auth/wrong-password")   msg = "Password चुकीचा आहे!";
    if (err.code === "auth/invalid-email")    msg = "Valid email टाका!";
    if (err.code === "auth/invalid-credential") msg = "Email किंवा Password चुकीचा आहे!";
    showMsg(msg, "error");
    btn.disabled = false;
    btn.textContent = "Login →";
  }
});
 
function showMsg(text, type) {
  msgEl.textContent = text;
  msgEl.style.display = "block";
  msgEl.style.color = type === "success" ? "green" : "red";
  msgEl.style.marginTop = "10px";
  msgEl.style.fontWeight = "bold";
}
