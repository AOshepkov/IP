<template>
  <div id="WinCard0">
    <div id="WinCard1" style="text-align: center">
      <h1 style="margin: 5px 0px">Congrats!</h1>
      <h2 v-if="!(inf.inf.diff === undefined)" style="display: flex">
        Difficulty: {{ diffName }}
        <div
          v-if="!(inf.inf.hard === undefined) && inf.inf.hard"
          style="color: red; margin-left: 10px"
        >
          HardVersion
        </div>
      </h2>
      <h2 v-if="!(inf.inf.time === undefined)" style="text-align: left">
        Time: {{ Math.floor(inf.inf.time / 1000) }}s {{ inf.inf.time % 1000 }}ms
      </h2>
      <h2 v-if="!(inf.inf.stage === undefined)" style="text-align: left">
        Stage: {{ inf.inf.stage }}
      </h2>
      <h2 v-if="!(inf.inf.mist === undefined)" style="text-align: left">
        Mistakes: {{ inf.inf.mist }}
      </h2>
      <div>
        <button
          class="button"
          style="height: 30px; border-radius: 10px"
          @click="router.push({ name: 'excrcs' })"
        >
          go to menu
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { computed } from 'vue'
const inf = defineProps(['inf'])
const diffstore = {
  0: 'Easy',
  1: 'Normal',
  2: 'Hard',
  3: 'Harder',
  4: 'Insane',
}

let diffName = computed(() => {
  for (let key in diffstore) {
    if (inf.inf.diff == key) {
      return diffstore[key]
    }
  }
  return 'None'
})
</script>

<style>
#WinCard0 {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    '. . .'
    '. card .'
    '. . .';
}
#WinCard1 {
  grid-area: card;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #b0b0b0;
  border-radius: 10px;
  background-color: #dddddd;
  z-index: 1;
}
</style>
