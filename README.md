# 📆 Countries & Holidays API

NestJS API to fetch country information (borders, population, flag) and add public holidays to a user's calendar.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/KhomenkoDmytro/country-info-app.git
cd country-info-app

# Install dependencies
npm install

# Copy environment config
cp .env.example .env

# Run the app in development mode
npm run start:dev

## 📬 API Endpoints

**Base URL:** `http://localhost:3000/api`

### 🌍 Countries

- **GET** `/countries`  
  Get list of available countries.

- **GET** `/countries/:code`  
  Get borders, population, and flag info for a specific country.

### 👤 Users

- **POST** `/users`  
  Create a new user.

- **POST** `/users/:userId/calendar/holidays`  
  Add public holidays to a user's calendar.

  > Only holidays that have **not already been added** to the user's calendar will be saved.  
  > Duplicates (same `name` and `date`) are automatically skipped.
