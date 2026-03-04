
# ☁️ WeatherApp

A simple, beautiful, and responsive weather application built using **HTML**, **CSS**, and **Vanilla JavaScript**. This project allows users to check real-time weather conditions for any city worldwide using the OpenWeatherMap API.

<div align="center">
  <img width="80%" alt="image" src="https://github.com/user-attachments/assets/82584665-e17a-4302-abfe-17491a676b76" />

</div>

## 📖 Overview

This application provides a clean interface for users to search for cities and instantly view current weather data. It handles API requests, manages errors (like invalid city names), and updates the UI dynamically with appropriate icons (clouds, rain, clear sky, etc.).

## ✨ Key Features

* **Real-time Weather Data:** Fetches current temperature, humidity, and wind speed.
* **City Search:** Easy-to-use search bar to find weather for any location.
* **Dynamic Visuals:** * Updates weather icons based on conditions (Sunny, Rainy, Snowy, etc.).
    * Displays a "Not Found" illustration if the city doesn't exist.
    * Displays a "Search City" illustration for the initial state.
* **Responsive Design:** Looks great on both desktop and mobile devices.
* **Modern UI:** Styled with clean CSS and glassmorphism elements.

## 🛠️ Technologies Used

* **HTML5:** Semantic structure.
* **CSS3:** Custom styling and layout.
* **JavaScript (ES6+):** DOM manipulation and API integration.
* **OpenWeatherMap API:** Source of weather data.

## 📂 Project Structure

```text
WeatherApp/
├── assets/
│   ├── message/          # Illustrations for UI states (not-found, search-city)
│   ├── weather/          # SVG icons for different weather conditions
│   └── bg.jpg            # Background image
├── index.html            # Main HTML file
├── style.css             # Stylesheet
├── main.js               # Application logic (API calls & UI updates)
└── README.md             # Project documentation

```

## 🚀 How to Run

1. **Clone the repository:**
```bash
git clone [https://github.com/singgihhakim/weatherapp.git](https://github.com/singgihhakim/weatherapp.git)

```


2. **Navigate to the folder:**
```bash
cd weatherapp

```


3. **Setup API Key:**
* Open `main.js`.
* Locate the `apiKey` variable (or similar).
* *Note: If the key is missing, you will need to sign up at [OpenWeatherMap](https://openweathermap.org/) to get your own free API key and insert it into the code.*


4. **Run the app:**
* Simply open `index.html` in your preferred web browser.
* Alternatively, use the "Live Server" extension in VS Code for a better experience.



## 📸 Screenshots

| Search Interface | Weather Result | Not Found |
| --- | --- | --- |
| <img src="./assets/message/search-city.png" width="200"> | <img width="40%" alt="image" src="https://github.com/user-attachments/assets/82584665-e17a-4302-abfe-17491a676b76" /> | <img src="./assets/message/not-found.png" width="200"> |

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

---

<div align="center">
<p>Created by Singgih Hakim</p>
</div>
