<template>
  <div id="container1" class="container">
    <div id="BodyText">
      <div id="BodyMainText">Improve your brains</div>
      <p id="BodySideText">The website for improoving mindfulness</p>
      <button
        id="BodyButton"
        class="button"
        @click="router.push({ name: 'excrcs' })"
      >
        Start
      </button>
    </div>
    <p id="BodyDownText">*Made for Individual Project programe</p>
    <img src="@/pictures/Brain.svg" id="BodyIcon" />
  </div>
</template>

<script setup>
import router from '@/router'
</script>

<style>
p {
  margin-top: 0px;
}
#container1 {
  z-index: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 48px 1fr auto;
  grid-template-areas:
    '. .'
    'text logo'
    'downtext logo';
}
#BodyText {
  grid-area: text;
  position: relative;
}
#BodyIcon {
  grid-area: logo;
  align-self: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
}
#BodyMainText {
  /* width: max-content; */
  color: #dddddd;
  font-size: 80px;
  padding-top: 24px;
  padding-left: 24px;
  height: min-content;
  word-wrap: break-word;
}
#BodySideText {
  color: #dddddd;
  padding-left: 24px;
  font-size: 40px;
}
#BodyDownText {
  grid-area: downtext;
  padding-left: 24px;
  vertical-align: bottom;
}
#BodyButton {
  height: 48px;
  width: 128px;
  margin-left: 24px;
  border-radius: 8px;
}
</style>
