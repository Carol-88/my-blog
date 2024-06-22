<template>
  <div class="post-list">
    <div v-for="(post, index) in posts" :key="index" class="post-item">
      <h3>{{ post.title || 'Título no disponible' }}</h3>
      <p>{{ post.subtitle || 'Subtítulo no disponible' }}</p>
      <img v-if="post.image" :src="post.image" alt="Imagen del post" />
      <!-- Alternativa segura para mostrar texto sin formato -->
      <div class="post-text">{{ getFirstParagraph(post.text) }}</div>
      <button @click="navigateToPostDetail(post)">Ver más</button>
      <small>{{ post.author_name || 'Autor desconocido' }}</small>
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
  let paragraphs = text.split('\n\n') // Divide el texto en párrafos
  if (paragraphs.length > 0) {
    return paragraphs[0] // Devuelve el primer párrafo
  } else {
    return text // Si no hay párrafos, devuelve todo el texto
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
  flex-direction: column;
  padding: 10px;
  background-color: #d8d8d8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  color: #333;
  transition: transform 0.2s;
}

.post-item:hover {
  transform: translateY(-5px);
}

.post-item h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.post-item p {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.post-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.post-item button {
  margin-top: auto;
  padding: 10px;
  background-color: #00366f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.post-item button:hover {
  background-color: #011c39;
}

.post-item small {
  color: #333;
  display: block;
  margin-top: 10px;
}

.post-text {
  font-size: 1rem;
  margin-bottom: 10px;
}
</style>
