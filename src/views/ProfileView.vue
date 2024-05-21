<template>
  <section>
    <div class="container">
      <h2>Editar perfil</h2>
      <form @submit.prevent="updateProfile">
        <label for="full_name">Nombre completo:</label>
        <input id="full_name" v-model="full_name" placeholder="Nombre completo" required />

        <label for="avatar_url">URL del avatar:</label>
        <input id="avatar_url" v-model="avatar_url" placeholder="URL del avatar" required />

        <label for="username">Nombre de usuario:</label>
        <input id="username" v-model="username" placeholder="Nombre de usuario" required />

        <button type="submit">Actualizar perfil</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const full_name = ref('')
const avatar_url = ref('')
const username = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const updateProfile = async () => {
  try {
    await userStore.updateProfile(full_name.value, avatar_url.value, username.value)

    full_name.value = ''
    avatar_url.value = ''
    username.value = ''
    successMessage.value = 'Perfil actualizado con éxito!'
  } catch (error) {
    console.error('Error al actualizar el perfil:', error.message)
    errorMessage.value = 'Hubo un error al actualizar el perfil. Por favor, inténtalo de nuevo.'
  }
  await userStore.fetchProfile()
}
</script>

<style scoped>
p {
  font-weight: 600;
}
.userinfo {
  padding: 0 2rem;
  text-align: start;
  color: darkred;
}

section {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  width: 100vw;
}

@media (max-width: 768px) {
  .container {
    width: 70%;
  }
}
</style>
