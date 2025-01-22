import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useExcrcStore = defineStore('excrc', () => {
  const size = ref({ height: 2, width: 2 })
  const status = ref(false)
  const card = ref({ Title: '' })
  const diff = ref(0)
  function setSize(a) {
    size.value = a
  }
  function setStatus(a) {
    status.value = a
  }
  function setCard(a) {
    card.value = a
  }
  function setDiff(a) {
    diff.value = a
  }

  return { size, status, card, diff, setSize, setStatus, setCard, setDiff }
})
