<template>
  <div class="post-detail">
    <div v-if="post" class="message">
      <p>Loading...</p>
    </div>
    <div v-else class="post-content">
      <h2>{{ post.title }}</h2>
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
import { computed, onMounted } from 'vue'
import { ref } from 'vue'

// Acceso a la tienda
const postStore = usePostStore()

// Identificador del post a mostrar
const postId = ref(null)

// Obtener los posts de la tienda
const posts = computed(() => postStore.posts)

// Buscar el post por ID cuando el componente se monta
onMounted(() => {
  const post = posts.value.find((p) => p.id === postId.value)
  if (post) {
    postStore.setActivePost(post) // Asumiendo que tienes una acción para establecer el post activo
  }
})

// Función para formatear la fecha (opcional)
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
/* Estilos para los detalles del post */
.post-detail {
  padding: 20px;
}

.message {
  text-align: center;
}

.post-content {
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
}

/* Estilos adicionales según sea necesario */
</style>
