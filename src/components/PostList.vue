<template>
  <div class="post-list">
    <!-- Iterar sobre los posts -->
    <div v-for="(post, index) in posts" :key="index" class="post-item">
      <h3>{{ post.title }}</h3>
      <p>{{ post.subtitle }}</p>
      <img v-if="post.image" :src="post.image" alt="Imagen del post" />
      <p>{{ post.text }}</p>
      <small>{{ post.authorName }}</small>
      <ul>
        <li><a :href="post.socialLinks.linkedin" target="_blank">LinkedIn</a></li>
        <li><a :href="post.socialLinks.instagram" target="_blank">Instagram</a></li>
        <!-- Agrega aquí otros enlaces sociales según sea necesario -->
      </ul>
      <small>{{ formatDate(post.date) }}</small>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { computed } from 'vue'

// Acceso a la tienda
const postStore = usePostStore()

// Obtener los posts de la tienda
const posts = computed(() => postStore.posts)

// Función para formatear la fecha (opcional)
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
/* Estilos para la lista de posts */
.post-list {
  padding: 20px;
}

.post-item {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

/* Estilos adicionales según sea necesario */
</style>
