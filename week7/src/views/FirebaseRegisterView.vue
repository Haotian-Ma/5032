<template>
    <div class="center-container">
      <h1>Create an Account</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>

      <p>
        <select v-model="role">
          <option value="user">Register as User</option>
          <option value="admin">Register as Admin</option>
        </select>
      </p>
      <p><button @click="register">Save to Firebase</button></p>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue"
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
  import { useRouter } from "vue-router"
  import { getFirestore, doc, setDoc } from "firebase/firestore"
  
  const email = ref("")
  const password = ref("")
  const role = ref("user") 
  const router = useRouter()
  const auth = getAuth()
  const db = getFirestore()
  
  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user
  

      await setDoc(doc(db, "users", user.uid), {
        email: email.value,
        role: role.value  
      })
  
      console.log("User registered and role saved!")
      router.push("/FireLogin")  
    } catch (error) {
      console.log(error.code)
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
  
  input, select {
    padding: 10px;
    width: 200px;
    margin-bottom: 10px;
  }
  
  button {
    padding: 10px 20px;
  }
  </style>
  