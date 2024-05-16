<template>
  <div class="post-detail-view">
    <PostDetail v-if="post" :post="post" />
    <p v-else>No se encontró el post.</p>
  </div>
</template>

<script setup>
import PostDetail from '../components/PostDetail.vue'
import { useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { usePostStore } from '../stores/postStore'
import { computed } from 'vue'

const postStore = usePostStore()
const router = useRouter()
const postId = ref(router.currentRoute.value.params.id)

watchEffect(() => {
  postId.value = router.currentRoute.value.params.id
})

const post = computed(() => postStore.post)
</script>

<style scoped>
.post-detail-view {
  padding: 20px;
  text-align: center;
}

/* Estilos adicionales según sea necesario */
</style>
