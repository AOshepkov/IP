<template>
  <div id="header">
    <img
      id="logo"
      src="@/pictures/Logo.svg"
      onclick="location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'"
    />
    <div id="account">
      <div
      v-if="store.isLogined()"
        style="
          height: 29px;
          width: 29px;
          border-radius: 50%;
          background-color: #dddddd;
          border: 1px solid #b0b0b0;
          text-align: center;
          align-content: center;
        "
      >
        {{ name[0] }}
      </div>
      <div v-if="!store.isLogined()">
        <button
          class="button"
          style="border-radius: 8px; margin: 0px 10px; height:30px"
          @click="router.push({ name: 'log' })"
        >
          log in
        </button>
        or
        <button
          class="button"
          style="border-radius: 8px; margin: 0px 10px; height:30px"
          @click="router.push({ name: 'reg' })"
        >
          sign up
        </button>
      </div>
      <button class="button" style="border-radius: 8px; margin: 0px 10px" v-if="store.isLogined()" @click="Exit()">Exit</button>
    </div>
  </div>
</template>

<script setup>
import { router } from '@/router'
import { computed } from 'vue'
import { useAccountStore } from '@/stores/account'

const store = useAccountStore()
let name = computed(() => store.name)

function Exit() {
  store.setToDefault()
}
</script>

<style>
#header {
  position: sticky;
  top: 0px;
  inset: 0px;
  height: 32px;
  padding: 8px;
  border-radius: 0px 0px 16px 16px;
  /* background-color: rgba(217, 217, 217, 0.6); */
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: 'logo buttons account';
  z-index: 1;
}
#logo {
  margin-left: 10px;
  height: 32px;
  width: 32px;
  grid-area: logo;
  cursor: pointer;
}
#account {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: calc(100% - 4px);
  grid-area: account;
}
</style>
