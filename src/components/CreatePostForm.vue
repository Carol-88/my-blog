<template>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />
  </head>
  <div class="main-container">
    <img src="/crearpost.png" alt="banner crear post" class="banner-image" />
    <form @submit.prevent="handleSubmit" class="create-post-form">
      <input class="form-input" v-model="post.title" placeholder="Título" required />
      <input class="form-input" v-model="post.subtitle" placeholder="Subtítulo" required />
      <input class="form-input" v-model="post.image" placeholder="URL de la imagen" required />
      <div id="quill-editor" class="form-textarea"></div>
      <input class="form-date-input" type="date" v-model="post.date" required />
      <button type="submit">Publicar</button>
    </form>
  </div>
</template>

<script setup>
import { usePostStore } from '../stores/postStore'
import { toRef } from 'vue'
import { onMounted } from 'vue'
import Quill from 'quill'

onMounted(() => {
  initQuillEditor()
})

function initQuillEditor() {
  const quill = new Quill('#quill-editor', {
    placeholder: 'Compose an epic...',
    theme: 'snow'
  })

  // Vincula el contenido del editor a tu modelo de datos
  quill.on('text-change', () => {
    post.value.text = quill.root.innerHTML
  })
}

const postStore = usePostStore()
const post = toRef(postStore, 'post')

const handleSubmit = async () => {
  try {
    await postStore.createPost(post.value)
    alert('Post creado exitosamente!')
    // Limpiar el formulario después de la creación del post
    post.value = {
      title: '',
      subtitle: '',
      image: '',
      text: '',
      date: ''
    }
  } catch (error) {
    console.error('Error al crear el post:', error)
    alert('Hubo un error al crear el post. Por favor, inténtalo de nuevo.')
  }
}
</script>

<style scoped>
#quill-editor {
  min-height: 200px; /* Ajusta según sea necesario */
  max-height: 300px; /* Limita la altura máxima si es necesario */
  background-color: #eaebf4;
}

input {
  background-color: #eaebf4;
}

textarea {
  background-color: #eaebf4;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%; /* Asegura que el contenedor ocupe toda la altura disponible */
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  padding: 0 0 2rem 0;
}

.banner-image {
  width: 100%;
  height: 400px; /* Mantiene la relación de aspecto */
  object-fit: cover; /* Asegura que la imagen cubra el área sin distorsionarse */
}

.create-post-form {
  display: flex;
  max-width: 750px;
  height: 600px;
  width: 90%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

/* Los estilos para los inputs y botones pueden mantenerse similares, pero puedes ajustar los colores y sombras para mejorar la coherencia visual */

.form-input,
.form-textarea,
.form-date-input {
  padding: 21px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
button[type='submit'] {
  align-self: center; /* Centra el botón verticalmente si el formulario usa flexbox */
  margin-top: 20px; /* Añade un margen superior si es necesario */
}

.form-textarea {
  resize: none;
  min-height: 120px; /* Altura mínima para el textarea */
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
