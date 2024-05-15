import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    post: {
      title: '',
      subtitle: '',
      image: null,
      text: '',
      author_name: '',
      date: ''
    },
    errorMessage: ''
  }),
  actions: {
    async fetchPostList() {
      try {
        const { data, error } = await supabase.from('posts').select('*')
        if (error) {
          this.errorMessage = 'Error al obtener la lista de posts.'
          throw error
        }
        if (data && data.length > 0) {
          this.posts = data
          this.errorMessage = ''
        }
      } catch (error) {
        console.error('Error al obtener la lista de posts:', error.message)
        this.errorMessage =
          'Error al obtener la lista de posts. Por favor, inténtalo de nuevo más tarde.'
      }
    },
    updatePostTitle(title) {
      this.post.title = title
    },
    updateSubtitle(subtitle) {
      this.post.subtitle = subtitle
    },
    updateImage(image) {
      this.post.image = image
    },
    updateText(text) {
      this.post.text = text
    },
    updateDate(date) {
      this.post.date = new Date(date)
    },
    updatePost(postData) {
      Object.assign(this.post, postData)
    },
    updateAuthorName(author_name) {
      this.post.author_name = author_name
    },
    async createPost() {
      try {
        const { data, error } = await supabase.from('posts').insert([this.post])
        if (error) {
          this.errorMessage = 'Error al crear el post.'
          throw error
        }
        if (data) {
          this.fetchPostList() // Refrescar la lista de posts después de crear uno
          this.errorMessage = ''
        }
      } catch (error) {
        console.error('Error al crear el post:', error.message)
        this.errorMessage = 'Error al crear el post. Por favor, inténtalo de nuevo más tarde.'
      }
    }
  }
})
