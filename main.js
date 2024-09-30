// Mendapatkan elemen-elemen dari DOM
const cityInput = document.querySelector('.city-input'); // Input untuk memasukkan nama kota
const searchBtn = document.querySelector('.search-btn'); // Tombol pencarian
const notFouundSection = document.querySelector('.not-found'); // Seksi untuk menampilkan pesan jika kota tidak ditemukan
const searchCitySection = document.querySelector('.search-city'); // Seksi default untuk pencarian kota
const weatherInfoSection = document.querySelector('.weather-info'); // Seksi untuk menampilkan informasi cuaca
const countryTxt = document.querySelector('.country-txt'); // Elemen untuk menampilkan nama negara/kota
const tempTxt = document.querySelector('.temp-txt'); // Elemen untuk menampilkan suhu
const conditionTxt = document.querySelector('.condition-txt'); // Elemen untuk menampilkan kondisi cuaca
const humidityTxt = document.querySelector('.humidity-value-txt'); // Elemen untuk menampilkan kelembapan
const windValueTxt = document.querySelector('.wind-value-txt'); // Elemen untuk menampilkan kecepatan angin
const weatherSummaryImg = document.querySelector('.weather-summary-img'); // Elemen untuk menampilkan ikon cuaca
const currentDateTxt = document.querySelector('.current-date-txt'); // Elemen untuk menampilkan tanggal saat ini
const forecastItemsContainer = document.querySelector('.forecast-items-container'); // Kontainer untuk menampilkan item perkiraan cuaca
const apiKey = 'e1c278df1e665f1ecc74fef71469caca'; // Kunci API untuk OpenWeatherMap

// Event listener untuk tombol pencarian
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Mengambil nilai input kota dan menghapus spasi di awal/akhir
    if (city != '') {
        updateWeatherInfo(city); // Memperbarui informasi cuaca dengan nilai kota
        cityInput.value = ''; // Mengosongkan input setelah pencarian
        cityInput.blur(); // Menghilangkan fokus dari input
    }
});

// Event listener untuk mendeteksi tombol Enter saat memasukkan kota
cityInput.addEventListener('keydown', (event) => {
    const city = cityInput.value.trim(); // Mengambil nilai input kota
    if (event.key == 'Enter' && city != '') {
        updateWeatherInfo(city); // Memperbarui informasi cuaca dengan nilai kota
        cityInput.value = ''; // Mengosongkan input setelah pencarian
        cityInput.blur(); // Menghilangkan fokus dari input
    }
});

// Fungsi untuk mendapatkan data dari API
async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl); // Melakukan permintaan fetch ke URL API

    return response.json(); // Mengembalikan data dalam format JSON
}

// Fungsi untuk menentukan ikon cuaca berdasarkan ID
function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg'; // Ikon untuk cuaca badai
    if (id <= 321) return 'drizzle.svg'; // Ikon untuk cuaca gerimis
    if (id <= 531) return 'rain.svg'; // Ikon untuk cuaca hujan
    if (id <= 622) return 'snow.svg'; // Ikon untuk cuaca salju
    if (id <= 781) return 'atmosphere.svg'; // Ikon untuk kondisi atmosfer
    if (id <= 800) return 'clear.svg'; // Ikon untuk cuaca cerah
    else return 'clouds.svg'; // Ikon untuk cuaca berawan
}

// Fungsi untuk mendapatkan tanggal saat ini dalam format yang diinginkan
function getCurrentDate() {
    const currentDate = new Date(); // Membuat objek tanggal baru
    const options = {
        weekday: 'short', // Menampilkan hari dalam format pendek
        day: '2-digit', // Menampilkan tanggal dengan 2 digit
        month: 'short' // Menampilkan bulan dalam format pendek
    };
    
    return currentDate.toLocaleDateString('en-GB', options); // Mengembalikan tanggal dalam format Inggris
}

// Fungsi untuk memperbarui informasi cuaca berdasarkan kota
async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city); // Mengambil data cuaca dari API
    
    if (weatherData.cod != 200) { // Jika kode tidak sama dengan 200 (OK)
        showDisplaySection(notFouundSection); // Tampilkan seksi "tidak ditemukan"
        return; // Keluar dari fungsi
    }
    
    // Mengambil data yang diperlukan dari respons API
    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    // Memperbarui elemen dengan data yang diambil
    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + ' °C'; // Membulatkan suhu
    conditionTxt.textContent = main;
    humidityTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + ' m/s';
    
    currentDateTxt.textContent = getCurrentDate(); // Mengatur tanggal saat ini
    weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`; // Mengatur ikon cuaca

    // Memperbarui informasi perkiraan cuaca
    await updateForecastInfo(city);
    showDisplaySection(weatherInfoSection); // Tampilkan seksi informasi cuaca
}

// Fungsi untuk memperbarui informasi perkiraan cuaca
async function updateForecastInfo(city) {
    const forecastsData = await getFetchData('forecast', city); // Mengambil data perkiraan cuaca dari API
    const todayDate = new Date().toISOString().split('T')[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    
    forecastItemsContainer.innerHTML = ''; // Mengosongkan kontainer

    // Loop melalui data perkiraan cuaca (5 hari, setiap 3 jam)
    forecastsData.list.forEach(forecastWeather => {
        const forecastDate = forecastWeather.dt_txt.split(' ')[0]; // Mendapatkan tanggal dari data perkiraan cuaca

        // Pastikan tidak menampilkan data untuk hari ini
        if (forecastDate !== todayDate) {
            updateForecastItems(forecastWeather); // Memperbarui item perkiraan
        }
    });
}

// Fungsi untuk memperbarui item perkiraan cuaca
function updateForecastItems(weatherData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData;

    // Mengkonversi tanggal menjadi format '05 Sep'
    const forecastDate = new Date(date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short'
    });

    // Membuat elemen HTML untuk item perkiraan
    const forecastItem = `
        <div class="forecast-item">
            <h5 class="forecast-item-date reguler-txt">${forecastDate}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" alt="Forecast Icon" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)}°C</h5>
        </div>
    `;

    forecastItemsContainer.insertAdjacentHTML('beforeend', forecastItem); // Menambahkan item ke kontainer
}

// Fungsi untuk menampilkan seksi yang dipilih dan menyembunyikan yang lainnya
function showDisplaySection(section) {
    [weatherInfoSection, searchCitySection, notFouundSection]
        .forEach(section => section.style.display = 'none'); // Menyembunyikan semua seksi

    section.style.display = 'flex'; // Menampilkan seksi yang dipilih
}
