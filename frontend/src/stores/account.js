import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountStore = defineStore('acc', () => {
  const id = ref('')
  const name = ref('')
  const token = ref('')

  function SetId(a) {
    id.value = a
  }
  function SetName(a) {
    name.value = a
  }
  function SetToken(a) {
    token.value = a
  }
  function isLogined() {
    return token.value != ''
  }
  function setToDefault() {
    id.value = ''
    name.value = ''
    token.value = ''
  }
  return { id, name, token, SetId, SetName, SetToken, isLogined, setToDefault }
})
