<template>
  <div class="create-post-form">
    <form @submit.prevent="handleSubmit">
      <input v-model="post.title" placeholder="Título" required />
      <input v-model="post.subtitle" placeholder="Subtítulo" required />
      <input type="file" @change="handleImageUpload" />
      <textarea v-model="post.text" placeholder="Texto del post" required></textarea>
      <input v-model="post.authorName" placeholder="Nombre del autor" required />
      <div class="social-links">
        <a :href="post.socialLinks.facebook" target="_blank">Facebook</a>
        <a :href="post.socialLinks.twitter" target="_blank">Twitter</a>
        <a :href="post.socialLinks.instagram" target="_blank">Instagram</a>
      </div>
      <input type="date" v-model="post.date" required />
      <button type="submit">Publicar</button>
    </form>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'

const postStore = usePostStore()
const post = postStore.state.post

const handleSubmit = () => {
  console.log('Post submitted:', post.value)
}

const handleImageUpload = (event) => {
  post.value.image = event.target.files[0]
}
</script>

<style scoped></style>
