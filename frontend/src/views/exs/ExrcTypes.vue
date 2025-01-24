<template>
  <WinCard v-if="isWin" :inf="{ mist: mistakes, stage: stage }" />
  <StartCard v-if="!isEnabled" :card="ExcrcDesc[4]" @start="Start()" />
  <div
    class="excrc_grid"
    :style="{ filter: 'blur(' + 4 * (!isEnabled + isWin) + 'px)' }"
  >
    <div
      style="
        height: calc(100vh - 96px);
        width: calc(100vw - 96px);
        grid-area: table;
      "
      :class="{ correct: mist == -1, incorrect: mist == 1 }"
    >
      <div
        id="Excrc5Sel"
        v-if="obj.en"
        :class="{
          num: obj.mode == 'num',
          col: obj.mode == 'col',
          invisible: obj.mode == '',
        }"
        :style="{ 'background-color': obj.col }"
      >
        {{ obj.num }}
      </div>
      <div id="Excrc5Grid">
        <div v-for="(row, rowId) in Table" :key="rowId" style="height: 25%">
          <div
            v-for="(cell, cellId) in row"
            :key="cellId"
            class="excrc5_cell1"
            @click="Render(cellId, rowId)"
          >
            <div
              v-if="cell.en == true"
              class="excrc5_cell2"
              :class="{
                num: cell.mode == 'num' && cell.st < 1,
                col: cell.mode == 'col' && cell.st < 1,
                invisible: cell.st >= 1,
              }"
              :style="{
                'background-color':
                  cell.col.repeat(cell.st < 1) + '#d0d0d0'.repeat(cell.st >= 1),
              }"
            >
              {{ cell.num }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ExcrcDesc } from '@/stores/excercises'
import { useAccountStore } from '@/stores/account'
import StartCard from './StartCard.vue'
import WinCard from './WinCard.vue'
import axios from '@/stores/axios'

const userStore = useAccountStore()
let isEnabled = ref(false)
let isWin = ref(false)
let Table = reactive([])
for (let i = 0; i < 4; i++) {
  let t = []
  for (let j = 0; j < 4; j++) {
    t.push({ en: false, mode: '', num: 0, col: '', st: false })
  }
  Table.push(t)
}
let obj = ref({ en: false, mode: '', num: 0, col: '' })
let stage = ref(0)
let mist = ref(0)
let mistakes = ref(0)
let interval = 0
let time = ref(1500000)
let sec = ref(15000)
let combo = ref(0)
let prev = ref({ num: [], col: [] })
let col = [
  '#FFA070',
  '#F0E680',
  '#D8BFD0',
  '#9370D0',
  '#FF00F0',
  '#98FB90',
  '#00FF70',
  '#00FFF0',
  '#9ACD30',
  '#008080',
]

function Start() {
  isEnabled.value = true
  const x = Math.floor(Math.random() * 4)
  const y = Math.floor(Math.random() * 4)
  AddElement(x, y)
  for (let i in Table[y][x]) {
    obj.value[i] = Table[y][x][i]
  }
  const dat = Date.now()
  interval = setInterval(() => {
    sec.value = Math.floor(dat + time.value - Date.now())
    if (sec.value <= 0) {
      Stop()
    }
  }, 250)
}
function Render(x, y) {
  if (isWin.value || Table[y][x].mode == '') {
    return
  }
  if (Table[y][x].col == obj.value.col && Table[y][x].num == obj.value.num) {
    Table[y][x].st++
    stage.value++
    Mist(false)
    time.value += Math.min(1000, 100 * 1.1 ** combo.value)
    combo.value++
    if (
      (stage.value + 3) %
        (6 * (prev.value.col.length + prev.value.num.length) - 2) ==
        0 &&
      prev.value.col.length + prev.value.num.length < 16
    ) {
      AddElement()
    }
    if (Math.floor(Math.random() * 2)) {
      obj.value.col =
        prev.value.col[Math.floor(Math.random() * prev.value.col.length)]
      obj.value.mode = 'col'
      obj.value.num = 0
    } else {
      obj.value.num =
        prev.value.num[Math.floor(Math.random() * prev.value.num.length)]
      obj.value.mode = 'num'
      obj.value.col = ''
    }
  } else {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          Table[i][j].col == obj.value.col &&
          Table[i][j].num == obj.value.num
        ) {
          Table[i][j].st = 0
        }
      }
    }
    Mist(true)
    time.value -= 500
    combo.value = 0
  }
}
function AddElement(x, y) {
  if (x === undefined || y === undefined) {
    x = Math.floor(Math.random() * 4)
    y = Math.floor(Math.random() * 4)
    while (Table[y][x].mode != '') {
      x = Math.floor(Math.random() * 4)
      y = Math.floor(Math.random() * 4)
    }
  }
  Table[y][x].en = true
  if (prev.value.num.length > prev.value.col.length) {
    Table[y][x].mode = 'col'
    prev.value.col.push(col[Math.floor(Math.random() * col.length)])
    Table[y][x].col = prev.value.col.at(-1)
    col = col.filter(el => !prev.value.col.includes(el))
  } else {
    Table[y][x].mode = 'num'
    let num = Math.floor(1 + Math.random() * 9)
    while (prev.value.num.includes(num)) {
      num = Math.floor(1 + Math.random() * 9)
    }
    Table[y][x].num = num
    prev.value.num.push(num)
  }
}
function Mist(bool) {
  if (bool) {
    mistakes.value++
    mist.value = 1
    setTimeout(() => {
      mist.value = 0
    }, 500)
  } else {
    mist.value = -1
    setTimeout(() => {
      mist.value = 0
    }, 500)
  }
}
async function Stop() {
  clearInterval(interval)
  isWin.value = true
  try {
    await axios.post('/addlog',{
      id: 5,
      stats: {
        stage: stage.value,
        mistakes: mistakes.value,
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
#Excrc5Sel {
  position: relative;
  height: calc(min(100vh - 96px, 100vw - 96px) / 6);
  width: calc(min(100vh - 96px, 100vw - 96px) / 6);
  border: #c0c0c0 1px solid;
  border-radius: 50%;
  margin: calc(min(100vh - 96px, 100vw - 96px) / 60) auto;
  text-align: center;
  align-content: center;
  user-select: none;
}
#Excrc5Sel.num {
  font-size: calc(min(100vh - 96px, 100vw - 96px) / 18);
  background-color: #dddddd;
}
#Excrc5Sel.col {
  font-size: 0;
}
#Excrc5Grid {
  position: relative;
  height: calc(min(100vh - 96px, 100vw - 96px) / 5 * 4);
  width: calc(min(100vh - 96px, 100vw - 96px) / 5 * 4);
  margin: 0px auto;
}
.excrc5_cell1 {
  display: inline-block;
  height: 100%;
  width: 25%;
  vertical-align: bottom;
}
.excrc5_cell2 {
  border: 1px #c0c0c0 solid;
  border-radius: 50%;
  height: 100%;
  text-align: center;
  align-content: center;
  user-select: none;
}
.excrc5_cell2.num {
  font-size: calc(min(100vh - 96px, 100vw - 96px) / 15);
}
.excrc5_cell2.col {
  font-size: 0;
}
.invisible {
  background-color: #d0d0d0;
  font-size: 0;
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
