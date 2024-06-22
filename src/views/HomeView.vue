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
  min-height: 100vh;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px 0;
  z-index: 1000;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-grow: 1;
  margin-top: 60px; /* Ajusta este valor si el navbar cambia de altura */
}

.post-list {
  flex: 2;
  margin-right: 20px;
}

.last-posts {
  flex: 1;
}

.footer {
  background-color: #333;
  color: white;
  padding: 20px 0;
  text-align: center;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
  }

  .content {
    flex-direction: column;
  }

  .post-list,
  .last-posts {
    margin: 0;
  }
}
</style>
