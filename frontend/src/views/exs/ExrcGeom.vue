<template>
  <WinCard v-if="isWin" :inf="{ stage: stage, mist: mistakes }" />
  <StartCard v-if="!isEnabled" :card="ExcrcDesc[3]" @start="Start()" />
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
          {{ quest[0].question }}
        </h2>
        <div style="text-align: center" v-if="pos == 0">
          <div
            style="height: 15vh; width: 15vh; margin: auto auto"
            :style="obj.css"
          ></div>
        </div>
      </div>
      <div class="excrc3_text" style="top: 25%; flex-direction: column">
        <h2 style="position: relative; text-align: center; margin: 0px">
          {{ quest[1].question }}
        </h2>
        <div style="text-align: center" v-if="pos == 1">
          <div
            style="height: 15vh; width: 15vh; margin: auto auto"
            :style="obj.css"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import WinCard from './WinCard.vue'
import StartCard from './StartCard.vue'
import axios from '@/stores/axios'
import { ExcrcDesc, ExcrcGeom } from '@/stores/excercises'
import { useAccountStore } from '@/stores/account'
import { ref } from 'vue'

const userStore = useAccountStore()

let isEnabled = ref(false)
let isWin = ref(false)
let obj = ref({ col: 'red', shape: 'circle', css: '' })
let pos = ref(-1)
let stage = ref(0)
let mist = ref(0)
let mistakes = ref(0)
let interval = 0
let time = ref(10000)
let sec = ref(10000)
let combo = ref(0)

const quest = [
  ExcrcGeom.col[Math.floor(Math.random() * 3)],
  ExcrcGeom.shape[Math.floor(Math.random() * 3)],
]

function Start() {
  isEnabled.value = true
  pos.value = Math.floor(Math.random() * 2)
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
  SetObj()
}

function Render(bool) {
  if (isWin.value) {
    return 0
  }
  if (
    (bool &&
      ((pos.value && quest[1].js(obj.value)) ||
        (!pos.value && quest[0].js(obj.value)))) ||
    (!bool &&
      ((pos.value && !quest[1].js(obj.value)) ||
        (!pos.value && !quest[0].js(obj.value))))
  ) {
    stage.value++
    mist.value = -1
    setTimeout(() => (mist.value = 0), 1000)
    time.value += Math.max(100 * 1.1 ** combo.value, 500)
    combo.value++
  } else {
    mistakes.value++
    mist.value = 1
    setTimeout(() => (mist.value = 0), 1000)
    time.value -= 1000
    combo.value = 0
  }
  SetObj()
}
function SetObj() {
  const col = ExcrcGeom.col[Math.floor(Math.random() * 3)]
  const shape = ExcrcGeom.shape[Math.floor(Math.random() * 3)]
  obj.value = {
    col: col.inf,
    shape: shape.inf,
    css: col.css + shape.css,
  }
  pos.value = Math.floor(Math.random() * 2)
}
async function Stop() {
  clearInterval(interval)
  isWin.value = true
  try {
    await axios.post('/addlog',{
      id: 4,
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
