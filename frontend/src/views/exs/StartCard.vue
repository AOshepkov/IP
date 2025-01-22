<template>
  <div id="StartCard0">
    <div id="StartCard1" style="text-align: center">
      <h1 style="margin: 5px 0px">{{ inf.card.Title }}</h1>
      <div>{{ inf.card.Description }}</div>
      <button
        class="button"
        style="height: 30px; width: 60px; border-radius: 10px"
        @click="emit('start')"
      >
        start
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['start'])
const inf = defineProps(['card'])
</script>

<style>
#StartCard0 {
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
#StartCard1 {
  grid-area: card;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 10px;
  background-color: #dddddd;
  z-index: 1;
  border: 1px solid #b0b0b0;
}
</style>
