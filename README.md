# 🏖️ Vacation Request Approval System

A full-stack web application designed to streamline the process of submitting, approving, and managing vacation requests in an organization.  
The system ensures secure authentication, role-based dashboards, and a structured multi-level approval workflow.

---

## 🎯 Objectives & Goals
- Develop a secure, **multi-role authentication system**.  
- Implement a **multi-level approval workflow** (Employee → Manager → Chief → HR).  
- Provide **intuitive dashboards** tailored for each role.  
- Automate notification processes (e.g., email upon approval).  
- Ensure **efficient and transparent request management**.  

---

## 🛠️ Technology Stack

**Frontend**
- React (component-based architecture, declarative views)  
- `react-router-dom` for navigation  
- Custom CSS for styling  

**Backend**
- Node.js & Express.js (event-driven, RESTful APIs)  
- In-memory storage (scope of this version)  

**Communication**
- RESTful API for seamless data exchange  
- Nodemailer for email notifications  

---

## ✨ Core Features
- 🔒 **Secure Login** – Authentication with role-based access.  
- 📋 **Intuitive Request Form** – Employees can easily submit vacation requests.  
- 🧑‍💼 **Multi-Level Approval** – Managers, Chief Managers, and HR approve requests sequentially.  
- ⏱️ **Real-Time Status Tracking** – Employees see request progress (Pending, Approved, Rejected).  
- 📊 **Role-Based Dashboards** – Separate views for Employees, Managers, Chief Managers, and HR.  

---

## 📂 Project File Structure

### Root & Global Files
- **App.js** – Renders the root React component.  
- **Index.js** – Defines navigation routes and app entry point.  
- **Styles.css** – Global CSS styling for components.  
- **Users.js** – Local mock user database for authentication.  

### Pages & Components
- **Login.jsx** – Validates credentials and redirects users to dashboards.  
- **EmployeeDashboard.jsx** – Allows employees to submit requests and view status.  
- **ManagerDashboard.jsx** – Displays pending requests for approval/rejection.  
- **VacationForm.jsx** – Structured form for leave request submission.  

### Backend
- **Index.js** – Implements API endpoints (`/submit`, `/requests`, `/approve`), approval logic, and email notifications.  
- **package.json** – Defines project dependencies (Express, CORS, Nodemailer).  
- **package-lock.json** – Locks dependency tree for stability.  

---

## 🚀 Outcomes & Impact
- ✅ Streamlined HR processes.  
- ✅ Improved communication between employees and management.  
- ✅ Enhanced transparency in approval workflows.  
- ✅ Clear role-based permissions and responsibilities.  

---

## 🧩 Challenges & Learnings
- **Data Persistence** – Initially managed requests in-memory, later centralized on backend.  
- **Email Configuration** – Troubleshooted Nodemailer setup and credential issues.  
- **Key Learnings** – Importance of API design, React state management, and robust error handling.  

---

## 🏆 Summary & Achievements
1. Successfully automated and improved HR workflows.  
2. Implemented a **multi-level vacation approval system** using React and Node.js.  
3. Demonstrated practical application of modern full-stack development.  
4. Built a foundation for **future enhancements** (DB integration, analytics, mobile support).  

---

## 📌 Roadmap
- Integrate a database (MongoDB / SQL) for persistent storage.  
- Add email/SMS notifications for all approval steps.  
- Enhance the UI with responsive design.  
- Build analytics dashboard for HR insights. 

---

## 📄 License
This project is licensed under the MIT License.
