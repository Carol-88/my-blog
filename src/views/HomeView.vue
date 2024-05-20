<template>
  <div class="home">
    <h1>Tech para noobs</h1>
    <section class="content">
      <PostList />
      <LastPosts />
    </section>
  </div>
</template>

<script setup>
import PostList from '../components/PostList.vue'
import LastPosts from '../components/LastPosts.vue'
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
  color: aliceblue;
  background-color: none;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.PostList {
  flex: 1;
  margin-right: 20px; /* Margen a la derecha de PostList */
}

.LastPosts {
  flex: 1;
  margin-left: 20px; /* Margen a la izquierda de LastPosts */
}
</style>
