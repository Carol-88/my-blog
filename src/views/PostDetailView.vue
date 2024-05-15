<template>
  <div class="post-detail-view">
    <h1>Detalles del Post</h1>
    <PostDetail v-if="post" :post="post" />
    <p v-else>No se encontró el post.</p>
  </div>
</template>

<script setup>
import PostDetail from '../components/PostDetail.vue' // Asegúrate de que la ruta sea correcta
import { useRouter } from 'vue-router'
import { ref, watchEffect } from 'vue'

const router = useRouter()
const postId = ref(router.currentRoute.value.params.id)

watchEffect(() => {
  postId.value = router.currentRoute.value.params.id
})

const post = ref(null)

watchEffect(() => {
  if (postId.value) {
    // Simula la obtención del post por ID, reemplaza esto con tu lógica real
    post.value = {
      id: postId.value,
      title: 'Titulo del post',
      subtitle: 'Subtitulo del post',
      image: 'url-de-la-imagen',
      text: 'Texto del post',
      authorName: 'Nombre del autor',
      date: '2023-04-01'
    }
  } else {
    post.value = null
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
