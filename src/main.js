// Importaciones necesarias
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
// import { getAnalytics } from 'firebase/analytics'

// Configuración de Firebase (reemplaza los puntos suspensivos con tu configuración real)
const firebaseConfig = {
  apiKey: 'AIzaSyA-Pd4oYt7DIhsUcxQv9cl0vAobT1I_jiQ',
  authDomain: 'caroldev-portfolio.firebaseapp.com',
  projectId: 'caroldev-portfolio',
  storageBucket: 'caroldev-portfolio.appspot.com',
  messagingSenderId: '901343456544',
  appId: '1:901343456544:web:cbb5f58419a46506007b45',
  measurementId: 'G-87DRVE4P4B'
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const app = createApp({
  components: {
    GlobalHeader: () => import('@/components/NavComponent.vue')
    // Asegúrate de que el nombre del componente coincida con el archivo real
    // GlobalFooter: () => import('@/components/FooterComponent.vue')
  }
})

app.use(createPinia())
app.use(router)
app.mount('#app')

// Manejo de errores globalmente en la aplicación Vue
app.config.globalProperties.$errorHandler = (err, instance, info) => {
  console.error(err, info)
  // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
}

export { db, auth }
