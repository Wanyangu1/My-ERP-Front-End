<template>
    <div>
      <h1>{{ module.title }}</h1>
      <h2>Content</h2>
      <ul>
        <li v-for="content in module.contents" :key="content.id">
          <p v-if="content.content_type === 'text'">{{ content.text }}</p>
          <p v-if="content.content_type === 'video'">
            <a :href="content.video_url" target="_blank">Watch Video</a>
          </p>
          <p v-if="content.content_type === 'file'">
            <a :href="content.file" download>Download File</a>
          </p>
          <p v-if="content.content_type === 'image'">
            <img :src="content.image" alt="Content Image" />
          </p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from '@/plugins/axios';
  import { useRoute } from 'vue-router';
  
  export default {
    name: 'ModuleList',
    setup() {
      const route = useRoute();
      const module = ref({});
  
      const fetchModuleContents = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/modules/${route.params.moduleId}/`); // Update with your Django API endpoint
          module.value = response.data;
        } catch (error) {
          console.error("Error fetching module content:", error);
        }
      };
  
      onMounted(fetchModuleContents);
  
      return {
        module,
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
  img {
    max-width: 100%;
  }
  </style>
  