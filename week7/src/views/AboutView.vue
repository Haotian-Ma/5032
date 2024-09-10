
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
import { getAuth, signOut } from "firebase/auth"
const router = useRouter();

const logout = async () => {
  const auth = getAuth()
  try {
    await signOut(auth)
    alert("Logged out successfully")
    console.log('Current User:', auth.currentUser)
    router.push("/FireLogin") // Redirect to login page after logout
  } catch (error) {
    console.error("Error logging out:", error)
  }
}
  </script>
  
  <style>
  </style>