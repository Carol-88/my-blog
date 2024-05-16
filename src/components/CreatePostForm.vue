<template>
  <div class="main-container">
    <img src="/crearpost.png" alt="banner crear post" class="banner-image" />
    <form @submit.prevent="handleSubmit" class="create-post-form">
      <input class="form-input" v-model="post.title" placeholder="Título" required />
      <input class="form-input" v-model="post.subtitle" placeholder="Subtítulo" required />
      <input class="form-input" type="text" placeholder="URL image" required />
      <textarea
        class="form-textarea"
        v-model="post.text"
        placeholder="Texto del post"
        required
      ></textarea>
      <input class="form-date-input" type="date" v-model="post.date" required />
      <button class="form-button" type="submit">Publicar</button>
    </form>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { toRefs } from 'vue'

const postStore = usePostStore()
const { post } = toRefs(postStore)

const handleSubmit = async () => {
  try {
    await postStore.createPost(post)
    alert('Post creado exitosamente!')
  } catch (error) {
    console.error('Error al crear el post:', error)
    alert('Hubo un error al crear el post. Por favor, inténtalo de nuevo.')
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura disponible */
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  padding: 0 2rem 2rem 0;
}

.banner-image {
  max-width: 1200px; /* Limita el ancho máximo para evitar distorsión */
  height: 400px; /* Mantiene la relación de aspecto */
  object-fit: contain; /* Asegura que la imagen cubra el área sin distorsionarse */
}

.create-post-form {
  max-width: 1200px; /* Define un ancho máximo para el formulario */
  width: 90%; /* Utiliza un porcentaje para adaptabilidad */
  background-color: #ffffff; /* Fondo blanco para un look más limpio */
  border-radius: 12px; /* Bordes más redondeados para un aspecto moderno */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave para profundidad */
  padding: 20px; /* Espacio interno para contenido */
  margin-top: 20px; /* Espacio desde la imagen hasta el formulario */
}

/* Los estilos para los inputs y botones pueden mantenerse similares, pero puedes ajustar los colores y sombras para mejorar la coherencia visual */

.form-input,
.form-textarea,
.form-date-input {
  padding: 12px;
  border: 1px solid #ddd; /* Color de borde más claro */
  border-radius: 8px; /* Bordes redondeados */
  font-size: 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* Sombra muy suave */
  margin-bottom: 10px; /* Espacio entre elementos */
}

.form-textarea {
  resize: none;
  min-height: 120px; /* Altura mínima para el textarea */
}

.form-button {
  padding: 12px 24px;
  background-color: #007bff; /* Mantén el color azul vibrante para el botón */
  color: white;
  border: none;
  border-radius: 8px; /* Bordes redondeados */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #0056b3; /* Cambio de color al pasar el mouse */
}

/* Media query para dispositivos móviles */
@media (max-width: 768px) {
  .create-post-form {
    padding: 15px;
  }

  .form-input,
  .form-textarea,
  .form-date-input {
    font-size: 14px;
  }

  .form-button {
    padding: 8px 16px;
  }
}
</style>
