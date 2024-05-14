import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    post: {
      title: '',
      subtitle: '',
      image: null,
      text: '',
      authorName: '',
      socialLinks: {
        linkedin: '',
        x: '',
        instagram: ''
      },
      date: ''
    }
  }),
  actions: {
    updatePostTitle(title) {
      this.post.title = title
    }
    // Agregar más acciones para actualizar otros campos del post
  }
})
