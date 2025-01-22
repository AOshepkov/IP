<template>
  <StartCard @start="Start()" v-if="!isEnabled" :card="ExcrcDesc[0]" />
  <WinCard
    v-if="isWin"
    :inf="{ time: sec, mist: mistakes, diff: store.diff, hard: store.status }"
  />
  <div
    class="excrc_grid"
    :style="{ filter: 'blur(' + 4 * (!isEnabled + isWin) + 'px)' }"
  >
    <div id="Excrc1Table">
      <div
        v-for="(row, rowId) in Excrc"
        :key="rowId"
        :style="{ height: 'calc(100%/' + size.height + ')' }"
      >
        <div
          v-for="(cell, cellId) in row"
          :key="cellId"
          class="excrc_cell no-select"
          :class="{
            cell_1: cell.type == 1,
            cell_2: cell.type == 2,
            disenabled: !cell.enabled,
            mistake: cell.mistake,
          }"
          :style="{
            width: 'calc(min(100vh - 96px, 100vw - 96px)/' + size.width + ')',
            fontSize:
              'calc(min(100vh - 96px, 100vw - 96px)/' + size.height * 2 + ' )',
          }"
          @click="Render(cellId, rowId)"
        >
          {{ cell.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useExcrcStore } from '@/stores/excrc'
import { useAccountStore } from '@/stores/account'
import { ExcrcDesc } from '@/stores/excercises'
import { shuffle } from '@/stores/func'
import { reactive, ref } from 'vue'
import StartCard from './StartCard.vue'
import WinCard from './WinCard.vue'
import axios from '@/stores/axios'

const userStore = useAccountStore()
const store = useExcrcStore()
const status = store.status
const size = ExcrcDesc[0].diff.find(el => el.diff == store.diff).size

let isEnabled = ref(false)
let isWin = ref(false)
let sec = ref(0)
let interval = 0
let mistakes = ref(0)
let clicks = [
  { value: 0 },
  { value: ((size.height * size.width) / 2 + 1) * status, type: 2 },
]

let table = []
if (!status) {
  for (let i = 1; i <= size.height * size.width; i++) {
    table.push({ value: i, type: 1, enabled: false, mistake: false })
  }
} else {
  for (let j = 1; j <= 2; j++) {
    for (let i = 1; i <= (size.height * size.width) / 2; i++) {
      table.push({ value: i, type: j, enabled: false, mistake: false })
    }
  }
}
table = shuffle(table)
let Excrc = reactive([])
for (let i = 0; i < size.height; i++) {
  Excrc.push(table.slice(size.width * i, size.width * (i + 1)))
}

function Start() {
  if (!isEnabled.value) {
    for (let i = 0; i < size.height; i++) {
      for (let j = 0; j < size.width; j++) {
        Excrc[i][j].enabled = true
      }
    }
    isEnabled.value = true
  }
  let dat = Date.now()
  interval = setInterval(() => {
    sec.value = Math.floor(Date.now() - dat)
  }, 250)
}
function Render(x, y) {
  let click = Excrc[y][x]
  if (!click.enabled) {
    return -1
  }
  if (!status) {
    if (click.value != clicks.at(-1).value + 1) {
      Mistake(x, y)
      return 1
    }
    if (click.value == size.height * size.width) {
      Win()
    }
  } else {
    if (
      click.type == clicks.at(-1).type ||
      (click.type == 1 && click.value != clicks.at(-2).value + 1) ||
      (click.type == 2 && click.value != clicks.at(-2).value - 1)
    ) {
      Mistake(x, y)
      return 2
    }
    if (click.type == 2 && click.value == 1) {
      Win()
    }
  }
  clicks.push(click)
  Excrc[y][x] = { value: 0, type: 0, enabled: false }
  return 0
}
function Mistake(x, y) {
  Excrc[y][x].mistake = true
  setTimeout(() => (Excrc[y][x].mistake = false), 250)
  mistakes.value++
}
async function Win() {
  clearInterval(interval)
  isWin.value = true
  try {
    await axios.post('/addlog',{
      id: 1,
      stats: {
        time: sec.value,
        mistakes: mistakes.value,
        difficulty: store.diff,
        hard: store.status,
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
#Excrc1Table {
  height: calc(min(100vh - 96px, 100vw - 96px));
  grid-area: table;
}
.excrc_cell {
  display: inline-block;
  height: 100%;
  margin: 0px;
  border: 1px dotted gray;
  text-align: center;
  align-content: center;
}
.excrc_cell:hover {
  background-color: #cfcfcf;
}
.cell_1 {
  color: blue;
}
.cell_2 {
  color: red;
}
.disenabled {
  background-color: #c0c0c0;
  color: #c0c0c0;
}
.disenabled:hover {
  background-color: #c0c0c0;
}
</style>
