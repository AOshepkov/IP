<template>
  <div class="container cont1">
    <img class="brain" src="@/pictures/Brain.svg" />
  </div>
  <div class="back">
    <div class="form">
      <div class="maintext">Sign up</div>
      <input class="input" placeholder="Login" v-model="login"/>
      <input class="input" placeholder="Password" v-model="password" type="password"/>
      <input
        class="input"
        placeholder="Repeat password"
        style="margin-bottom: 3vh"
        v-model="rePassword"
        type="password"
      />
      <div class="form_error" v-if="Err">{{ Err }}</div>
      <button class="button formbutt" @click="SendReq()">Sign up</button>
      <div
        style="cursor: pointer; margin: 2vh auto; width: max-content"
        @click="router.push({ name: 'log' })"
      >
        or log in
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue';
import axios from '../stores/axios';
import { useAccountStore } from '@/stores/account';

const store = useAccountStore()
let login = ref('')
let password = ref('')
let rePassword = ref('')
let Err = ref('')

async function SendReq() {
  if (!login.value) {
    Err.value = 'Введите логин'
    return
  } else if (!password.value) {
    Err.value = 'Введите пароль'
    return
  } else if (!rePassword.value) {
    Err.value = 'Введите пароль повторно'
    return
  } else if (rePassword.value !== password.value) {
    Err.value = 'Пароль не совпадает'
    return
  }
  try {
    const res = await axios.post('/reg', {
      login: login.value,
      password: password.value
    })
    store.SetId(res.data._id)
    store.SetName(res.data.login)
    store.SetToken(res.data.token)
    router.push({name:'home type="password"'})
  } catch (err) {
    const serverError = err.response.data
    if (serverError.type == 'array') {Err.value = serverError.message[0].msg
    } else if (serverError.type == 'string') {Err.value = serverError.message} else {
      console.log(serverError)
    }
  }
}
</script>

<style>
.cont1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: '. logo';
}
.brain {
  grid-area: logo;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 24px);
  height: calc(100% - 96px);
  filter: blur(10px);
}
.maintext {
  text-align: center;
  font-size: 2em;
  margin-top: 0.25em;
}
.back {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    '. . .'
    '. reg .'
    '. . .';
  position: absolute;
  top: 0px;
}
.form {
  grid-area: reg;
  background-color: #d9d9d9;
  border-radius: 10px;
  height: calc(100% - 5vh);
  width: calc(100% - 5vw);
  padding: 2.5vh 2.5vw;
  text-align: center;
}
.input {
  display: block;
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 100%;
  height: 5vh;
  border-radius: 8px;
  border: none;
  background-color: #c3c3c3;
}
.formbutt {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3vh;
  height: 5vh;
  border-radius: 8px;
}
.form_error {
  position: relative;
  height: 7vh;
  width: 100%;
  background-color: rgba(255, 118, 118, 0.3);
  border-radius: 8px;
  align-content: center;
  color: #8f7676;
}
</style>
