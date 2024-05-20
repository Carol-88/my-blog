<template>
  <div class="post-list">
    <div v-for="(post, index) in posts" :key="index" class="post-item">
      <h3>{{ post.title || 'Título no disponible' }}</h3>
      <p>{{ post.subtitle || 'Subtítulo no disponible' }}</p>
      <img v-if="post.image" :src="post.image" alt="Imagen del post" />
      <div v-html="getFirstParagraph(post.text)" class="post-text"></div>
      <button @click="navigateToPostDetail(post)">Ver más</button>
      <small>{{ post.authorName || 'Autor desconocido' }}</small>
      <small>{{ formatDate(post.date) }}</small>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const postStore = usePostStore()
const router = useRouter()
const posts = computed(() => postStore.posts)

function formatDate(dateString) {
  if (!dateString) return 'Fecha no disponible'
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

function navigateToPostDetail(post) {
  router.push({ name: 'postdetail', params: { id: post.id } })
}

function getFirstParagraph(text) {
  if (!text) return 'Contenido no disponible'
  const paragraphEnd = text.indexOf('\n')
  if (paragraphEnd !== -1) {
    return text.substring(0, paragraphEnd)
  } else {
    const sentenceEnd = text.indexOf('. ')
    if (sentenceEnd !== -1) {
      return text.substring(0, sentenceEnd + 1)
    } else {
      return text
    }
  }
}
</script>

<style scoped>
.post-list {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-item {
  display: flex;
  padding: 10px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  color: #333;
  font-size: large;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: stretch;
  background-color: #d8d8d8;
  border-radius: 2%;
  height: 550px;
  overflow: auto;
}

.post-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.post-item small {
  color: #333;
  display: block;
  margin-top: 5px;
}

.post-text {
  margin: 10px;
  font-size: medium;
}
</style>
