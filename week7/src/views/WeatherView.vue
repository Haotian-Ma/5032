<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <main v-if="weatherData">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
<script>
  import axios from 'axios';

export default {
  name: 'WeatherView',
  data() {
    return {
      city: '',
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  methods: {
    async searchByCity() {
      const apiKey = 'ae2e054c43f3e7cf20c068639a45b1b0';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
  },
};
</script>
  <!-- <script>
  import axios from 'axios';
  const apikey = "ae2e054c43f3e7cf20c068639a45b1b0";
  export default {
    name: "App",
    data() {
      return {
        city: "",
        weatherData: null,
        hourlyForecast: [],
        dailyForecast: [],
      };
    },
    computed: {
      temperature() {
        return this.weatherData
          ? Math.floor(this.weatherData.main.temp - 273)
          : null;
      },
      iconUrl() {
        return this.weatherData
          ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
          : null;
      },
    },
    mounted() {
      this.fetchCurrentLocationWeather();
    },
    methods: {
      async fetchCurrentLocationWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          });
        }
      },
      async fetchWeatherData(url) {
        try {
          const response = await axios.get(url);
          this.weatherData = response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
        }
      }
    }
  }
  </script> -->
  
  <style scoped>
  .container {
    text-align: center;
  }
  
  .search-bar {
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    width: 250px;
  }
  
  .search-button {
    padding: 10px;
  }
  
  header {
    margin-bottom: 20px;
  }
  
  img {
    width: 100px;
    height: 100px;
  }
  
  p {
    font-size: 1.5rem;
  }
  </style>
  