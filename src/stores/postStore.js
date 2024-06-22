import { collection, addDoc, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase' // Asegúrate de tener un archivo firebase.js que exporte tu instancia de Firestore
import { defineStore } from 'pinia'

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
    isLoading: false
  }),
  actions: {
    async fetchPostList() {
      this.isLoading = true
      try {
        const q = query(collection(db, 'posts'), orderBy('date', 'desc'))
        const querySnapshot = await getDocs(q)
        this.posts = []
        querySnapshot.forEach((doc) => {
          let postData = doc.data()
          postData.id = doc.id // Agregar el ID del documento a los datos del post
          this.posts.push(postData)
        })
        this.errorMessage = ''
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
        const docRef = doc(db, 'posts', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          let postData = docSnap.data()
          postData.id = docSnap.id // Agregar el ID del documento a los datos del post
          this.activePost = postData
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
        const docRef = await addDoc(collection(db, 'posts'), this.post)
        console.log('Document written with ID: ', docRef.id)
        this.fetchPostList() // Actualizar la lista de posts después de crear uno nuevo
        this.errorMessage = ''
      } catch (error) {
        console.error('Error al crear el post:', error.message)
        this.errorMessage = 'Error al crear el post. Por favor, inténtalo de nuevo más tarde.'
      } finally {
        this.isLoading = false
      }
    }
  }
})
