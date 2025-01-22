<template>
  <ExcrCard v-if="!isEnabled" :card="ExcrcDesc[1]" @start="Start()" />
  <WinCard
    v-if="isWin"
    :inf="{ mist: mistakes, stage: stage, diff: store.diff }"
  />
  <div
    class="excrc_grid"
    :style="{ filter: 'blur(' + 4 * (!isEnabled + isWin) + 'px)' }"
  >
    <div id="Excrc2Table">
      <div
        v-for="(row, rowId) in Table"
        :key="rowId"
        :style="{ height: 'calc(100%/' + size.height + ')' }"
      >
        <div
          v-for="(cell, cellId) in row"
          :key="cellId"
          class="excrc_cell no-select"
          :style="{
            width: 'calc(min(100vh - 96px, 100vw - 96px)/' + size.width + ')',
            'vertical-align': 'bottom',
          }"
          :class="{
            disenabled: !cell.enabled,
            selected: cell.selected,
            mistake: cell.mistake,
          }"
          @click="Selection(cellId, rowId)"
        >
          <img
            style="height: 50%; width: 50%"
            :src="'/src/pictures/2/' + cell.id + '.svg'"
            :alt="cell.id"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ExcrcDesc } from '@/stores/excercises'
import { useExcrcStore } from '@/stores/excrc'
import { useAccountStore } from '@/stores/account'
import { shuffle } from '@/stores/func'
import ExcrCard from './StartCard.vue'
import WinCard from './WinCard.vue'
import axios from '@/stores/axios'

const userStore = useAccountStore()
const store = useExcrcStore()
const fsize = ExcrcDesc[1].diff.find(el => el.diff == store.diff).size
const div = ExcrcDesc[1].diff.find(el => el.diff == store.diff).div

let size = ref(fsize)
let isEnabled = ref(false)
let stage = ref(-1)
let Table = reactive(Render(false))
let select = reactive([])
let isWin = ref(false)
let sec = ref(30000)
let interval = 0
let mistakes = ref(0)
let combo = ref(0)
let time = ref(30000)

function Start() {
  if (!isEnabled.value) {
    for (let i = 0; i < size.value.height; i++) {
      for (let j = 0; j < size.value.width; j++) {
        Table[i][j].enabled = true
      }
    }
    isEnabled.value = true
  }
  let dat = Date.now()
  interval = setInterval(() => {
    sec.value = Math.floor(dat + time.value - Date.now())
    if (sec.value <= 0) {
      Stop()
    }
  }, 250)
}

function Selection(x, y) {
  select.push(Table[y][x].tid)
  if (select.length > 2) {
    select = []
  }
  if (select.length == 2) {
    if (select[0] == select[1]) {
      select = []
    } else if (select[0] + select[1] != 1) {
      Mistake()
    } else {
      setTimeout(() => {
        Table = reactive(Render(true))
        select = []
      }, 250)
      time.value += Math.min(250 * 1.1 ** combo.value, 2500)
      combo.value++
    }
  }
  Table.forEach(y => {
    y.forEach(x => (x.selected = select.includes(x.tid)))
  })
}

function Render(en) {
  stage.value++
  if (size.value.height < 10) {
    size.value = {
      height: fsize.height + Math.floor((stage.value + div / 4) / div),
      width: fsize.width + Math.floor((stage.value + 0.75 * div) / div),
    }
  } else {
    size.value = { height: 10, width: 10 }
  }
  const doubled = Math.floor(Math.random() * 101)
  let table = [
    { id: doubled, enabled: en, selected: false, mistake: false, tid: 0 },
    { id: doubled, enabled: en, selected: false, mistake: false, tid: 1 },
  ]
  let tt = [doubled]
  for (let i = 2; i < size.value.height * size.value.width; i++) {
    let a = Math.floor(Math.random() * 101)
    if (tt.includes(a)) {
      i--
      continue
    } else {
      table.push({
        id: a,
        enabled: en,
        selected: false,
        mistake: false,
        tid: i,
      })
      tt.push(a)
    }
  }
  table = shuffle(table)
  let T = []
  for (let i = 0; i < size.value.height; i++) {
    T.push(table.slice(size.value.width * i, size.value.width * (i + 1)))
  }
  return T
}
function Mistake() {
  mistakes.value++
  Table.forEach(y => {
    y.forEach(x => {
      x.mistake = select.includes(x.tid)
      x.selected = false
    })
  })
  select = []
  setTimeout(() => {
    Table.forEach(y => {
      y.forEach(x => (x.mistake = false))
    })
  }, 250)
  time.value -= 1000
  combo.value = 0
}
async function Stop() {
  clearInterval(interval)
  isWin.value = true
  try {
    await axios.post('/addlog',{
      id: 2,
      stats: {
        mistakes: mistakes.value,
        stage: stage.value,
        difficulty: store.diff
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
#Excrc2Table {
  height: calc(min(100vh - 96px, 100vw - 96px));
  grid-area: table;
}
.selected {
  background-color: rgb(178, 255, 100);
}
.selected:hover {
  background-color: rgb(143, 206, 79);
}
.mistake {
  background-color: rgb(255, 121, 121);
}
.mistake:hover {
  background-color: rgb(223, 106, 106);
}
</style>
