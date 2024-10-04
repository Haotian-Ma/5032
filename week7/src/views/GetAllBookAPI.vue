<template>
    <div class="container">
      <h1>All Books</h1>
      
      <pre v-if="books">{{ books }}</pre>
      
      <p v-else-if="loading">Loading...</p>
      <p v-else-if="error">Error: {{ error.message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        books: null,
        loading: true,
        error: null
      };
    },
    mounted() {
      this.getAllBooks();
    },
    methods: {
      async getAllBooks() {
        const apiUrl = 'https://us-central1-week7-haotian.cloudfunctions.net/getAllBooks';
  
        try {
          const response = await axios.get(apiUrl);
          this.books = response.data;
          this.loading = false;
        } catch (error) {
          console.error('Error fetching books:', error);
          this.error = error;
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  pre {
    background-color: #f4f4f4;
    padding: 15px;
    border-radius: 5px;
    max-height: 500px;
    overflow: auto;
    text-align: left;
    width: 80%;
    margin: 0 auto;
  }
  
  p {
    color: red;
  }
  </style>
  