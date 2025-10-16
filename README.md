# 📝 Blogify

**Blogify** is a full-stack blog platform built using **Node.js**, **Express.js**, **MongoDB**, and **EJS**.  
It allows users to create and share blogs with features like authentication, image uploads, profile management, and a fully responsive UI designed with **Bootstrap**.

---

## 🔗 GitHub Repository

👉 [https://github.com/amanKumar72/Blogify](https://github.com/amanKumar72/Blogify)

## 🔗Live Link

👉  https://blogify-gew4.onrender.com/

---

## 🚀 Features

- 🔐 **Authentication System** – Secure login & registration using **JWT** and cookies  
- ✍️ **Blog Management (CRUD)** – Users can create, edit, delete, and view their blogs  
- 👤 **Profile Management** – Update username, email, and personal details  
- 🖼️ **Image Uploads** – Upload and store blog images using **Multer** in the server’s `/public` folder  
- 🎨 **Responsive UI** – Built with **Bootstrap** and **EJS** templates for a clean design  
- 📚 **API Documentation** – Auto-generated with **Swagger** for easy testing  
- 🧩 **MVC Architecture** – Clean folder structure with separation of concerns  
- ⚙️ **Environment Variables** – Managed securely using `dotenv`

---

## 🛠 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Templating Engine** | EJS |
| **Styling** | Bootstrap |
| **Authentication** | JWT, cookie-parser |
| **File Uploads** | Multer |
| **API Documentation** | Swagger, swagger-autogen |
| **Dev Tools** | Nodemon, dotenv |

---

## 📁 Folder Structure

```
blogify/
├── controllers/         # Route logic (auth, blog, user)
├── models/              # MongoDB schemas
├── routes/              # Express route files
├── views/               # EJS templates (pages & partials)
├── public/              # Static files (images, styles, uploads)
├── middlewares/         # Auth, error handling, file uploads
├── swagger.js           # Swagger configuration
├── index.js             # Main server file
├── .env                 # Environment variables
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally 👇

1. **Clone the repository**
   ```bash
   git clone https://github.com/amanKumar72/Blogify.git
   cd Blogify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the app**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   http://localhost:8080
   ```

---

## 📚 API Documentation

Swagger documentation is available at:

```
http://localhost:8080/api-docs
```

To regenerate Swagger docs manually:
```bash
npm run swagger
```

---

## 🧠 Learnings

- Built secure JWT authentication and session handling  
- Implemented RESTful APIs with Express and Swagger documentation  
- Managed file uploads with Multer and local storage handling  
- Strengthened understanding of MVC architecture and modular backend design  

---

## 🧑‍💻 Author

Created with ❤️ by **Aman Kumar**  
📧 [ak7802897@gmail.com](mailto:ak7802897@gmail.com)  
🔗 [GitHub Profile](https://github.com/amanKumar72)

---

## 📜 License

This project is open source and available under the [ISC License](LICENSE).
