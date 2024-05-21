<template>
  <div v-if="profile" class="user-card">
    <img :src="profile.avatar_url" alt="Avatar" class="avatar" />
    <div class="userinfo">
      <p class="full-name">{{ profile.full_name }}</p>
      <em class="username">{{ profile.username }}</em>
    </div>
  </div>
  <div v-else class="user-card empty-profile">
    <p>No hay perfil disponible</p>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { profile } = storeToRefs(userStore)
</script>

<style scoped>
.user-card {
  display: flex;
  gap: 1rem;
  border-radius: 8px;
  padding: 16px;
  width: 250px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  justify-content: space-around;
  align-items: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.full-name {
  font-size: 1.1rem;
  font-weight: bold;
}

.username {
  font-size: 0.9rem;
  color: #666;
}

.empty-profile {
  padding: 16px;
}

.empty-profile p {
  margin: 0;
}
</style>
