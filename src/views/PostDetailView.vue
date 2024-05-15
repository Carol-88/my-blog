<template>
  <div class="post-detail-view">
    <h1>Detalles del Post</h1>
    <PostDetail v-if="postId" :postId="postId" />
    <p v-else>No se encontró el post.</p>
  </div>
</template>

<script setup>
import PostDetail from './components/PostDetail.vue' // Ajusta la ruta según la ubicación real de tu componente
import { useRouter } from 'vue-router'
import { watchEffect, ref } from 'vue'

// Obtener el ID del post desde la URL
const router = useRouter()
const postId = ref(null)

// Observa los cambios en la ruta y actualiza postId en consecuencia
watchEffect(() => {
  const id = router.currentRoute.value.params.id
  if (id) {
    postId.value = id
  } else {
    postId.value = null
  }
})
</script>

<style scoped>
.post-detail-view {
  padding: 20px;
  text-align: center;
}

/* Estilos adicionales según sea necesario */
</style>
