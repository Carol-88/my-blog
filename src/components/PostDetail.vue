<template>
  <div class="post-detail">
    <div v-if="isLoading" class="loading-state">
      <p>Cargando...</p>
    </div>
    <div v-else-if="activePost" class="post-content">
      <h2>{{ activePost.title }}</h2>
      <p>{{ activePost.subtitle }}</p>
      <img v-if="activePost.image" :src="activePost.image" alt="Imagen del post" />
      <p>{{ activePost.text }}</p>
      <small>{{ activePost.authorName }}</small>
      <small class="small-text">{{ formatDate(activePost.date) }}</small>
    </div>
    <div v-else class="no-post">
      <p>El post no se ha encontrado.</p>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore.js'
import { useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

const postStore = usePostStore()
const router = useRouter()
const { activePost } = storeToRefs(postStore)
const isLoading = ref(true)

watchEffect(async () => {
  isLoading.value = true
  const postId = router.currentRoute.value.params.id
  await postStore.loadPostById(postId)
  isLoading.value = false
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
  padding: 20px;
}

.loading-state,
.no-post {
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

.small-text {
  font-size: 14px;
  color: #777;
}
</style>
