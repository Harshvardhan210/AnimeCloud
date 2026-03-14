# ☁️ AnimeCloud

AnimeCloud is a modern, sleek, and responsive Web Application designed for anime enthusiasts to discover, search, and manage their personal anime lists. Built with a robust **Spring Boot** backend and a dynamic **React** frontend, it provides a seamless experience for tracking your favorite shows.

---

## 🚀 Key Features

### 🔍 Discovery & Search
- **Hero Slider**: Featured top anime highlights on the home page.
- **Top Recommendations**: Explore the most popular anime currently trending.
- **Search by Name**: Quickly find any anime using the integrated search bar.
- **Genre Filtering**: Browse anime by specific genres (Action, Comedy, Shounen, etc.).

### 📂 My List & Tracking
- **Personal List**: Add any anime to your personal "My List" for easy access.
- **Status Management**: Track your progress with statuses like *Watching*, *Completed*, *Dropped*, and *faveart*.
- **Color-Coded Feedback**: Dynamic status dropdowns on the Detail Page provide instant visual feedback.
- **Smart Filtering**: Filter your "My List" page by status to keep your collection organized.

### 📱 Premium UI/UX
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Glassmorphism**: Modern UI aesthetics with subtle blur effects and smooth animations.
- **Detailed Metadata**: View scores, episode counts, release years, and full synopses.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla CSS (Custom Design System)
- **Icons**: Lucide React
- **API Client**: Axios

### Backend
- **Framework**: Spring Boot 3.x (Java)
- **Build Tool**: Maven
- **Database**: H2 (In-memory persistence for easy setup)
- **External API**: Integrated with Jikan API (MAL) for live anime data.

---

## 🏁 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js 18** or higher
- **Maven**

### 1. Run the Backend
```bash
cd anime-site
./mvnw spring-boot:run
```
The server will start at `http://localhost:8080`.

### 2. Run the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 👤 Author

**Made by Harshvardhan**
- GitHub: [@Harshvardhan210](https://github.com/Harshvardhan210)

---
© 2026 AnimeCloud. All rights reserved.
