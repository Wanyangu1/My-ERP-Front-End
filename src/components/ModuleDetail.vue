<template>
    <div>
      <h3>{{ module.title }}</h3>
      <button @click="showAddContentForm = true">Add Content</button>
      <div v-if="showAddContentForm">
        <form @submit.prevent="addContent">
          <select v-model="newContent.content_type" required>
            <option value="text">Text</option>
            <option value="file">File</option>
            <option value="video">Video URL</option>
            <option value="image">Image</option>
          </select>
          <div v-if="newContent.content_type === 'text'">
            <textarea v-model="newContent.text" placeholder="Enter text"></textarea>
          </div>
          <div v-if="newContent.content_type === 'file'">
            <input type="file" @change="handleFileUpload" />
          </div>
          <div v-if="newContent.content_type === 'video'">
            <input v-model="newContent.video_url" placeholder="Video URL" />
          </div>
          <div v-if="newContent.content_type === 'image'">
            <input type="file" @change="handleImageUpload" />
          </div>
          <button type="submit">Add Content</button>
        </form>
      </div>
      <ul>
        <li v-for="content in contents" :key="content.id">
          <div v-if="content.content_type === 'text'">
            <p>{{ content.text }}</p>
          </div>
          <div v-else-if="content.content_type === 'file'">
            <a :href="content.file" target="_blank">Download File</a>
          </div>
          <div v-else-if="content.content_type === 'video'">
            <iframe :src="content.video_url" frameborder="0"></iframe>
          </div>
          <div v-else-if="content.content_type === 'image'">
            <img :src="content.image" alt="Image Content" />
          </div>
          <button @click="deleteContent(content.id)">Delete</button>
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
      const courseId = route.params.courseId;
      const moduleId = route.params.moduleId;
      const module = ref({});
      const contents = ref([]);
      const showAddContentForm = ref(false);
      const newContent = ref({ content_type: 'text', text: '', video_url: '', file: null, image: null });
  
      const fetchModule = async () => {
        const response = await axios.get(`courses/${courseId}/modules/${moduleId}/`);
        module.value = response.data;
        contents.value = response.data.contents;
      };
  
      const addContent = async () => {
        const formData = new FormData();
        formData.append('module', moduleId); // Include the module ID
        formData.append('content_type', newContent.value.content_type);
  
        if (newContent.value.content_type === 'text') {
          formData.append('text', newContent.value.text);
        } else if (newContent.value.content_type === 'file') {
          formData.append('file', newContent.value.file);
        } else if (newContent.value.content_type === 'video') {
          formData.append('video_url', newContent.value.video_url);
        } else if (newContent.value.content_type === 'image') {
          formData.append('image', newContent.value.image);
        }
  
        await axios.post(`courses/${courseId}/modules/${moduleId}/contents/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        newContent.value = { content_type: 'text', text: '', video_url: '', file: null, image: null };
        showAddContentForm.value = false;
        fetchModule();
      };
  
      const handleFileUpload = (event) => {
        newContent.value.file = event.target.files[0];
      };
  
      const handleImageUpload = (event) => {
        newContent.value.image = event.target.files[0];
      };
  
      const deleteContent = async (contentId) => {
        await axios.delete(`courses/${courseId}/modules/${moduleId}/contents/${contentId}/`);
        fetchModule();
      };
  
      onMounted(fetchModule);
  
      return { module, contents, showAddContentForm, newContent, addContent, handleFileUpload, handleImageUpload, deleteContent };
    },
  };
  </script>
  
  <style scoped>
  iframe {
    width: 100%;
    height: 400px;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  