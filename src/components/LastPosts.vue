<template>
  <div class="last-posts">
    <h2>Posts Aleatorios</h2>
    <div v-for="post in randomThreePosts" :key="post.id" class="post-card">
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

// Computed property para obtener tres posts aleatorios
const randomThreePosts = computed(() => {
  // Crea una copia del array de posts para evitar modificar el original
  const postsCopy = [...postStore.posts]

  // Genera tres índices aleatorios únicos
  const indices = Array.from(
    { length: 3 },
    (_, i) => i + Math.floor(Math.random() * postsCopy.length)
  ).filter((index, _, self) => self.indexOf(index) === index)

  // Filtra los posts basados en los índices aleatorios
  return indices.map((postIndex) => postsCopy[postIndex])
})
</script>

<style scoped>
h2 {
  padding: 1rem 0;
  text-align: center;
  color: #fff;
}

.last-posts {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  color: #fff;
}

.post-card {
  background-color: #f9f9f9;
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

/* Media query para dispositivos móviles */
@media (max-width: 768px) {
  .last-posts {
    max-width: 100%;
    padding: 10px;
  }

  .post-card img {
    height: 150px; /* Ajustar la altura de la imagen en móviles */
  }

  .post-info h3 {
    font-size: 16px;
  }

  .post-info p {
    font-size: 12px;
  }

  .post-info small {
    font-size: 10px;
  }
}
</style>
