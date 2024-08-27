<script setup>
import { ref } from 'vue'

import router from '@/router';
const hardcodedUsername = 'abc'  
  const hardcodedPassword = '1234qwer!A'

const formData = ref({
  username: '',
  password: '',

})


const submitForm = () => {
  validateName(true)
  validatePassword(true)

  if (!errors.value.username && !errors.value.password 
  && formData.value.username === hardcodedUsername 
    && formData.value.password === hardcodedPassword
  ) {

    localStorage.setItem('isAuthenticated', 'true');
    alert("login success!")
    router.push({ name: 'About' });
  }
  else{
    alert("login failed!")
  }
}



const errors = ref({
  username: null,
  password: null

})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    
    errors.value.username = null
  }
}

const validatePassword = (blur) => {


  if (formData.value.password.length < 6) {
    if (blur) errors.value.password = `Password must be at least 6 characters long.`
  } 

  else {
    errors.value.password = null
  }
}


</script>

<template>
  <!-- 🗄️ Login Page -->
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">🗄️ Login Page</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  /* background-color: #e0bfbf; */
  border-radius: 10px;
}

/* Class selectors */
.form {
  text-align: center;
  margin-top: 50px;
}

/* ID selectors */
#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
.text-danger {
  color: red;
}
.text-success {
  color: green;
}

</style>
