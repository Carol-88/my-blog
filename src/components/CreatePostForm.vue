<template>
  <div class="create-post-form">
    <form @submit.prevent="handleSubmit">
      <input v-model="post.title" placeholder="Título" required />
      <input v-model="post.subtitle" placeholder="Subtítulo" required />
      <input type="file" @change="handleImageUpload" />
      <textarea v-model="post.text" placeholder="Texto del post" required></textarea>

      <input type="text" v-model="post.author_name" placeholder="Nombre del Autor" required />
      <!-- Campo para el nombre del autor -->
      <input type="date" v-model="post.date" required />
      <button type="submit">Publicar</button>
    </form>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { toRefs, ref } from 'vue' // Importamos ref para manejar el valor del autor de manera reactiva

// Acceso a la tienda
const postStore = usePostStore()

// Convertir el estado de la tienda en referencias reactivas individuales
const { post } = toRefs(postStore)

// Manejo reactivo del nombre del autor
const authorName = ref('') // Inicializamos el nombre del autor como una variable reactiva

// Actualizar el nombre del autor en el store
const updateAuthorName = () => {
  postStore.updateAuthorName(authorName.value)
}

// Función para manejar el envío del formulario
const handleSubmit = async () => {
  try {
    // Actualizar el nombre del autor antes de crear el post
    updateAuthorName()

    // Crear una copia del post para evitar mutaciones directas
    const postData = JSON.parse(JSON.stringify(post.value))

    await postStore.createPost(postData) // Pasamos la copia del post
    alert('Post creado exitosamente!')
  } catch (error) {
    console.error('Error al crear el post:', error)
    alert('Hubo un error al crear el post. Por favor, inténtalo de nuevo.')
  }
}

const handleImageUpload = (event) => {
  postStore.updateImage(event.target.files[0])
}
</script>
