<template>
  <div class="post-list">
    <!-- Iterar sobre los posts -->
    <div v-for="(post, index) in posts" :key="index" class="post-item">
      <h3>{{ post.title || 'Título no disponible' }}</h3>
      <p>{{ post.subtitle || 'Subtítulo no disponible' }}</p>
      <img
        v-if="post.image"
        :src="post.image"
        @error="setDefaultImage($event)"
        alt="Imagen del post"
      />
      <p>{{ post.text || 'Contenido no disponible' }}</p>
      <small>{{ post.authorName || 'Autor desconocido' }}</small>
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

// Función para formatear la fecha
function formatDate(dateString) {
  if (!dateString) return 'Fecha no disponible'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Función para establecer una imagen predeterminada en caso de error
function setDefaultImage(event) {
  event.target.src = '/favicon.ico' // Reemplaza esto con la ruta real a tu imagen predeterminada
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
