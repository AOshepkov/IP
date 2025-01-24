<template>
  <div id="Excrc0Grid">
    <div id="Excrc0Title">
      <div
        class="excrc_titles no-select"
        v-for="(title, titleId) in ExcrcDesc"
        :key="titleId"
        @click="select = title"
      >
        <img :src="title.src" class="excrc0_img" :alt="title.Title" />
        <div class="excrc0_title" v-if="!(title.src === undefined)">
          {{ title.Title }}
        </div>
      </div>
    </div>
    <ListCard :card="select" style="grid-area: desc" />
  </div>
</template>

<script setup>
import { ExcrcDesc } from '@/stores/excercises'
import { ref } from 'vue'
import ListCard from './ListCard.vue'
let select = ref({ Title: '' })
</script>

<style>
#Excrc0Grid {
  position: relative;
  top: -48px;
  margin: 0px 24px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 48px auto;
  grid-template-areas: '. .' 'title desc';
  height: 100vh;
}
#Excrc0Title {
  position: relative;
  grid-area: title;
  overflow-y: scroll;
  scrollbar-width: none;
}

.excrc_grid {
  position: relative;
  top: -48px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 48px auto 48px;
  grid-template-areas: '. . .' '. table .' '. . .';
}
.excrc_titles {
  margin-bottom: 10px;
  padding: 10px;
  height: 100px;
  border-radius: 10px;
  background-color: #d1d1d1;
  cursor: pointer;
}
.excrc0_img {
  width: 80px;
  height: 80px;
}
.excrc0_title {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  margin-left: 10px;
  font-weight: 700;
}
</style>
