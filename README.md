# 🚀 Email OTP Automation using Gmail API

## 📌 Overview

This project automates the process of fetching **One-Time Passwords (OTP)** from Gmail using the **Gmail API** and integrates it with test automation workflows.

It eliminates manual OTP entry by dynamically reading emails and extracting OTP codes in real time.

---

## 🛠 Tech Stack

* 🧪 **Node.js** – Runtime environment
* 📩 **Gmail API (Google APIs)** – Email access
* 🔐 **OAuth2 Authentication** – Secure access
* 🌍 **dotenv** – Environment configuration
* 📜 **TypeScript / JavaScript** – Implementation

---

## 🎯 Objective

* Automate OTP retrieval from email
* Reduce manual intervention in test flows
* Improve reliability of login/verification testing
* Enable end-to-end automation

---

## 🔄 Workflow

1️⃣ Authenticate using Gmail OAuth2 credentials
2️⃣ Connect to Gmail inbox via API
3️⃣ Filter recent emails using query parameters
4️⃣ Extract email content
5️⃣ Parse OTP using regex
6️⃣ Return OTP for automation use

---

## 📂 Project Structure

```id="otp002"
project-root/
│── src/
│   ├── fetchOtp.ts      # Main OTP fetching logic
│── .env                 # Environment variables
│── package.json
│── README.md
```

---

## ⚙️ Setup

### 1️⃣ Install Dependencies

```bash id="otp003"
npm install
```

---

### 2️⃣ Configure Environment Variables

Create a `.env` file:

```env id="otp004"
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REDIRECT_URI=your_redirect_uri
GMAIL_REFRESH_TOKEN=your_refresh_token
```

---

### 3️⃣ Enable Gmail API

* Go to Google Cloud Console
* Enable **Gmail API**
* Generate OAuth credentials
* Get refresh token

---

## ▶️ Usage

Run the OTP fetch script:

```bash id="otp005"
npm start
```

---

## 📊 Key Features

* 🔍 Fetches only recent emails
* ⏳ Retry mechanism with polling
* 📩 Supports spam/trash scanning
* 🔐 Secure OAuth2 authentication
* ⚡ Fast OTP extraction using regex

---

## 🧠 How OTP is Extracted

* Reads email body (base64 decoded)
* Searches for numeric patterns (4–6 digits)
* Returns first matching OTP

---

## ✨ Use Cases

* Login automation
* OTP verification flows
* End-to-end testing
* CI/CD automation pipelines

---

## 👨‍💻 Author

**Bharath**

---

