# Talentify

**Talentify** is a platform that connects talented individuals with potential clients, providing seamless communication and a robust hiring process. This repository contains the code for our platform, designed with a focus on user experience, admin management, and efficient hiring solutions.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Setup and Usage Instructions](#setup-and-usage-instructions)
4. [Screenshots](#screenshots)
5. [Technology Stack](#technology-stack)
6. [Contributing](#contributing)

## Project Overview

Talentify simplifies the process of showcasing skills and hiring talent. 
It offers:
- A registration system for individuals to showcase their talent.
- Admin approval workflows to ensure quality.
- Easy-to-use dashboards for managing talent and client requests.

## Features

- **User Registration:** Simple and intuitive registration process.
- **Admin Panel:** Approve/reject talent requests, view dashboards.
- **Search Functionality:** Search talents by name, skills.
- **Communication:** Built-in tools for seamless interaction.
- **Responsive Design:** Optimized for both desktop and mobile.

## Setup and Usage Instructions

### Prerequisites

- Node.js (v14 or later)
- NPM or Yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/talentify.git
   cd talentify
   ```
2. Now Navigate to Client Folder:
   ```bash
   cp .env.example .env
   npm install
   ```
3. Now Add the required credentials for Proper Working of Frontend
4. Now Navigate to the Server Folder
    ```bash
   cp .env.example .env
   npm install
   ```
5. Now Add the required credentials for Server as well
6. In Server Folder Navigate to Init folder
7. In init file add the credentials of admin you want
8. Add email of admin where all notifiations will recieve
9. Now in Client Folder
 ```bash
   npm run dev
   ```
10. Now in Server Folder
```bash
   npm run start
   ```
### Usage

- Visit `http://localhost:5173` to access the application.
- To access admin facilities, log in with the credentials for ex :- Email: admin@gmail.com and Password: admin-password at the login form, which will give you access to the admin panel.

## Screenshots

### Home Page
![Screenshot 2025-01-22 114608](https://github.com/user-attachments/assets/68063040-9772-4054-b182-5d1685a7e7b8)


### Admin Dashboard
![WhatsApp Image 2025-01-22 at 12 42 05_f26dce7f](https://github.com/user-attachments/assets/8495249c-2b99-4e22-9579-1fa9c0504137)

### Talent Explore Page
![image](https://github.com/user-attachments/assets/007bf28d-7937-438b-b139-eef8408aef85)


## Technology Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Email Service:** Nodemailer

## Contributing

We welcome contributions from the community! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature/bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request and describe your changes in detail.


For any questions or support, feel free to contact us at [adityakaplish11@gmail.com](adityakaplish11@gmail.com).
