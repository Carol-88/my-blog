<template>
  <div class="post-detail-view">
    <h1>Detalles del Post</h1>
    <PostDetail :postId="postId" />
  </div>
</template>

<script setup>
import PostDetail from './components/PostDetail.vue' // Ajusta la ruta según la ubicación real de tu componente
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Obtener el ID del post desde la URL
const router = useRouter()
const postId = ref(router.currentRoute.value.params.id)
</script>

<style scoped>
.post-detail-view {
  padding: 20px;
  text-align: center;
}

/* Estilos adicionales según sea necesario */
</style>
