<!-- src/components/CourseDetail.vue -->
<template>
    <div>
      <h2>{{ course.title }}</h2>
      <p>{{ course.description }}</p>
      <button @click="showCreateModuleForm = true">Add Module</button>
      <div v-if="showCreateModuleForm">
        <form @submit.prevent="createModule">
          <input v-model="newModule.title" placeholder="Module Title" required />
          <input type="number" v-model="newModule.order" placeholder="Order" required />
          <button type="submit">Add Module</button>
        </form>
      </div>
      <ul>
        <li v-for="module in modules" :key="module.id">
          <router-link :to="{ name: 'ModuleDetail', params: { courseId: course.id, moduleId: module.id } }">
            {{ module.order }}. {{ module.title }}
          </router-link>
          <button @click="deleteModule(module.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from '@/plugins/axios';
  
  export default {
    setup() {
      const route = useRoute();
      const courseId = route.params.id;
      const course = ref({});
      const modules = ref([]);
      const showCreateModuleForm = ref(false);
      const newModule = ref({ title: '', order: 1 });
  
      const fetchCourse = async () => {
        const response = await axios.get(`courses/${courseId}/`);
        course.value = response.data;
        modules.value = response.data.modules;
      };
  
      const createModule = async () => {
        await axios.post(`courses/${courseId}/modules/`, newModule.value);
        newModule.value = { title: '', order: 1 };
        showCreateModuleForm.value = false;
        fetchCourse();
      };
  
      const deleteModule = async (moduleId) => {
        await axios.delete(`courses/${courseId}/modules/${moduleId}/`);
        fetchCourse();
      };
  
      onMounted(fetchCourse);
  
      return { course, modules, showCreateModuleForm, newModule, createModule, deleteModule };
    },
  };
  </script>
  