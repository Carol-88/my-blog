<template>
  <div class="home">
    <h1>Bienvenido a nuestra plataforma</h1>
    <PostList />
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue' // Ajusta la ruta según la ubicación real de tu componente
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

/* Estilos adicionales según sea necesario */
</style>
