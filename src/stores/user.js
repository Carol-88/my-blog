// stores.user.js
import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import router from '@/router'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    profile: null,
    errorMessage: null,
    isLoading: false // Añadir un estado de carga
  }),
  getters: {
    isLoggedIn: (state) => !!state.user // Devuelve true si user no es null
  },
  actions: {
    async fetchUser() {
      this.isLoading = true
      try {
        const { data, error } = await supabase.auth.getUser()
        if (error) throw error
        if (data) {
          this.user = data.user
          this.errorMessage = null
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error.message)
        this.errorMessage = 'Error al obtener el usuario. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async signUp(email, password) {
      this.isLoading = true
      try {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data) {
          this.user = data.user
          this.errorMessage = null
        }
      } catch (error) {
        console.error('Error al registrarse:', error.message)
        this.errorMessage = 'Error al registrarse. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async signInWithEmail(email, password) {
      this.isLoading = true
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        if (data) {
          this.user = data.user
          this.errorMessage = null
          router.push({ path: '/' })
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error.message)
        this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async signOut() {
      this.isLoading = true
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = null
        this.errorMessage = null
        router.push({ path: '/login' })
      } catch (error) {
        console.error('Error al cerrar sesión:', error.message)
        this.errorMessage = 'Error al cerrar sesión. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async fetchProfile() {
      if (!this.user || !this.user.id) {
        this.errorMessage = 'No hay usuario seleccionado o no inició sesión.'
        return
      }
      this.isLoading = true
      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', this.user.id)
        if (error) throw error
        if (!data || data.length === 0) {
          this.errorMessage = 'Perfil no encontrado.'
          return
        }
        this.profile = data[0]
        this.errorMessage = null
      } catch (error) {
        console.error('Error al obtener el perfil:', error.message)
        this.errorMessage = 'Error al obtener el perfil. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async updateProfile({ full_name, avatar_url, username }) {
      if (!this.user || !this.user.id) {
        this.errorMessage = 'No hay usuario seleccionado o no inició sesión.'
        return
      }
      this.isLoading = true
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            full_name: full_name || this.profile.full_name,
            avatar_url: avatar_url || this.profile.avatar_url,
            username: username || this.profile.username
          })
          .eq('id', this.user.id)
        if (error) throw error
        this.profile = { full_name, avatar_url, username }
        this.errorMessage = null
      } catch (error) {
        console.error('Error al actualizar el perfil:', error.message)
        this.errorMessage =
          'Error al actualizar el perfil. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async deleteUser() {
      this.isLoading = true
      try {
        const { error } = await supabase.from('users').delete().eq('id', this.user?.id)
        if (error) throw error
        this.user = null
        this.errorMessage = null
      } catch (error) {
        console.error('Error al eliminar el usuario:', error.message)
        this.errorMessage = 'Error al eliminar el usuario. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    }
  }
})
