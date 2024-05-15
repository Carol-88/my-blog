<template>
  <NavComponent />
  <section>
    <div class="container">
      <h2>Editar perfil</h2>
      <form @submit.prevent="updateProfile">
        <input v-model="full_name" placeholder="Nombre completo" required />
        <input v-model="avatar_url" placeholder="URL del avatar" required />
        <input v-model="username" placeholder="Nombre de usuario" required />
        <button type="submit">Actualizar perfil</button>
      </form>
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
    successMessage.value = 'Hubo un error al actualizar el perfil. Por favor, inténtalo de nuevo.'
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
