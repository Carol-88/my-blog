import { defineStore } from 'pinia'
import supabase from '@supabase/supabase-js'

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
    async fetchPostList() {
      try {
        const { data, error } = await supabase.from('posts').select('*')
        if (error) {
          this.errorMessage = 'Error al obtener la lista de posts.'
          throw error
        }
        if (data && data.length > 0) {
          this.posts = data
          this.errorMessage = null
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
    updateSocialLinks({ linkedin, x, instagram }) {
      this.post.socialLinks.linkedin = linkedin
      this.post.socialLinks.x = x
      this.post.socialLinks.instagram = instagram
    },
    updateDate(date) {
      this.post.date = new Date(date)
    }
  }
})
