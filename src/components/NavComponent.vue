<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/auth">Login / Register</router-link>
    <router-link to="/profile">Profile</router-link>
    <router-link to="/createpost">Create Post</router-link>
    <button @click="handleLogout">Logout</button>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user' // Ajusta la ruta según la ubicación real de tu store

const router = useRouter()
const userStore = useUserStore()

const handleLogout = async () => {
  await userStore.signOut()
  router.push('/auth') // O puedes redirigir a '/' si prefieres enviar al usuario a la página de inicio después de cerrar sesión
}
</script>

<style scoped>
/* Estilos base para la barra de navegación */
.nav {
  display: flex; /* Utiliza Flexbox para organizar los elementos */
  justify-content: space-around; /* Distribuye los elementos uniformemente */
  padding: 20px 40px; /* Espaciado interno */
  background-color: #333; /* Color de fondo oscuro */
  color: white; /* Color del texto */
}

/* Estilos para los enlaces de navegación */
.nav a {
  color: inherit; /* Hereda el color del texto del contenedor padre (.nav) */
  text-decoration: none; /* Elimina el subrayado */
  transition: color 0.3s ease; /* Transición suave para el color del enlace */
}

.nav a:hover {
  color: #ddd; /* Cambia el color del enlace al pasar el mouse */
}

/* Estilos para pantallas pequeñas (menores a 768px) */
@media (max-width: 768px) {
  .nav {
    flex-direction: column; /* Cambia a dirección de columna */
    align-items: center; /* Centra los elementos verticalmente */
  }

  .nav a {
    margin-bottom: 10px; /* Agrega margen inferior a los enlaces */
  }
}
</style>
