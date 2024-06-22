<template>
  <section class="auth-page">
    <article class="auth-container">
      <h2>Iniciar Sesión</h2>
      <LoginComponent />
    </article>
  </section>
</template>

<script setup>
import LoginComponent from '@/components/LoginComponent.vue'
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.auth-container {
  width: 80%;
  max-width: 400px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.auth-container h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
