<template>
  <div class="container cont1">
    <img class="brain" src="@/pictures/Brain.svg" />
  </div>
  <div class="back">
    <div class="form">
      <div class="maintext">Log in</div>
      <input class="input" placeholder="Login" v-model="login"/>
      <input
        class="input"
        placeholder="Password"
        style="margin-bottom: 3vh"
        v-model="password"
        type="password"
      />
      <div class="form_error" v-if="Err">{{ Err }}</div>
      <button
        class="button formbutt"
        @click="SendReq()"
      >
        Log in
      </button>
      <div
        style="cursor: pointer; margin: 2vh auto; width: max-content"
        @click="router.push({ name: 'reg' })"
      >
        or sign up
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import axios from '../stores/axios'
import { ref } from 'vue'
import { useAccountStore } from '@/stores/account'

const store = useAccountStore()
let login = ref('')
let password = ref('')
let Err = ref('')

async function SendReq() {
  try {
    const res = await axios.post('/log',{
      login: login.value,
      password: password.value
    })
    store.SetId(res.data._id)
    store.SetName(res.data.login)
    store.SetToken(res.data.token)
    router.push({name:'home'})
  } catch (err) {
    Err.value = err.response.data.message
    console.log(Err.value)
  }
}
</script>
