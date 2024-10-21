<template>
    <div>
      <h1>Course List</h1>
      <ul>
        <li v-for="course in courses" :key="course.id">
          <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }">
            {{ course.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from '@/plugins/axios';
  
  export default {
    name: 'CourseList',
    setup() {
      const courses = ref([]);
  
      const fetchCourses = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/courses/'); // Update the URL to match your Django endpoint
          courses.value = response.data;
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
  
      onMounted(fetchCourses);
  
      return {
        courses,
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
  }
  ul {
    list-style-type: none;
  }
  li {
    margin: 10px 0;
  }
  </style>
  