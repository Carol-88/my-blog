// stores/user.js
import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import router from '@/router'
import { auth } from '@/main' // Asegúrate de importar 'auth' desde 'main.js'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: null,
    errorMessage: null,
    isLoading: false
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    async signUp(email, password) {
      this.isLoading = true
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        console.log('Usuario registrado:', this.user)
        // Aquí puedes agregar el envío de eventos a Google Analytics si es necesario
      } catch (error) {
        console.error('Error registrando usuario:', error.code, error.message)
        this.errorMessage = 'Error al registrar usuario. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async signInWithEmail(email, password) {
      this.isLoading = true
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
        this.errorMessage = null
        router.push({ path: '/' })
      } catch (error) {
        console.error('Error al iniciar sesión:', error.code, error.message)
        this.errorMessage = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    async signOut() {
      this.isLoading = true
      try {
        await signOut(auth)
        this.user = null
        this.errorMessage = null
        router.push({ path: '/login' })
      } catch (error) {
        console.error('Error al cerrar sesión:', error.code, error.message)
        this.errorMessage = 'Error al cerrar sesión. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    },
    listenToAuthChanges() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user = user
          this.errorMessage = null
        } else {
          this.user = null
        }
      })
    }
  }
})
