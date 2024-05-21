<template>
  <div class="home">
    <header class="navbar"><NavComponent /></header>
    <main class="content">
      <section class="post-list">
        <PostList />
      </section>
      <aside class="last-posts">
        <LastPosts />
      </aside>
    </main>
    <footer class="footer">Footer aquí</footer>
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue'
import LastPosts from '../components/LastPosts.vue'
import NavComponent from '../components/NavComponent.vue'
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Asegura que .home ocupe al menos toda la altura de la ventana */
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333; /* Color de fondo del navbar */
  color: white; /* Color de texto del navbar */
  padding: 10px 0;
  z-index: 1000; /* Asegura que el navbar esté siempre encima de otros elementos */
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1; /* Permite que .content crezca para ocupar el espacio disponible */
  margin-top: 60px; /* Espacio desde el navbar hasta el contenido principal */
}

.post-list {
  flex: 2; /* Ocupa 2 partes del espacio disponible */
  margin-right: 20px; /* Margen a la derecha de PostList */
}

.last-posts {
  flex: 1; /* Ocupa 1 parte del espacio disponible */
}

.footer {
  background-color: #333; /* Color de fondo del footer */
  color: white; /* Color de texto del footer */
  padding: 20px 0;
  text-align: center;
}
</style>
