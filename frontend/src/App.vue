<template>
  <HeaderView />
  <RouterView />
</template>

<script setup>
import HeaderView from './views/HeaderView.vue'
import { useAccountStore } from './stores/account';
import axios from './stores/axios';
import { onBeforeMount } from 'vue';

const userStore = useAccountStore()

onBeforeMount(async () => {
  try {
    const res = await axios.get('/me')
    userStore.SetId(res.data._id)
    userStore.SetName(res.data.login)
    userStore.SetToken(res.data.token)
  } catch (err) {
    console.log(err)
  }
})
</script>

<style>
body {
  margin: 0px;
  background-color: #dddddd;
}
#app {
  height: 100vh;
}
.button {
  background-color: #676bbe;
  user-select: none;
  cursor: pointer;
  width: max-content;
}
.button:hover {
  animation-play-state: paused;
}
.no-select {
  user-select: none;
}
.container {
  background: radial-gradient(at 80% 50%, #686ff5, #5055bc 52%, #3d418f);
  position: relative;
  top: -48px;
  height: 100vh;
  width: 100vw;
}
</style>
