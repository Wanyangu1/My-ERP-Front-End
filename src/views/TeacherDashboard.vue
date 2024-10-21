<template>
    <div>
      <h1>Your Courses</h1>
      <button @click="showCreateCourseForm = true">Create New Course</button>
      <div v-if="showCreateCourseForm"> 
        <form @submit.prevent="createCourse">
          <input v-model="newCourse.title" placeholder="Course Title" required />
          <textarea v-model="newCourse.description" placeholder="Course Description"></textarea>
          <button type="submit">Create</button>
        </form>
      </div>
      <ul>
        <li v-for="course in courses" :key="course.id">
          <router-link :to="{ name: 'CourseDetail', params: { id: course.id } }">
            {{ course.title }}
          </router-link>
          <button @click="deleteCourse(course.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from '../plugins/axios';
  
  export default {
    setup() {
      const courses = ref([]);
      const showCreateCourseForm = ref(false);
      const newCourse = ref({ title: '', description: '' });
  
      const fetchCourses = async () => {
        try {
          const response = await axios.get('courses/');
          courses.value = response.data;
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
  
      const createCourse = async () => {
        // Do not set teacher ID if user is unauthenticated
        try {
          await axios.post('courses/', newCourse.value);
          newCourse.value = { title: '', description: '' };
          showCreateCourseForm.value = false;
          await fetchCourses(); // Refresh the courses list
        } catch (error) {
          console.error("Error creating course:", error);
        }
      };
  
      const deleteCourse = async (id) => {
        try {
          await axios.delete(`courses/${id}/`);
          await fetchCourses(); // Refresh the courses list
        } catch (error) {
          console.error("Error deleting course:", error);
        }
      };
  
      onMounted(fetchCourses);
  
      return { courses, showCreateCourseForm, newCourse, createCourse, deleteCourse };
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #333;
  }
  button {
    margin-top: 10px;
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
  