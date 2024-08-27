
<template>
    <div class="about">
      <h1>About Our Library</h1>
      <p>Welcome to our digital library! We're dedicated to providing a vast collection of books and resources to our community.</p>
      <button @click="logout" class="btn btn-danger">Logout</button>  <!-- Logout button -->
    </div>


  </template>
  
  <script setup>
  // No script needed for now
  import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  localStorage.removeItem('isAuthenticated');
  router.push({ name: 'Login' });

};
  </script>
  
  <style>
  </style>