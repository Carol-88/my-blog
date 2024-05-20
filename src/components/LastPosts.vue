<template>
  <div class="last-posts">
    <h2>Últimos Posts</h2>
    <div v-for="post in lastThreePosts" :key="post.id" class="post-card">
      <img :src="post.image" alt="Imagen del post" />
      <div class="post-info">
        <h3>{{ post.title }}</h3>
        <p>{{ post.subtitle }}</p>
        <small>{{ formatDate(post.date) }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePostStore } from '@/stores/postStore.js'

const postStore = usePostStore()

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

// Computed property para obtener los últimos tres posts
const lastThreePosts = computed(() => {
  // Crea una copia del array de posts para evitar modificar el original
  const postsCopy = [...postStore.posts]
  // Ordena los posts por fecha de manera descendente y toma los primeros tres
  return postsCopy.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
})
</script>

<style scoped>
.last-posts {
  width: 100%; /* Ajusta el ancho según sea necesario */
  max-width: 400px; /* Máximo ancho para mantener el diseño limpio */
  /* Centrado y margen */
}

.post-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px; /* Espacio entre tarjetas */
}

.post-card img {
  width: 100%;
  height: 200px; /* Altura fija para las imágenes */
  object-fit: cover; /* Ajusta la imagen para cubrir el espacio disponible */
}

.post-info {
  padding: 15px;
}

.post-info h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 5px;
}

.post-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.post-info small {
  font-size: 12px;
  color: #999;
}
</style>
