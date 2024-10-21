// src/store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null,
  }),
  actions: {
    async login(username, password) {
      try {
        // Request authentication token
        const response = await axios.post('http://localhost:8000/api/auth/token/', { username, password });
        this.token = response.data.access;
        
        // Store token in localStorage
        localStorage.setItem('token', this.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        
        // Fetch user data after login
        const userResponse = await axios.get('http://localhost:8000/api/user/'); // Update this URL based on your API
        this.user = userResponse.data; // Set the user data in the store
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
    logout() {
      // Clear the token and user data on logout
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    async fetchUser() {
      // Fetch user data (if needed outside of login)
      try {
        const response = await axios.get('http://localhost:8000/api/user/'); // Update this URL based on your API
        this.user = response.data;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  },
});
