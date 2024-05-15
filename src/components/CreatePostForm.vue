<template>
  <div class="create-post-form">
    <form @submit.prevent="handleSubmit">
      <input class="form-input" v-model="post.title" placeholder="Título" required />
      <input class="form-input" v-model="post.subtitle" placeholder="Subtítulo" required />
      <input class="form-input" type="text" placeholder="URL image" />
      <textarea
        class="form-textarea"
        v-model="post.text"
        placeholder="Texto del post"
        required
      ></textarea>
      <input
        class="form-input"
        type="text"
        v-model="post.author_name"
        placeholder="Nombre del Autor"
        required
      />
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
body {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}

.create-post-form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-input,
.form-textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.form-textarea {
  resize: none;
  min-height: 100px;
}

.form-date-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.form-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #0056b3;
}

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
