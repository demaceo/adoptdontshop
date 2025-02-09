# 🐾 Adopt Don't Shop

Adopt Don't Shop is a **pet adoption platform** designed to connect potential pet adopters with **rescue shelters** across the United States. With an engaging and intuitive user interface, users can **search, filter, and favorite** pets to find their perfect companion while promoting ethical pet adoption practices.

---

## 🌟 Features

### 🔎 Search & Filter Pets
- Search for adoptable pets by **type, breed, age, gender, and location**.
- Dynamic filtering to refine search results.
- Pagination support for seamless browsing.

### ❤️ Favorite Pets
- Save pets to a **Favorites** list for later consideration.
- View & manage favorite pets in a dedicated section.
- Favorites are **persisted using local storage**.

### 🏠 User-Friendly Interface
- **Modern, comic-book inspired UI** reflecting a vibrant and engaging design.
- **Fully responsive** across desktop, tablet, and mobile devices.
- **Fast-loading and accessible** web experience.

### 🔄 Real-Time Data from Petfinder API
- Fetches up-to-date pet listings from the **Petfinder API**.
- Ensures **accurate** and **real-time** adoption information.

### 🔧 Built With
- **Frontend:** React, TypeScript, Vite
- **Styling:** CSS Modules, Custom UI Design
- **Data Storage:** LocalStorage (Favorites persistence)
- **API Integration:** Petfinder API

---

## 🎨 UI Design Inspiration
This project's design is inspired by **Teyana Taylor’s mansion**, featuring a **comic-book aesthetic** with bold outlines, vibrant colors, and pop-art influences.

---

## 🚀 Getting Started
### 🔧 Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/demaceo/adoptdontshop.git
cd adoptdontshop
npm install
```

### ▶️ Run the App
Start the development server:
```sh
npm run dev
```
Open `http://localhost:5173` in your browser.

### 🔨 Build for Production
```sh
npm run build
```

### 🚀 Deploy to GitHub Pages
```sh
npm run deploy
```

---

## 📌 Project Structure
```
📦 adoptdontshop
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 Card.tsx  # Pet card component
 ┃ ┃ ┣ 📜 Filter.tsx  # Sorting & filtering UI
 ┃ ┃ ┣ 📜 Favorites.tsx  # Favorite pets page
 ┃ ┃ ┣ 📜 Results.tsx  # Search results page
 ┃ ┃ ┣ 📜 NavBar.tsx  # Navigation bar
 ┃ ┃ ┗ 📜 Form.tsx  # Search form component
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📜 Card.css
 ┃ ┃ ┣ 📜 Filter.css
 ┃ ┃ ┗ 📜 GlobalStyles.css
 ┃ ┣ 📜 App.tsx  # Main App Component
 ┃ ┗ 📜 main.tsx  # Entry Point
 ┣ 📜 package.json  # Dependencies & Scripts
 ┣ 📜 vite.config.ts  # Vite Configuration
 ┗ 📜 README.md  # Project Documentation
```

---

## 📖 API Usage
### 🔑 Petfinder API
This project integrates with the **Petfinder API** to fetch real-time pet adoption listings.

#### **Authentication**
Before making requests, you need an API key from Petfinder:
1. Sign up at [Petfinder Developer](https://www.petfinder.com/developers/).
2. Retrieve your **API key & secret**.
3. Store your credentials in an `.env` file:
   ```sh
   VITE_PETFINDER_API_KEY=your_api_key
   VITE_PETFINDER_API_SECRET=your_api_secret
   ```

#### **Fetching Animals**
Example API request to get adoptable pets:
```ts
fetch("https://api.petfinder.com/v2/animals", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
.then(response => response.json())
.then(data => console.log(data.animals));
```

---

## 🔧 Contributing
We welcome contributions! Follow these steps to contribute:
1. **Fork** the repository.
2. Create a **feature branch** (`git checkout -b feature-new`).
3. Commit your changes (`git commit -m 'Added new feature'`).
4. Push to your branch (`git push origin feature-new`).
5. Open a **Pull Request**!

---

## 🐞 Issues & Support
If you encounter bugs or issues, please open an issue on [GitHub](https://github.com/demaceo/adoptdontshop/issues).

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🎉 Acknowledgments
- **Teyana Taylor's mansion design** for UI inspiration.
- **Petfinder API** for real-time pet data.
- **Open-source community** for tools & libraries.

🐾 **Start your adoption journey today with** _Adopt Don't Shop!_ 🚀

