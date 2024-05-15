<template>
  <div class="create-post-form">
    <form @submit.prevent="handleSubmit">
      <input v-model="post.title" placeholder="Título" required />
      <input v-model="post.subtitle" placeholder="Subtítulo" required />
      <input type="file" @change="handleImageUpload" />
      <textarea v-model="post.text" placeholder="Texto del post" required></textarea>
      <input type="text" v-model="authorName" placeholder="Nombre del Autor" required />
      <input type="date" v-model="post.date" required />
      <button type="submit">Publicar</button>
    </form>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { toRefs, ref } from 'vue'

const postStore = usePostStore()
const { post } = toRefs(postStore)
const authorName = ref('')
const imageUrl = ref(null) // Asumiendo que tienes una propiedad imageUrl en tu store para almacenar la URL de la imagen

const updateAuthorName = () => {
  postStore.updateAuthorName(authorName.value)
}

const handleSubmit = async () => {
  try {
    updateAuthorName()
    const postData = JSON.parse(JSON.stringify(post.value))
    postData.imageUrl = imageUrl.value // Asigna la URL de la imagen al post
    await postStore.createPost(postData)
    alert('Post creado exitosamente!')
  } catch (error) {
    console.error('Error al crear el post:', error)
    alert('Hubo un error al crear el post. Por favor, inténtalo de nuevo.')
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    imageUrl.value = URL.createObjectURL(file)
  } else {
    imageUrl.value = '/favicon.ico' // Ruta a la imagen predeterminada
  }
}
</script>
