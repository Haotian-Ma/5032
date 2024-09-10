<template>
    <div class="center-container">
      <h1>Sign In</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p><button @click="signin">Sign in via Firebase</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
  import { useRouter } from 'vue-router'
  import { getFirestore, doc, getDoc } from 'firebase/firestore'
  
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const auth = getAuth()
  const db = getFirestore()
  
  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
  
      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const userRole = userData.role
        if (userRole === 'admin') {
          alert('Welcome! Admin')
          router.push('/AdminDashboard') 
        } else if (userRole === 'user') {
          alert('Welcome! User')
          router.push('/UserDashboard')  
        } else {
          alert('Role not recognized!')
        }
      } else {
        alert('No role data found. Please check your account.')
      }
    } catch (error) {
      console.error('Error signing in:', error.message)
      alert('Sign in failed. Please check your credentials and try again.')
    }
  }
  </script>
  
  <style scoped>
  .center-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;
  }
  
  input {
    padding: 10px;
    width: 250px;
    margin-bottom: 15px;
  }
  
  button {
    padding: 10px 20px;
    width: 250px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  p {
    margin-top: 10px;
  }
  
  router-link {
    color: #2196f3;
    text-decoration: none;
  }
  </style>
  