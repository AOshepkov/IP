<template>
  <div id="Excrc0Desc" v-if="select.card.Title">
    <img :src="select.card.src" id="Excrc0Img" />
    <div id="Excrc0Title1">
      <h1>{{ select.card.Title }}</h1>
      <div>{{ select.card.Description }}</div>
    </div>
    <div style="grid-area: opt1">
      <button id="Excrc0Button" class="button" @click="Start()">Start</button>
      <label
        v-if="'params' in select.card && select.card.params.includes('diff')"
        >Difficulty: {{ diffName
        }}<input type="range" min="0" max="4" v-model="diff" />
      </label>
      <label
        style="display: block"
        v-if="'params' in select.card && select.card.params.includes('hardver')"
        ><input type="checkbox" v-model="isHard" /> Hard Version</label
      >
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useExcrcStore } from '@/stores/excrc'
import { computed, ref } from 'vue'
const select = defineProps(['card'])
const store = useExcrcStore()
const diffstore = {
  0: 'Easy',
  1: 'Normal',
  2: 'Hard',
  3: 'Harder',
  4: 'Insane',
}

let diff = ref(0)
let isHard = ref(false)
let diffName = computed(() => {
  for (let key in diffstore) {
    if (diff.value == key) {
      return diffstore[key]
    }
  }
  return 'None'
})

function Start() {
  router.push({ name: select.card.name })
  store.setCard(select.card)
  if ('params' in select.card) {
    if (select.card.params.includes('diff')) {
      store.setDiff(diff.value)
    }
    if (select.card.params.includes('hardver')) {
      store.setStatus(isHard.value)
    }
  }
}
</script>

<style>
#Excrc0Desc {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 200px 1fr;
  grid-template-areas: 'img text' 'opt1 opt2';
  height: calc(100% - 20px);
  width: calc(100% - 30px);
  margin-left: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #d1d1d1;
}
#Excrc0Img {
  grid-area: img;
  height: 200px;
  width: 200px;
}
#Excrc0Title1 {
  display: inline-block;
  vertical-align: top;
  margin-left: 15px;
}
#Excrc0Button {
  display: block;
  height: 30px;
  width: 60px;
  border-radius: 10px;
  margin: 20px auto;
}
</style>
