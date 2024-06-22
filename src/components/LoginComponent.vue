<template>
  <div class="container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Correo electrónico"
          :class="{ 'is-invalid': emailError }"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Contraseña"
          :class="{ 'is-invalid': passwordError }"
        />
        <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const email = ref('')
const password = ref('')

const emailError = computed(() => {
  if (!email.value) return 'El correo electrónico es requerido.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) return 'El correo electrónico no es válido.'
  return null
})

const passwordError = computed(() => {
  if (!password.value) return 'La contraseña es requerida.'
  return null
})

const handleSubmit = async () => {
  if (!emailError.value && !passwordError.value) {
    try {
      await userStore.signInWithEmail(email.value, password.value)
      const router = useRouter()
      router.push('/')
    } catch (error) {
      alert('Error al iniciar sesión:', error.message)
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin-top: 5rem;
}

h2 {
  text-align: center;
  color: darkblue;
  margin-bottom: 20px;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
