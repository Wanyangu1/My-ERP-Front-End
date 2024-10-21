<template>
    <div class="register">
      <h2>Create an Account</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            required
            placeholder="Enter your username"
          />
        </div>
  
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="user.email"
            required
            placeholder="Enter your email"
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="user.password"
            required
            placeholder="Enter your password"
          />
        </div>
  
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="user.confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </div>
  
        <button type="submit">Register</button>
  
        <div v-if="error" class="error">{{ error }}</div>
      </form>
      <p>Already have an account? <router-link to="/login">Login here</router-link></p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    name: 'Register',
    setup() {
      const user = ref({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
  
      const error = ref('');
      const router = useRouter();
  
      const registerUser = async () => {
        if (user.value.password !== user.value.confirmPassword) {
          error.value = 'Passwords do not match';
          return;
        }
  
        try {
          await axios.post('http://127.0.0.1:8000/api/register/', user.value);
          router.push('/login'); // Redirect to login page after successful registration
        } catch (err) {
          error.value = 'Registration failed: ' + (err.response.data.detail || 'Something went wrong');
        }
      };
  
      return {
        user,
        error,
        registerUser,
      };
    },
  };
  </script>
  
  <style scoped>
  .register {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  