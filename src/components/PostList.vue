<template>
  <div class="post-list">
    <div
      v-for="(post, index) in posts"
      :key="index"
      class="post-item"
      @click="navigateToPostDetail(post)"
    >
      <h3>{{ post.title || 'Título no disponible' }}</h3>
      <p>{{ post.subtitle || 'Subtítulo no disponible' }}</p>
      <img v-if="post.image" :src="post.image" alt="Imagen del post" />
      <p>{{ post.text || 'Contenido no disponible' }}</p>
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
</script>

<style scoped>
.post-list {
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.post-item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 50%;
  height: 500px;
  box-sizing: border-box;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.post-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 5px;
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
}

.post-item small {
  color: #777;
  display: block;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .post-item {
    width: calc(100% - 20px);
  }
}
</style>
