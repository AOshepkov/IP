<template>
  <WinCard v-if="isWin" :inf="{ stage: stage, mist: mistakes }" />
  <StartCard v-if="!isEnabled" :card="ExcrcDesc[2]" @start="Start()" />
  <div
    class="excrc_grid"
    :style="{ filter: 'blur(' + 4 * (!isEnabled + isWin) + 'px)' }"
  >
    <div
      style="
        height: calc(min(100vh - 96px, 100vw - 96px));
        width: 80vw;
        grid-area: table;
      "
      :class="{ correct: mist == -1, incorrect: mist == 1 }"
    >
      <div style="position: relative; top: 10px">
        <div style="margin: 0px auto; width: max-content">
          <button
            class="button"
            style="height: 24px; border-radius: 8px; margin: 0px 10px"
            @click="Render(false)"
            v-if="isEnabled"
          >
            ◄No
          </button>
          <button
            class="button"
            style="height: 24px; border-radius: 8px; margin: 0px 10px"
            @click="Render(true)"
            v-if="isEnabled"
          >
            Yes►
          </button>
        </div>
      </div>
      <div id="Excrc3_rod"></div>
      <div class="excrc3_text">
        <h2 style="position: relative; text-align: center; margin: 0px">
          Is the number odd?
        </h2>
        <h1 style="text-align: center" v-if="pos">
          {{ obj.num }}{{ obj.let }}
        </h1>
      </div>
      <div class="excrc3_text" style="top: 25%; flex-direction: column">
        <h2 style="position: relative; text-align: center; margin: 0px">
          Is the letter vowel?
        </h2>
        <h1 style="text-align: center" v-if="!pos">
          {{ obj.num }}{{ obj.let }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import WinCard from './WinCard.vue'
import StartCard from './StartCard.vue'
import axios from '@/stores/axios'
import { ExcrcDesc } from '@/stores/excercises'
import { ref } from 'vue'
import { useAccountStore } from '@/stores/account'

const userStore = useAccountStore()
const alp = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]
const vowalp = ['A', 'E', 'I', 'O', 'U', 'Y']

let isEnabled = ref(false)
let isWin = ref(false)
let obj = ref({ num: 0, let: 'A' })
let pos = ref(false)
let stage = ref(0)
let mist = ref(0)
let mistakes = ref(0)
let interval = 0
let time = ref(10000)
let sec = ref(10000)
let combo = ref(0)

function Start() {
  isEnabled.value = true
  obj.value = {
    num: Math.floor(1 + Math.random() * 9),
    let: alp[Math.floor(Math.random() * 26)],
  }
  pos.value = Boolean(Math.floor(Math.random() * 2))
  document.addEventListener('keydown', event => {
    if (event.code == 'ArrowLeft') {
      Render(false)
    }
    if (event.code == 'ArrowRight') {
      Render(true)
    }
  })
  let dat = Date.now()
  interval = setInterval(() => {
    sec.value = Math.floor(dat + time.value - Date.now())
    if (sec.value <= 0) {
      Stop()
    }
  }, 250)
}
function Render(bool) {
  if (isWin.value) {
    return 0
  }
  if (
    (bool &&
      ((pos.value && obj.value.num % 2 == 0) ||
        (!pos.value && vowalp.includes(obj.value.let)))) ||
    (!bool &&
      ((pos.value && obj.value.num % 2 == 1) ||
        (!pos.value && !vowalp.includes(obj.value.let))))
  ) {
    stage.value++
    mist.value = -1
    setInterval(() => (mist.value = 0), 1000)
    time.value += Math.max(100 * 1.1 ** combo.value, 500)
    combo.value++
  } else {
    mistakes.value++
    mist.value = 1
    setTimeout(() => (mist.value = 0), 1000)
    time.value -= 1000
    combo.value = 0
  }
  obj.value = {
    num: Math.floor(1 + Math.random() * 9),
    let: alp[Math.floor(Math.random() * 26)],
  }
  pos.value = Boolean(Math.floor(Math.random() * 2))
}
async function Stop() {
  clearInterval(interval)
  isWin.value = true
  try {
    await axios.post('/addlog',{
      id: 3,
      stats: {
        stage: stage.value,
        mistakes: mistakes.value
      }},
    {
      headers: {
        Authorization: 'Bearer ' + userStore.token
      },
    })
  } catch (err) {
    console.log(err)
  }
}
</script>

<style>
#Excrc3_rod {
  position: relative;
  height: 4px;
  width: 50%;
  background-color: black;
  border-radius: 2px;
  top: 50%;
  left: 25%;
}
.excrc3_text {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  height: 25%;
  width: 50%;
  top: calc(25% - 8px);
  left: 25%;
}
.correct {
  animation: cor 0.5s;
}
.incorrect {
  animation: inc 0.5s;
}
@keyframes cor {
  from {
    background-color: rgb(178, 255, 100);
  }
  to {
    background-color: #dddddd;
  }
}
@keyframes inc {
  from {
    background-color: rgb(255, 121, 121);
  }
  to {
    background-color: #dddddd;
  }
}
</style>
