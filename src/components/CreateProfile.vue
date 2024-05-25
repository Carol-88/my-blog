<template>
  <section>
    <div class="container">
      <h2>Crear perfil</h2>
      <form @submit.prevent="handleSubmit">
        <label for="full_name">Nombre completo:</label>
        <input id="full_name" v-model="full_name" placeholder="Nombre completo" required />

        <label for="avatar_url">URL del avatar:</label>
        <input id="avatar_url" v-model="avatar_url" placeholder="URL del avatar" required />

        <label for="username">Nombre de usuario:</label>
        <input id="username" v-model="username" placeholder="Nombre de usuario" required />

        <button type="submit">Crear perfil</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const full_name = ref('')
const avatar_url = ref('')
const username = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    await userStore.createProfile({
      full_name: full_name.value,
      avatar_url: avatar_url.value,
      username: username.value
    })
    router.push({ path: '/' })
  } catch (error) {
    console.error('Error al crear el perfil:', error.message)
    errorMessage.value = 'Hubo un error al crear el perfil. Por favor, inténtalo de nuevo.'
  }
}
</script>

<style scoped>
/* Estilos aquí */
</style>
