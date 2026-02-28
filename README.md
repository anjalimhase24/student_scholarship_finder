# SmartSupport - Maharashtra Scholarship Portal

A complete web-based scholarship management system for Maharashtra students. Built with pure HTML, CSS, and JavaScript using localStorage as a database.

---

## Project Structure

```
smartsupport/
|
|-- index.html                  (Home Page - Start here)
|
|-- css/
|   |-- style.css               (Common styles - navbar, buttons, forms, tables)
|   |-- home.css                (Home page - hero, features, testimonials)
|   |-- scholarship.css         (Scholarship listing page)
|   |-- apply.css               (Application form page)
|   |-- admin.css               (Admin dashboard)
|   |-- applications.css        (My Applications page)
|   |-- confirm.css             (Confirmation page)
|   |-- otp.css                 (OTP and Forgot Password pages)
|
|-- js/
|   |-- db.js                   (Shared data, localStorage helpers, modal, toast)
|   |-- home.js                 (Home page logic)
|   |-- scholarship.js          (Scholarship page logic)
|   |-- register.js             (Registration and password validation)
|   |-- login.js                (Login and session management)
|   |-- forget.js               (Forgot password and OTP verification)
|   |-- apply.js                (Application form submission)
|   |-- confirm.js              (Post-submission confirmation)
|   |-- my-applications.js      (Student application history)
|   |-- admin.js                (Admin panel - approve, reject, delete)
|
|-- pages/
    |-- scholarship.html        (All scholarships listing)
    |-- register.html           (New user registration)
    |-- login.html              (User login)
    |-- forget.html             (Forgot password - email entry)
    |-- otp.html                (OTP verification)
    |-- apply.html              (Scholarship application form)
    |-- confirm.html            (Application submitted confirmation)
    |-- applications.html       (Student's application history)
    |-- admin.html              (Admin dashboard)
```

---

## How to Run

1. Download and extract the ZIP file
2. Open `index.html` in any browser (Chrome, Firefox, Edge)
3. No server required - runs directly from files

---

## Demo Login Credentials

| Role    | Email               | Password  |
|---------|---------------------|-----------|
| Student | student@gmail.com   | 12345     |
| Admin   | admin@gmail.com     | admin123  |

---

## Pages and Features

### Home Page (index.html)
- Hero section with statistics
- Features overview
- Scholarship preview cards with modal popup
- Student testimonials
- Call to action section

### Scholarships Page
- All 8 Maharashtra scholarships listed
- Click any card to open a modal with eligibility and benefits
- Proceed to Apply button redirects to application form

### Register Page
- Full name, email, password fields
- Live password match validation
- Data saved to localStorage

### Login Page
- Email and password login
- Student is redirected to My Applications
- Admin is redirected to Admin Dashboard
- Session stored in localStorage

### Forgot Password and OTP
- Enter registered email to receive OTP
- OTP is shown on screen (demo mode)
- 4-digit OTP input with auto-focus between boxes

### Apply Page
- Multi-section form: Personal, Education, Scholarship, Bank, Address
- Must be logged in to access
- If coming from a scholarship modal, that scholarship is pre-selected
- Application saved to localStorage with unique App ID

### Confirm Page
- Shows the generated Application ID
- Links to My Applications page

### My Applications Page
- Shows all applications submitted by the logged-in student
- Displays status: Pending, Approved, or Rejected

### Admin Dashboard
- Accessible only with admin login
- Filter applications by status
- Approve, Reject, or Delete any application
- Changes reflect immediately in student's view

---

## Available Scholarships

| Scholarship Name                        | Eligibility                     | Benefits                        |
|-----------------------------------------|---------------------------------|---------------------------------|
| Pragati Scholarship                     | Girl students (Diploma/Degree)  | Fees + Books + Equipment        |
| Saksham Scholarship                     | Special-abled students          | Rs. 50,000 per year             |
| Merit-Cum-Means Scholarship             | Minority students               | Rs. 25,000 to Rs. 30,000/year  |
| National PG Scholarship                 | Postgraduate students           | Rs. 1,50,000 per year           |
| Top Class Education (Disability)        | Disabled students               | Fee + Maintenance               |
| Rajarshi Shahu Maharaj Scholarship      | SC / Neo-Buddhist students      | Tuition fees for abroad study   |
| Post-Matric Scholarship                 | SC/ST/OBC/VJNT/PwD              | All fees + Allowance            |
| Savitribai Phule Scholarship            | Girls (5th to 10th and College) | Fee Support + Maintenance       |

---

## Technology Used

- HTML5
- CSS3 (Flexbox, Grid, Animations, CSS Variables)
- Vanilla JavaScript (ES6)
- localStorage (as database for users and applications)
- Google Fonts (Playfair Display, DM Sans)

---

## Data Storage

All data is stored in the browser's localStorage under these keys:

| Key          | Contents                                  |
|--------------|-------------------------------------------|
| ss_users     | Registered user accounts                 |
| ss_apps      | All submitted scholarship applications   |
| ss_current   | Email of currently logged-in user        |

No backend or internet connection is required. Data persists until the browser's localStorage is cleared.

---

## Notes

- The OTP shown during Forgot Password is for demo purposes only. In a production system, this would be sent via email.
- Passwords are stored in plain text in localStorage. In a real application, proper hashing and a secure backend should be used.
- Admin credentials are seeded automatically on first load if no user data exists.

---

## Contact

Project: Smart Student Support
Email: info@student-support.com
Year: 2025
