<template>
    <div>
      <h1>{{ course.title }}</h1>
      <p>{{ course.description }}</p>
      <h2>Modules</h2>
      <ul>
        <li v-for="module in modules" :key="module.id">
            <router-link :to="{ name: 'ModuleDetail', params: { courseId: course.id, moduleId: module.id } }">
            {{ module.title }}
            </router-link>
        </li>
        </ul>

    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from '@/plugins/axios';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'CourseDetail',
    setup() {
      const route = useRoute();
      const course = ref({});
      const modules = ref([]); // Create a ref for modules
  
      const fetchCourseDetail = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/courses/${route.params.id}/`);
          course.value = response.data;
  
          // Fetch modules after retrieving course details
          const modulesResponse = await axios.get(`http://127.0.0.1:8000/api/courses/${route.params.id}/modules/`);
          modules.value = modulesResponse.data; // Update modules with response data
        } catch (error) {
          console.error("Error fetching course detail or modules:", error);
        }
      };
  
      onMounted(fetchCourseDetail);
  
      return {
        course,
        modules, // Return modules to the template
      };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
  }
  h2 {
    margin-top: 20px;
  }
  ul {
    list-style-type: none;
  }
  li {
    margin: 10px 0;
  }
  </style>
  