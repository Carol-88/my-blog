<template>
  <div class="post-detail" v-if="activePost">
    <div v-if="!activePost" class="loading-state">
      <p>Cargando...</p>
    </div>
    <div v-else class="post-content">
      <h2>{{ activePost.title }}</h2>
      <p>{{ activePost.subtitle }}</p>
      <img v-if="activePost.image" :src="activePost.image" alt="Imagen del post" />
      <p>{{ activePost.text }}</p>
      <small>{{ activePost.authorName }}</small>
      <small class="small-text">{{ formatDate(activePost.date) }}</small>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore.js'
import router from '@/router/index.js'
import { watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

const postStore = usePostStore()

const { activePost } = storeToRefs(postStore)

watchEffect(() => {
  const postId = router.currentRoute.value.params.id
  postStore.loadPostById(postId)
})

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: auto;
  overflow: hidden;
}

.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
}

.post-content {
  border-radius: 8px;
  padding: 24px;
  font-size: x-large;
  margin-top: 20px;
  background-color: #9bb4c1;
}

.post-content h2 {
  margin-bottom: 16px;
  color: #333;
  font-weight: bold;
  line-height: 1.5;
}

.post-content p {
  margin-bottom: 12px;
  line-height: 1.6;
  color: #333;
}

.post-content img {
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.post-content small {
  display: block;
  margin-top: 16px;
  color: #636363;
}

.post-content ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 16px;
}

.post-content ul li {
  margin-bottom: 8px;
}

.post-content ul li a {
  color: #007bff;
  text-decoration: none;
}

.post-content ul li a:hover {
  text-decoration: underline;
}

.small-text {
  font-size: 14px;
  color: #777;
}
</style>
