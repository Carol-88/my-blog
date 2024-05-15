<template>
  <div class="post-detail">
    <div v-if="activePost" class="loading-state">
      <p>Cargando...</p>
    </div>
    <div v-else class="post-content">
      <h2>{{ activePost.title }}</h2>
      <p>{{ activePost.subtitle }}</p>
      <img v-if="activePost.image" :src="activePost.image" alt="Imagen del post" />
      <p>{{ activePost.text }}</p>
      <small>{{ activePost.authorName }}</small>
      <ul>
        <li><a :href="activePost.socialLinks.linkedin" target="_blank">LinkedIn</a></li>
        <li><a :href="activePost.socialLinks.instagram" target="_blank">Instagram</a></li>
        <!-- Agrega aquí otros enlaces sociales según sea necesario -->
      </ul>
      <small>{{ formatDate(activePost.date) }}</small>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore.js'
import { computed, onMounted, ref } from 'vue'

const postStore = usePostStore()
const postId = ref(null)
const activePost = ref(null)

const posts = computed(() => postStore.posts)

onMounted(async () => {
  const post = posts.value.find((p) => p.id === postId.value)
  if (post) {
    activePost.value = post
  } else {
    // Manejar el caso en que el post no se encuentra
    console.log('Post no encontrado')
  }
})

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
