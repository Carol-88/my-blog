<template>
  <section class="container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleSubmit">
      <input v-model="loginEmail" type="email" placeholder="Correo electrónico" required />
      <input v-model="loginPassword" type="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar sesión</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user.js'
import { usePostStore } from '../stores/postStore.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const loginEmail = ref('')
const loginPassword = ref('')

const handleSubmit = async () => {
  try {
    await userStore.signInWithEmail(loginEmail.value, loginPassword.value)
    if (userStore.user) {
      await userStore.fetchUser()
      await usePostStore.fetchPostsList()
      router.push({ path: '/' })
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message)
    alert('Error al iniciar sesión. Por favor, verifica el correo electrónico y la contraseña.')
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h2 {
  text-align: center;
  color: darkred;
  margin-bottom: 20px;
}

button {
  width: 200px;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 400px;
  margin-top: 5rem;
}
</style>
