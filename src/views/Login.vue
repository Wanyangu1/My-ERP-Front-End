<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const auth = useAuthStore();
    const router = useRouter(); // Initialize the router

    const handleLogin = async () => {
      try {
        await auth.login(username.value, password.value); // Login method might be an async function
        router.push({ name: 'CreateCourse' }); // Redirect to Create Course page after successful login
      } catch (err) {
        error.value = 'Login failed: ' + err.message; // Handle error (optional)
      }
    };

    return { username, password, handleLogin };
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
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
