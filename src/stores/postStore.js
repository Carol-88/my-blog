// stores.postStore.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const usePostStore = defineStore({
  id: 'post',
  state: () => ({
    posts: [],
    activePost: null,
    post: {
      title: '',
      subtitle: '',
      image: null,
      text: '',
      author_name: '',
      date: ''
    },
    errorMessage: '',
    isLoading: false // Añadir un estado de carga
  }),
  actions: {
    async fetchPostList() {
      this.isLoading = true
      try {
        const { data, error } = await supabase.from('posts').select('*')
        if (error) throw error
        if (data) {
          this.posts = data
          this.errorMessage = ''
        }
      } catch (error) {
        console.error('Error al obtener la lista de posts:', error.message)
        this.errorMessage =
          'Error al obtener la lista de posts. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
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
    async loadPostById(id) {
      this.isLoading = true
      try {
        const { data: posts, error } = await supabase.from('posts').select('*').eq('id', id)
        if (error) throw error
        const post = posts[0]
        if (post) {
          this.activePost = post
        } else {
          console.log('Post not found')
        }
      } catch (error) {
        console.error('Error al cargar el post por ID:', error.message)
        this.errorMessage = 'Error al cargar el post. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async createPost() {
      this.isLoading = true
      try {
        const { data, error } = await supabase.from('posts').insert([this.post])
        if (error) throw error
        if (data) {
          this.fetchPostList()
          this.errorMessage = ''
        }
      } catch (error) {
        console.error('Error al crear el post:', error.message)
        this.errorMessage = 'Error al crear el post. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    }
  }
})
