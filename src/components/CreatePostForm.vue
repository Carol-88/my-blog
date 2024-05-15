<template>
  <div class="create-post-form">
    <form @submit.prevent="handleSubmit">
      <input v-model="post.title" placeholder="Título" required />
      <input v-model="post.subtitle" placeholder="Subtítulo" required />
      <input type="file" @change="handleImageUpload" />
      <textarea v-model="post.text" placeholder="Texto del post" required></textarea>
      <input v-model="post.authorName" placeholder="Nombre del autor" required />
      <div class="social-links">
        <a :href="post.socialLinks.linkedin" target="_blank">LinkedIn</a>
        <a :href="post.socialLinks.instagram" target="_blank">Instagram</a>
        <!-- Asegúrate de que los enlaces sociales estén correctamente configurados -->
      </div>
      <input type="date" v-model="post.date" required />
      <button type="submit">Publicar</button>
    </form>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { toRefs } from 'vue'

// Acceso a la tienda
const postStore = usePostStore()

// Convertir el estado de la tienda en referencias reactivas individuales
const { post } = toRefs(postStore)

const handleSubmit = () => {
  console.log('Post submitted:', post.value)
}

const handleImageUpload = (event) => {
  // Asumiendo que tienes una acción updateImage en tu tienda
  postStore.updateImage(event.target.files[0])
}
</script>

<style scoped>
/* Estilos para el formulario */
</style>
